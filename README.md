# Website Contact Form Backend
## _Canlı Ortam - Production Environment_

> ⚠️ Bu repo, [osmandemir2533.github.io](https://osmandemir2533.github.io/) web sitesinin iletişim formu için özel olarak geliştirilmiş bir backend servisidir. Web sitesinin reposuna [buradan](https://github.com/osmandemir2533/osmandemir2533.github.io) ulaşabilirsiniz.

**--Email gönderme servisi --**

Bu proje, statik web siteleri için güvenli ve kolay bir iletişim formu backend çözümü sunar. Gmail SMTP kullanarak e-posta gönderimi sağlar.

## ✨ Özellikler

- 🔒 **Güvenlik**: XSS koruması ve CORS desteği
- 📧 **Email**: Gmail SMTP entegrasyonu ile güvenilir e-posta gönderimi
- 🌍 **Geolocation**: IP adresinden otomatik konum tespiti
- 📊 **Detaylı Bilgi**: Tarayıcı, cihaz, işletim sistemi ve dil bilgileri
- 🔍 **Loglama**: Detaylı loglama sistemi
- ⚡ **API**: Basit ve anlaşılır REST API endpoint'leri

## 🛠️ Teknolojiler

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Nodemailer** - Email gönderimi (Gmail SMTP)
- **Axios** - HTTP istekleri (IP geolocation için)
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables yönetimi

## 📦 Kurulum

### 1. Bağımlılıkları Yükle

```bash
# Tüm paketleri yükle
npm install

# Veya tek tek yükle
npm install express cors nodemailer axios dotenv body-parser
```

### 2. Environment Variables

> Proje güvenliği için kritik bilgiler environment variables olarak saklanır:

`.env` dosyası oluşturun:

```env
# Gmail SMTP Ayarları
GMAIL_USER=
GMAIL_APP_PASSWORD=

```

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
  "timestamp": "2024-01-15T10:30:00.000Z"
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

### Environment Variables
Kritik bilgiler güvenli şekilde saklanır:
```javascript
const EMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
};
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
echo "GMAIL_USER= " > .env
echo "GMAIL_APP_PASSWORD= " >> .env

# Sunucuyu başlat
node server.js

# Veya
npm start
```

### Örnek Canlıya Alma (Render üzerinden)

1. **Repository'yi Render'a bağla**
2. **Environment Variables ekle:**
   - `GMAIL_USER`: Gmail adresiniz
   - `GMAIL_APP_PASSWORD`: Gmail uygulama şifresi
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

## 👨‍💻 Geliştirici

- [Osman Demir](https://github.com/osmandemir2533)

---

## 📬 İletişim

Bu projede yaptığım çalışmalarla ilgili başka sorularınız varsa, **Benimle her zaman iletişime geçebilirsiniz**:

[![LinkedIn](https://img.icons8.com/ios-filled/50/0A66C2/linkedin.png)](https://www.linkedin.com/in/osmandemir2533/)  &nbsp;&nbsp; 
[![Website](https://img.icons8.com/ios-filled/50/8e44ad/domain.png)](https://osmandemir2533.github.io/)

---
