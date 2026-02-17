# ConvertKit Form ID Kurulum Rehberi

## 🎯 Form ID Nasıl Bulunur?

### Yöntem 1: ConvertKit Dashboard (Önerilen)

1. **ConvertKit hesabınıza giriş yapın**  
   👉 https://app.convertkit.com/

2. **Forms sayfasına gidin**  
   Sol menüden: **Grow** → **Landing Pages & Forms**

3. **Form ID'yi kopyalayın**  
   - Kullanmak istediğiniz formun üzerine tıklayın
   - Tarayıcının adres çubuğuna bakın:
   ```
   https://app.convertkit.com/forms/designers/1234567/edit
                                            ↑↑↑↑↑↑↑
                                          Form ID
   ```

### Yöntem 2: Yeni Form Oluşturma

Eğer form yoksa:

1. https://app.convertkit.com/forms/designers/new
2. **Inline** form tipi seçin (en uygun)
3. Formu tasarlayın ve kaydedin
4. Form ID URL'den kopyalayın

---

## ⚙️ Projeye Entegrasyon

### 1. Form ID'yi .env Dosyasına Ekleyin

```bash
NEXT_PUBLIC_KIT_FORM_ID=1234567
```

**Önemli:** `NEXT_PUBLIC_` prefix'ini unutmayın!

### 2. Development Server'ı Yeniden Başlatın

```bash
cd client
npm run dev
```

**Not:** `.env` değişikliklerinden sonra server restart gerekir.

---

## 🎨 Template Yönetimi

### ConvertKit'te Template Değiştirme

1. ConvertKit dashboard'a gidin
2. **Forms** → Formunuzu seçin
3. **Settings** → **Incentive Email** bölümüne gidin
4. Email template'inizi düzenleyin
5. Kaydedin ✅

**Otomatik Yansıma:** ConvertKit'te yaptığınız değişiklikler anında yansır! Site kodunda hiçbir değişiklik gerekmez.

### Avantajları

✅ Email içeriğini istediğiniz zaman değiştirebilirsiniz  
✅ A/B test yapabilirsiniz  
✅ Automation sequence'ler ekleyebilirsiniz  
✅ Tag'ler ekleyebilirsiniz  
✅ Custom field'lar kullanabilirsiniz  

---

## 📋 Form Özellikleri

### Mevcut Özellikler

- ✅ Otomatik email validation
- ✅ Success/error mesajları
- ✅ Responsive tasarım
- ✅ Site renkleriyle uyumlu styling
- ✅ ConvertKit'in tüm özelliklerini kullanabilme

### Email Template'de Kullanabileceğiniz Değişkenler

ConvertKit email template'lerinizde:

- `{{ subscriber.first_name }}` - İlk isim
- `{{ subscriber.email }}` - Email adresi
- Custom fields ekleyebilirsiniz

---

## 🔧 Sorun Giderme

### Form Görünmüyor

1. **Form ID'yi kontrol edin**
   ```bash
   # .env dosyasında
   NEXT_PUBLIC_KIT_FORM_ID=1234567
   ```

2. **Server'ı restart edin**
   ```bash
   npm run dev
   ```

3. **Browser console'u kontrol edin**
   - F12 → Console tab
   - ConvertKit script hatası var mı?

### Script Yüklenemiyor Hatası

- İnternet bağlantınızı kontrol edin
- AdBlocker'ı devre dışı bırakın
- Browser cache'i temizleyin

### Form ID Nasıl Test Edilir?

```bash
# ConvertKit formlarınızı listeleyin
cd client
node scripts/check-kit-forms.js
```

---

## 💻 Eski Custom Form Koduna Dönüş

Eğer ConvertKit yerine custom form'u kullanmak isterseniz:

1. `client/app/_components/Newsletter.tsx` dosyasını açın
2. Dosyanın üst kısmındaki **yorum satırları** içindeki eski kodu kopyalayın
3. Mevcut kodu eski kod ile değiştirin

**Not:** Eski kod dosyada saklanıyor, silinmedi.

---

## 📞 Destek

Sorun yaşarsanız:

1. ✅ Form ID'nin doğru olduğundan emin olun
2. ✅ `.env` dosyasında `NEXT_PUBLIC_` prefix'i var mı?
3. ✅ Server restart edildi mi?
4. ✅ ConvertKit hesabınız aktif mi?

---

## 🎉 Tamamlandı!

Form ID'yi ekledikten sonra:

1. Site açılır ✅
2. Newsletter formu görünür ✅
3. Email gönderilir ✅
4. ConvertKit'te subscriber eklenir ✅
5. Email template'iniz otomatik gönderilir ✅

**Kullanıcı template değiştirirse:** ✨ Otomatik yansır, kod değişikliği gerekmez!
