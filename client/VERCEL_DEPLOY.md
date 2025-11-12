# Vercel Deployment Rehberi

Bu rehber, Next.js client uygulamasını Vercel'e deploy etmek için gerekli adımları içerir.

## Ön Gereksinimler

1. Vercel hesabı ([vercel.com](https://vercel.com))
2. GitHub, GitLab veya Bitbucket hesabı (proje git repository'de olmalı)
3. Strapi API'nin production URL'i

## Deployment Adımları

### 1. Projeyi Git Repository'ye Push Edin

```bash
cd client
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Vercel'e Proje Ekleyin

1. [Vercel Dashboard](https://vercel.com/dashboard)'a gidin
2. "Add New..." → "Project" seçin
3. Git repository'nizi seçin
4. **Root Directory** olarak `client` klasörünü seçin
5. Framework Preset: **Next.js** (otomatik algılanmalı)

### 3. Environment Variables Ayarlayın

Vercel proje ayarlarında aşağıdaki environment variables'ları ekleyin:

#### Gerekli Variables:

```
NEXT_PUBLIC_API_BASE_URL=https://your-strapi-api.com
```

**Not:** Strapi API'nizin production URL'ini buraya ekleyin. Örnek:
- `https://api.yourdomain.com`
- `https://strapi-production.herokuapp.com`
- vb.

#### Opsiyonel Variables (Preview için):

```
PREVIEW_SECRET=your-secret-key-here
CLIENT_URL=https://your-vercel-app.vercel.app
```

**Not:** 
- `PREVIEW_SECRET`: Strapi preview özelliği için kullanılır. Güvenli bir random string oluşturun.
- `CLIENT_URL`: Vercel deployment sonrası otomatik oluşan URL'inizi buraya ekleyin.

### 4. Build Ayarları

Vercel otomatik olarak Next.js projelerini algılar, ancak manuel kontrol için:

- **Framework Preset:** Next.js
- **Root Directory:** `client` (eğer monorepo ise)
- **Build Command:** `npm run build` (otomatik)
- **Output Directory:** `.next` (otomatik)
- **Install Command:** `npm install` (otomatik)

### 5. Deploy

1. "Deploy" butonuna tıklayın
2. Build işlemi tamamlanana kadar bekleyin
3. Deployment başarılı olduğunda URL'iniz hazır olacak

## Environment Variables Örnekleri

### Development (Local)
```
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:1337
PREVIEW_SECRET=dev-secret-key
CLIENT_URL=http://localhost:3000
```

### Production (Vercel)
```
NEXT_PUBLIC_API_BASE_URL=https://your-strapi-production.com
PREVIEW_SECRET=production-secret-key-12345
CLIENT_URL=https://your-app.vercel.app
```

## Strapi API CORS Ayarları

Strapi API'nizde CORS ayarlarını yapılandırmayı unutmayın:

```javascript
// server/config/middlewares.ts
export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:', 'http:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://images.unsplash.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
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
  // ... diğer middleware'ler
];
```

## Troubleshooting

### Build Hatası: "Module not found"
- `node_modules` klasörünün `client` dizininde olduğundan emin olun
- `package.json` dosyasının doğru konumda olduğunu kontrol edin

### API Bağlantı Hatası
- `NEXT_PUBLIC_API_BASE_URL` environment variable'ının doğru ayarlandığını kontrol edin
- Strapi API'nizin CORS ayarlarını kontrol edin
- Strapi API'nizin erişilebilir olduğunu test edin

### Image Loading Hatası
- `next.config.ts` dosyasındaki `remotePatterns` ayarlarını kontrol edin
- Strapi API URL'inin `remotePatterns` içinde olduğundan emin olun

## Vercel CLI ile Deploy (Alternatif)

Eğer Vercel CLI kullanmak isterseniz:

```bash
# Vercel CLI'yi global olarak yükleyin
npm i -g vercel

# Client klasörüne gidin
cd client

# Deploy edin
vercel

# Production'a deploy
vercel --prod
```

## Sonraki Adımlar

1. ✅ Custom domain ekleyin (opsiyonel)
2. ✅ Environment variables'ları production için güncelleyin
3. ✅ Strapi API CORS ayarlarını yapın
4. ✅ Preview özelliğini test edin (eğer kullanıyorsanız)

## Destek

Sorun yaşarsanız:
- [Vercel Dokümantasyonu](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- Vercel Support

