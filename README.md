# 📩 Website Contact Form Backend (Resend API Version)
## _Canlı Ortam - Production Environment_

> ⚙️ Bu repo, [osmandemir2533.github.io](https://osmandemir2533.github.io/) web sitesinin iletişim formu için geliştirilmiş özel bir **email backend servisidir**.  
> Statik frontend ile entegre çalışır ve **Resend API** üzerinden güvenli e-posta gönderimi sağlar.  
> Web sitesinin frontend reposuna [buradan](https://github.com/osmandemir2533/osmandemir2533.github.io) ulaşabilirsiniz.

---

## ✨ Özellikler

- ⚡ **Resend API** ile hızlı ve güvenli e-posta gönderimi  
- 🔒 **CORS** ve **XSS** koruması  
- 🌍 **IP Geolocation** (axios ile)  
- 📊 **Tarayıcı, cihaz, işletim sistemi ve dil tespiti**  
- 🧾 **Detaylı loglama sistemi**  
- 💡 **Statik sitelerle tam uyumlu backend çözümü**

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Amaç |
|------------|------|
| **Node.js** | Runtime ortamı |
| **Express.js** | Web framework |
| **Resend** | Email gönderim servisi (Modern API) |
| **Axios** | IP konum sorgusu |
| **dotenv** | Ortam değişkenleri yönetimi |
| **CORS** | Domain erişim kontrolü |
| **body-parser** | JSON gövde işlemleri |

---


## 📦 Kurulum

### 1. Bağımlılıkları Yükle

```bash
# Tüm paketleri yükle
npm install

# Veya tek tek yükle
npm install express cors axios dotenv body-parser resend
```

### 2. Environment Variables

> Proje güvenliği için kritik bilgiler environment variables olarak saklanır:

`.env` dosyası oluşturun:

```env
# Resend API Anahtarı
RESEND_API_KEY=

# Gelen mesajların iletileceği e-posta
RESEND_TO_EMAIL=
```
> 📌Resend, hesabınıza kayıtlı e-posta adresine mail göndermenize izin verir.
Yani ```RESEND_TO_EMAIL``` değişkeni, Resend hesabınızla kayıt olduğunuz e-posta adresiyle aynı olmalıdır.

## 📁 Proje Yapısı

```
websiteEmailPost-main/
├── server.js          # Ana sunucu dosyası
├── package.json       # Bağımlılıklar
├── .env               # Environment variables (oluşturulacak)
└── README.md         
```

### Frontend Entegrasyonu

Statik sitenizde form submit işleminde backend URL'inize POST isteği atın:

```javascript
// Örnek frontend kodu
const formData = {
  name: "Gönderen Adı",
  email: "gonderen@email.com", 
  message: "Mesaj içeriği"
};

fetch('YOUR_BACKEND_URL/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => console.log('Başarılı:', data))
.catch(error => console.error('Hata:', error));
```

## 🔌 API Kullanımı

### E-posta Gönderme

**Endpoint:** `POST /send-email`

**Request Body:**
```json
{
  "name": "Gönderen Adı",
  "email": "gonderen@email.com",
  "message": "Mesaj içeriği"
}
```

**Zorunlu Alanlar:**
- `name`: Gönderen adı
- `email`: Gönderen e-posta adresi  
- `message`: Mesaj içeriği

**Başarılı Yanıt (200):**
```json
{
  "message": "Form başarıyla gönderildi!"
}
```

**Hata Yanıtları:**
```json
// 400 - Eksik alanlar
{
  "message": "Lütfen tüm alanları doldurun!"
}

// 500 - Sunucu hatası
{
  "message": "Bir hata oluştu, tekrar deneyin."
}
```

### Health Check

**Endpoint:** `GET /`

**Yanıt:**
```json
{
  "message": "API Çalışıyor! 🚀",
  "status": "OK", 
  "timestamp": "2026-01-15T10:30:00.000Z"
}
```

## 🔒 Güvenlik Özellikleri

### XSS Koruması
Tüm kullanıcı girdileri HTML escape edilir:
```javascript
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function(m) {
    return ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[m];
  });
}
```

### CORS Ayarları

**LOCAL İÇİN (Geliştirme Ortamı - Development Environment)**
```javascript
app.use(cors());
app.options('*', cors());
```

**CANLI İÇİN (Canlı Ortam - Production Environment)**
```javascript
const corsOptions = {
  origin: 'https://your-domain.com',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
```

## 📧 Email Template Özellikleri

### Otomatik Toplanan Bilgiler
- **IP Adresi**: Kullanıcının IP'si
- **Konum**: IP'den otomatik geolocation
- **Tarayıcı**: Chrome, Firefox, Safari, Edge, Opera
- **Cihaz**: PC, Mobil, Tablet + Model bilgisi
- **İşletim Sistemi**: Windows, macOS, Linux, Android, iOS
- **Dil**: Tarayıcı dil ayarı
- **Tarih**: Gönderim zamanı

### Responsive Tasarım
- Mobil ve desktop uyumlu
- Gradient arka plan
- Modern CSS styling

## 🚀 Çalıştırma

### Local Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# Local için uygun CORS ayarlarını yaz

# .env dosyasını oluştur
echo "RESEND_API_KEY= " > .env
echo "RESEND_TO_EMAIL= " >> .env

# Sunucuyu başlat
node server.js

# Veya
npm start
```

### Örnek Canlıya Alma (Render üzerinden)

1. **Repository'yi Render'a bağla**
2. **Environment Variables ekle:**
   - `RESEND_API_KEY`: Resend API Anahtarı
   - `RESEND_TO_EMAIL`: Gelen Mesajların İletileceği e-posta Adresi
3. **Build Command:** `npm install`
4. **Start Command:** `node server.js`

## 📊 Loglama Sistemi

**Örnek loglar:**
```
🚀 Server is running on port 5000
📧 Email endpoint: /send-email
Email gönderme isteği alındı - Gönderen: Ahmet (ahmet@example.com)
Email gönderiliyor - Gönderen: Ahmet (ahmet@example.com)
✅ Email başarıyla gönderildi - Gönderen: Ahmet (ahmet@example.com)
❌ Email gönderme hatası - Gönderen: Ahmet (ahmet@example.com) - Hata: Invalid credentials
```

## 📤 Alternatif Versiyon (NodeMailer + Gmail SMTP)

> 💡 Bu projenin, **NodeMailer** kütüphanesi ve **Gmail SMTP (Simple Mail Transfer Protocol)** altyapısı kullanılarak geliştirilen klasik sürümüne [bağlantıdan](https://github.com/osmandemir2533/websiteEmailPost-SMPT-) ulaşabilirsiniz.

## 👨‍💻 Geliştirici

- [Osman Demir](https://github.com/osmandemir2533)

---

## 📬 İletişim

Bu projede yaptığım çalışmalarla ilgili başka sorularınız varsa, **Benimle her zaman iletişime geçebilirsiniz**:

[![LinkedIn](https://img.icons8.com/ios-filled/50/0A66C2/linkedin.png)](https://www.linkedin.com/in/osmandemir2533/)  &nbsp;&nbsp; 
[![Website](https://img.icons8.com/ios-filled/50/8e44ad/domain.png)](https://osmandemir2533.github.io/)

---
