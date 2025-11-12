# Vercel Deployment Troubleshooting

## Application Error: Server-side Exception

Bu hata genellikle şu nedenlerden kaynaklanır:

### 1. Environment Variable Eksik veya Yanlış

**Kontrol:**
- Vercel Dashboard → Project Settings → Environment Variables
- `NEXT_PUBLIC_API_BASE_URL` değişkeninin doğru ayarlandığından emin olun

**Çözüm:**
```bash
# Vercel Dashboard'da şu değişkeni ekleyin:
NEXT_PUBLIC_API_BASE_URL=https://your-strapi-api.com
```

**Not:** `NEXT_PUBLIC_` prefix'i olan değişkenler client-side'da da kullanılabilir.

### 2. Strapi API Erişilemiyor

**Kontrol:**
- Strapi API'nizin production'da çalıştığından emin olun
- API URL'inin doğru olduğunu test edin:
  ```bash
  curl https://your-strapi-api.com/api/homepage
  ```

**Çözüm:**
- Strapi API'nizi production'a deploy edin
- CORS ayarlarını kontrol edin (aşağıya bakın)

### 3. CORS Hatası

**Kontrol:**
Strapi API'nizde CORS ayarlarını kontrol edin:

```javascript
// server/config/middlewares.ts
export default [
  // ... diğer middleware'ler
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'http://localhost:3000',
        'https://your-vercel-app.vercel.app',
        'https://your-custom-domain.com'
      ],
    },
  },
];
```

### 4. Network Timeout

**Kontrol:**
Vercel loglarında timeout hataları var mı kontrol edin:
- Vercel Dashboard → Project → Deployments → [Latest Deployment] → Functions Logs

**Çözüm:**
- API fetch fonksiyonlarına timeout eklendi (10 saniye)
- Eğer hala timeout alıyorsanız, Strapi API'nizin yanıt süresini kontrol edin

### 5. Build-time vs Runtime Errors

**Kontrol:**
- Build loglarını kontrol edin (Vercel Dashboard → Deployments)
- Runtime loglarını kontrol edin (Functions Logs)

**Çözüm:**
- Build hatası varsa: TypeScript/ESLint hatalarını düzeltin
- Runtime hatası varsa: Environment variables ve API bağlantısını kontrol edin

## Debug Adımları

### 1. Environment Variables Kontrolü

Vercel Dashboard'da:
1. Project Settings → Environment Variables
2. Şu değişkenlerin olduğundan emin olun:
   - `NEXT_PUBLIC_API_BASE_URL` (zorunlu)
   - `PREVIEW_SECRET` (opsiyonel)
   - `CLIENT_URL` (opsiyonel)

### 2. API Bağlantı Testi

Local'de test edin:
```bash
cd client
NEXT_PUBLIC_API_BASE_URL=https://your-strapi-api.com npm run build
```

### 3. Vercel Logları İnceleme

1. Vercel Dashboard → Project → Deployments
2. Son deployment'ı seçin
3. "Functions Logs" sekmesine gidin
4. Hata mesajlarını inceleyin

### 4. Local Build Test

```bash
cd client
npm run build
npm run start
```

Eğer local'de çalışıyorsa ama Vercel'de çalışmıyorsa, environment variable sorunudur.

## Yaygın Hata Mesajları

### "Cannot read property 'url' of undefined"
**Neden:** API response'u beklenen formatta değil
**Çözüm:** API response'unu kontrol edin, fallback data kullanılıyor mu bakın

### "Request timeout"
**Neden:** Strapi API'ye erişilemiyor veya çok yavaş yanıt veriyor
**Çözüm:** 
- API URL'ini kontrol edin
- API'nin çalıştığından emin olun
- Network bağlantısını kontrol edin

### "Failed to fetch"
**Neden:** CORS hatası veya network hatası
**Çözüm:**
- Strapi CORS ayarlarını kontrol edin
- API URL'inin doğru olduğundan emin olun

## Hızlı Çözüm Checklist

- [ ] `NEXT_PUBLIC_API_BASE_URL` environment variable eklendi
- [ ] Strapi API production'da çalışıyor
- [ ] Strapi CORS ayarları Vercel URL'ini içeriyor
- [ ] Build başarılı (Vercel Dashboard'da kontrol edin)
- [ ] Functions Logs'da hata yok
- [ ] Local'de `npm run build` başarılı

## Ek Kaynaklar

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Strapi CORS Configuration](https://docs.strapi.io/dev-docs/configurations/middlewares#cors)

