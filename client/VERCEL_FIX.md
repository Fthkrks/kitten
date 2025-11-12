# Vercel Deployment Hatası Çözümü

## Sorun

Loglarda şu hatalar görülüyor:
1. `ECONNREFUSED 127.0.0.1:1337` - Environment variable ayarlanmamış
2. `HTTP error! status: 400` - API'ye bağlanıyor ama istek reddediliyor

## Çözüm Adımları

### 1. Vercel Environment Variable Ayarlama (ZORUNLU)

1. [Vercel Dashboard](https://vercel.com/dashboard)'a gidin
2. Projenizi seçin
3. **Settings** → **Environment Variables** sekmesine gidin
4. Şu değişkeni ekleyin:

   **Key:** `NEXT_PUBLIC_API_BASE_URL`
   
   **Value:** Strapi API'nizin production URL'i
   
   Örnekler:
   - `https://api.yourdomain.com`
   - `https://strapi-production.herokuapp.com`
   - `https://your-strapi-app.onrender.com`
   
   **ÖNEMLİ:** 
   - `http://127.0.0.1:1337` veya `http://localhost:1337` KULLANMAYIN
   - Mutlaka `https://` ile başlamalı
   - Production Strapi API URL'inizi kullanın

5. **Environment:** Tüm environment'ları seçin (Production, Preview, Development)
6. **Save** butonuna tıklayın

### 2. Yeniden Deploy

Environment variable ekledikten sonra:

1. Vercel Dashboard → **Deployments**
2. Son deployment'ın yanındaki **⋯** (üç nokta) menüsüne tıklayın
3. **Redeploy** seçin
4. Veya yeni bir commit push edin:
   ```bash
   git add .
   git commit -m "Fix: Add error handling and timeout"
   git push
   ```

### 3. Strapi API Kontrolü

Strapi API'nizin çalıştığından ve erişilebilir olduğundan emin olun:

```bash
# Terminal'de test edin:
curl https://your-strapi-api.com/api/homepage
```

Eğer hata alıyorsanız:
- Strapi API'nizi production'a deploy edin
- CORS ayarlarını kontrol edin (aşağıya bakın)

### 4. Strapi CORS Ayarları

Strapi API'nizde CORS ayarlarını güncelleyin:

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
        'https://kitten-two.vercel.app',
        'https://your-custom-domain.com' // Eğer varsa
      ],
    },
  },
];
```

### 5. 400 Hatası İçin

Eğer hala `HTTP error! status: 400` alıyorsanız:

1. **Vercel Logları** → **Functions Logs**'u kontrol edin
2. Hata mesajında API'nin ne dediğini görün
3. Muhtemel nedenler:
   - Populate query çok uzun/karmaşık
   - Strapi API versiyonu uyumsuz
   - API endpoint'i yanlış

**Geçici Çözüm:** Fallback data kullanılıyor, sayfa çalışacak ama API'den veri gelmeyecek.

## Kontrol Listesi

Deploy öncesi kontrol edin:

- [ ] `NEXT_PUBLIC_API_BASE_URL` Vercel'de ayarlandı
- [ ] Environment variable `https://` ile başlıyor
- [ ] Strapi API production'da çalışıyor
- [ ] Strapi CORS ayarları Vercel URL'ini içeriyor
- [ ] Deploy sonrası logları kontrol ettiniz

## Test

Deploy sonrası:

1. Vercel Dashboard → **Deployments** → Son deployment
2. **Functions Logs** sekmesine gidin
3. Şu logları görmelisiniz:
   - `🌐 API_BASE_URL: https://your-api.com` (localhost değil!)
   - `📡 Response status: 200` (400 değil!)

Eğer hala `127.0.0.1` görüyorsanız, environment variable düzgün ayarlanmamış demektir.

## Hızlı Çözüm

```bash
# 1. Environment variable'ı kontrol edin (Vercel Dashboard)
# 2. Değişiklikleri commit edin
git add .
git commit -m "Fix: Improve error handling for Vercel"
git push

# 3. Vercel otomatik deploy edecek
# 4. Logları kontrol edin
```

## Sorun Devam Ederse

1. Vercel Dashboard → Project → Settings → Environment Variables
2. `NEXT_PUBLIC_API_BASE_URL` değerini kontrol edin
3. Functions Logs'da tam hata mesajını okuyun
4. Strapi API'nizi test edin (curl ile)

