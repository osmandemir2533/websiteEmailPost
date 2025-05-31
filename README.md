# Website Contact Form Backend

Bu proje, statik web siteleri için güvenli ve kolay bir iletişim formu backend çözümü sunar. Web3Forms servisini kullanarak e-posta gönderimi sağlar.

## 🚀 Proje Hakkında

Bu backend servisi, [osmandemir2533.github.io](https://osmandemir2533.github.io/) web sitesindeki iletişim formunu desteklemek için geliştirilmiştir. Statik web sitelerinde dinamik form işlemlerini yönetmek için ideal bir çözümdür.

## ✨ Özellikler

- CORS desteği ile güvenli cross-origin istekleri
- Web3Forms entegrasyonu ile güvenilir e-posta gönderimi
- Basit ve anlaşılır API endpoint'leri
- Hata yönetimi ve doğrulama kontrolleri

## 🛠️ Teknolojiler

- Node.js
- Express.js
- Web3Forms API
- Axios
- CORS
- dotenv

## 📦 Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/osmandemir2533/websiteEmailPost.git
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyası oluşturun ve Web3Forms API anahtarınızı ekleyin:
```env
WEB3FORMS_ACCESS_KEY=your_access_key_here
```

4. Sunucuyu başlatın:
```bash
npm start
```

## 🔌 API Kullanımı

### E-posta Gönderme

**Endpoint:** `POST @https://backend-url.com/api/send-email`

**Request Body:**
```json
{
  "name": "Gönderen Adı",
  "email": "gonderen@email.com",
  "message": "Mesaj içeriği"
}
```

**Başarılı Yanıt:**
```json
{
  "message": "Form başarıyla gönderildi!"
}
```

## 🔒 Güvenlik

- CORS politikaları ile güvenli cross-origin istekleri
- Web3Forms API anahtarı .env dosyasında güvenli bir şekilde saklanır
- Gelen isteklerde gerekli alanların doğrulaması yapılır

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

- [Osman Demir](https://github.com/osmandemir2533) 