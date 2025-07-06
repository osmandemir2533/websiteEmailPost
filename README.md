# Website Contact Form Backend

> ⚠️ Bu repo, [osmandemir2533.github.io](https://osmandemir2533.github.io/) web sitesinin iletişim formu için özel olarak geliştirilmiş bir backend servisidir. Web sitesinin reposuna [buradan](https://github.com/osmandemir2533/osmandemir2533.github.io) ulaşabilirsiniz.

**--Hazır email gönderme servisi --**

Bu proje, statik web siteleri için güvenli ve kolay bir iletişim formu backend çözümü sunar. Gmail SMTP kullanarak e-posta gönderimi sağlar.

## ✨ Özellikler

- CORS desteği ile güvenli cross-origin istekleri
- Gmail SMTP entegrasyonu ile güvenilir e-posta gönderimi
- Basit ve anlaşılır API endpoint'leri
- Hata yönetimi ve doğrulama kontrolleri
- Detaylı loglama sistemi
- Kullanıcı bilgileri toplama
- Responsive HTML email template'i


## 🛠️ Teknolojiler

- Node.js
- Express.js
- Nodemailer (Gmail SMTP)
- CORS
- dotenv

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

## 🔒 Güvenlik ve Yapılandırma

### Environment Variables

Proje güvenliği için kritik bilgiler environment variables olarak saklanır:

```javascript
// Gmail SMTP ayarları
const EMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
};
```

### CORS Yapılandırması

```javascript
app.use(cors()); // Tüm origin'lere izin verir
```

### Loglama Sistemi

**Örnek loglar:**
```
Email gönderme isteği alındı - Gönderen: Ahmet (ahmet@example.com)
Email gönderiliyor - Gönderen: Ahmet (ahmet@example.com)
✅ Email başarıyla gönderildi - Gönderen: Ahmet (ahmet@example.com)
❌ Email gönderme hatası - Gönderen: Ahmet (ahmet@example.com) - Hata: Invalid credentials
```

## 🚀 Çalıştırma

```bash
# Bağımlılıkları yükle
npm install

# .env dosyasını oluştur ve düzenle
# GMAIL_USER=
# GMAIL_APP_PASSWORD=

# Sunucuyu başlat
node server.js

# Veya 
npm start
```


## 👨‍💻 Geliştirici

- [Osman Demir](https://github.com/osmandemir2533)

---

## 📬 İletişim

Bu projede yaptığım çalışmalarla ilgili başka sorularınız varsa, **Benimle her zaman iletişime geçebilirsiniz**:

[![LinkedIn](https://img.icons8.com/ios-filled/50/0A66C2/linkedin.png)](https://www.linkedin.com/in/osmandemir2533/)  &nbsp;&nbsp; 
[![Website](https://img.icons8.com/ios-filled/50/8e44ad/domain.png)](https://osmandemir2533.github.io/)

---
