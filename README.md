# Website Contact Form Backend

> ⚠️ Bu repo, [osmandemir2533.github.io](https://osmandemir2533.github.io/) web sitesinin iletişim formu için özel olarak geliştirilmiş bir backend servisidir. Web sitesinin reposuna [buradan](https://github.com/osmandemir2533/osmandemir2533.github.io) ulaşabilirsiniz.

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

## 🔌 API Kullanımı

### E-posta Gönderme

**Endpoint:** `POST @https://backend-url.com/api/`

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

## 🔒 Güvenlik ve Yapılandırma

Bu proje Render platformunda host edilmektedir. Web3Forms API anahtarı güvenli bir şekilde yönetilmektedir:

1. Render Dashboard'da projenin Environment Variables bölümüne gidilir
2. `WEB3FORMS_ACCESS_KEY` adında yeni bir environment variable oluşturulur
3. Web3Forms'tan alınan API anahtarı bu değişkene atanır
4. Değişiklikler kaydedilir ve proje yeniden deploy edilir

Projede API anahtarına erişim, Node.js'in `process.env` özelliği kullanılarak yapılır:

```javascript
// API anahtarına güvenli erişim
const apiKey = process.env.WEB3FORMS_ACCESS_KEY;
```

Bu sayede API anahtarı .env içinde güvenli bir şekilde saklanır ve hiçbir şekilde kaynak kodunda görünmez.

## 👨‍💻 Geliştirici

- [Osman Demir](https://github.com/osmandemir2533)

---

## 📬 İletişim

Bu projede yaptığım çalışmalarla ilgili başka sorularınız varsa, **Benimle her zaman iletişime geçebilirsiniz**:

[![LinkedIn](https://img.icons8.com/ios-filled/50/0A66C2/linkedin.png)](https://www.linkedin.com/in/osmandemir2533/)  &nbsp;&nbsp; 
[![Website](https://img.icons8.com/ios-filled/50/8e44ad/domain.png)](https://osmandemir2533.github.io/)

---
