# Strapi Preview Özelliği Kurulum Rehberi

Bu rehber, Strapi Preview özelliğinin nasıl kurulacağını ve kullanılacağını açıklar.

## Gereksinimler

- Strapi v5.x
- Next.js App Router
- Draft & Publish özelliği etkin olmalı (content type'larda)

## Kurulum Adımları

### 1. Environment Variables Ekleme

Strapi projenizin `.env` dosyasına şu değişkenleri ekleyin:

```env
# Frontend uygulamanızın URL'i
CLIENT_URL=http://localhost:3000

# Preview için güvenlik anahtarı (isteğe bağlı ama önerilir)
PREVIEW_SECRET=your-super-secret-key-here
```

**Not:** `PREVIEW_SECRET` değerini güvenli bir şekilde oluşturun ve production'da farklı bir değer kullanın.

### 2. Strapi Konfigürasyonu

`server/config/admin.ts` dosyası zaten preview konfigürasyonu ile güncellenmiştir. Bu dosya:

- Tüm content type'lar için preview URL'lerini oluşturur
- Draft ve published içerik için farklı URL'ler döndürür
- Preview handler'ı içerir

### 3. Next.js Preview Route

`client/app/api/preview/route.ts` dosyası oluşturulmuştur. Bu route:

- Preview secret'ı doğrular
- Next.js draft mode'u etkinleştirir
- İlgili sayfaya yönlendirir

### 4. API Fonksiyonlarını Güncelleme

API fonksiyonları draft mode desteği için güncellenmiştir. `getFetchOptions()` helper fonksiyonu:

- Draft mode'u algılar
- `strapi-encode-source-maps` header'ını ekler
- `status=draft` parametresini ekler

## Kullanım

### Strapi Admin Panel'de

1. Content Manager'da herhangi bir content type'ı düzenleyin
2. Sağ üstte **"Open preview"** butonuna tıklayın
3. Preview penceresi açılacak ve içeriğinizi görebileceksiniz

### Draft vs Published

- **Draft içerik:** `/api/preview?secret=...&pathname=...` URL'i kullanılır
- **Published içerik:** Normal sayfa URL'i kullanılır

### Live Preview (Growth/Enterprise Plan)

Growth veya Enterprise planınız varsa:

- Side-by-side preview kullanabilirsiniz
- Preview içinde double-click ile düzenleme yapabilirsiniz
- Değişiklikler anında preview'da görünür

## Desteklenen Content Types

Aşağıdaki content type'lar için preview desteklenmektedir:

- `api::homepage.homepage` → `/`
- `api::about-us-page.about-us-page` → `/about-us`
- `api::history-page.history-page` → `/history`
- `api::health-page.health-page` → `/health`
- `api::recipe-page.recipe-page` → `/recipe`
- `api::diet-page.diet-page` → `/diet`
- `api::vaccine-page.vaccine-page` → `/vaccines`
- `api::spayingand-neutering.spayingand-neutering` → `/spaying-and-neutering`
- `api::products-recommed.products-recommed` → `/recommended-products`
- `api::faq-page.faq-page` → `/faq`
- `api::terms-page.terms-page` → `/terms`
- `api::avaible-kitten-page.avaible-kitten-page` → `/avaible-kittens`
- `api::kings-page.kings-page` → `/kings`
- `api::queens-page.queens-page` → `/queens`
- `api::blog-page.blog-page` → `/blog`
- `api::galleries-page.galleries-page` → `/galleries`
- `api::testimonial-page.testimonial-page` → `/testimonials`

## Sorun Giderme

### Preview butonu görünmüyor

- `config/admin.ts` dosyasında `preview.enabled: true` olduğundan emin olun
- Content type'da Draft & Publish özelliğinin etkin olduğunu kontrol edin
- Browser console'da hata olup olmadığını kontrol edin

### Preview açılmıyor

- `CLIENT_URL` environment variable'ının doğru olduğundan emin olun
- `allowedOrigins` içinde frontend URL'inizin olduğunu kontrol edin
- CORS ayarlarını kontrol edin

### Draft içerik görünmüyor

- `PREVIEW_SECRET` değerinin hem Strapi hem Next.js'de aynı olduğundan emin olun
- API fonksiyonlarında `status=draft` parametresinin eklendiğini kontrol edin
- Next.js draft mode'unun etkin olduğunu kontrol edin

## Daha Fazla Bilgi

- [Strapi Preview Dokümantasyonu](https://docs.strapi.io/cms/features/preview)
- [Next.js Draft Mode](https://nextjs.org/docs/app/api-reference/functions/draft-mode)

