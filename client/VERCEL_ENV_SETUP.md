# Vercel Environment Variables Kurulum Rehberi

## Strapi API Bağlantısı için Gerekli Ayarlar

### 1. Vercel Dashboard'a Giriş Yapın

1. [Vercel Dashboard](https://vercel.com/dashboard)'a gidin
2. Projenizi seçin
3. **Settings** → **Environment Variables** sekmesine gidin

### 2. Environment Variable Ekleme

**ÖNEMLİ:** Strapi admin panel URL'i değil, API base URL'ini kullanmalısınız!

#### Doğru URL Formatı:
```
https://astridmoonadminpanel.store
```

**YANLIŞ:** `https://astridmoonadminpanel.store/admin` ❌  
**DOĞRU:** `https://astridmoonadminpanel.store` ✅

#### Environment Variable Ayarları:

1. **Key:** `NEXT_PUBLIC_API_BASE_URL`
   - **Value:** `https://astridmoonadminpanel.store`
   - **Environment:** Tüm environment'ları seçin (Production, Preview, Development)
   - **Save** butonuna tıklayın

2. **Alternatif olarak (eski sistem uyumluluğu için):**
   - **Key:** `API_BASE_URL`
   - **Value:** `https://astridmoonadminpanel.store`
   - **Environment:** Tüm environment'ları seçin
   - **Save** butonuna tıklayın

### 3. Deploy Sonrası Kontrol

Environment variable ekledikten sonra:

1. **Yeni bir deploy yapın:**
   - Vercel Dashboard → **Deployments**
   - Son deployment'ın yanındaki **⋯** (üç nokta) menüsüne tıklayın
   - **Redeploy** seçin
   - Veya yeni bir commit push edin

2. **Deploy loglarını kontrol edin:**
   - Deploy sırasında console'da şu mesajı görmelisiniz:
   ```
   ✅ API_BASE_URL configured: https://astridmoonadminpanel.store
   ```

3. **Hata kontrolü:**
   - Eğer hala `ECONNREFUSED` hatası alıyorsanız:
     - Environment variable'ın doğru eklendiğinden emin olun
     - URL'in `/admin` ile bitmediğinden emin olun
     - Strapi API'nizin çalıştığından emin olun

### 4. Strapi API Test

Strapi API'nizin çalıştığını test etmek için:

```bash
curl https://astridmoonadminpanel.store/api/heroes
```

Eğer JSON response alıyorsanız, API çalışıyor demektir.

### 5. Cache Sorunları

Eğer Strapi'de değişiklik yaptığınızda frontend'de görünmüyorsa:

1. **Browser cache'i temizleyin:**
   - Chrome/Edge: `Ctrl+Shift+Delete` → "Cached images and files" seçin
   - Veya Hard Refresh: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)

2. **Vercel cache'i temizleyin:**
   - Vercel Dashboard → **Deployments** → **Redeploy**

3. **Route handler'lar cache'i devre dışı bırakır:**
   - `/api/hero` ve `/api/heroes` route'ları her zaman fresh data çeker
   - `Cache-Control: no-store, no-cache, must-revalidate` header'ları ayarlanmıştır

### 6. Sorun Giderme

#### Hata: "ECONNREFUSED 127.0.0.1:1337"
- **Çözüm:** `NEXT_PUBLIC_API_BASE_URL` environment variable'ını ekleyin

#### Hata: "Expected JSON but got text/html"
- **Çözüm:** Route handler'lar her zaman JSON döndürür, bu hata genellikle Strapi API'ye bağlanamama durumunda oluşur
- Environment variable'ın doğru olduğundan emin olun

#### Değişiklikler Görünmüyor
- **Çözüm:** 
  1. Browser cache'i temizleyin
  2. Vercel'de redeploy yapın
  3. Hard refresh yapın (`Ctrl+Shift+R`)

### 7. Özet

✅ **Yapılması Gerekenler:**
1. Vercel Dashboard → Settings → Environment Variables
2. `NEXT_PUBLIC_API_BASE_URL` = `https://astridmoonadminpanel.store` ekleyin
3. Tüm environment'ları seçin (Production, Preview, Development)
4. Save ve Redeploy yapın

❌ **Yapılmaması Gerekenler:**
- URL'in sonuna `/admin` eklemeyin
- `http://127.0.0.1:1337` gibi localhost URL'leri kullanmayın
- Environment variable'ı ekledikten sonra redeploy yapmayı unutmayın

