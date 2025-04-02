const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const qs = require('qs');  // qs modülünü ekliyoruz
require('dotenv').config();

const app = express();

// Portu, Render'ın sağladığı ortam değişkeninden alıyoruz.
const port = process.env.PORT || 5000;  // Eğer Render ortamında ise, PORT otomatik belirlenir.

// Middleware'ler
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('API Çalışıyor! 🚀 POST /send-email endpointini kullan.');
});

// Web3Forms API URL
const WEB3FORMS_API_URL = 'https://api.web3forms.com/submit';

// İletişim formu için POST endpoint
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    console.error('Eksik veri:', req.body);  // Verinin eksik olduğunda loglama
    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun!' });
  }

  try {
    console.log('Form verileri:', { name, email, message });

    // Verileri application/x-www-form-urlencoded formatına dönüştürme
    const formData = qs.stringify({
      access_key: process.env.WEB3FORMS_ACCESS_KEY,
      name,
      email,
      message
    });

    // Axios ile form verilerini Web3Forms API'ye gönderme
    const response = await axios.post(WEB3FORMS_API_URL, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',  // Content-Type başlığını uygun şekilde ayarlıyoruz
      },
    });

    console.log('Web3Forms yanıtı:', response.data);

    if (response.data.success) {
      res.status(200).json({ message: 'Form başarıyla gönderildi!' });
    } else {
      console.error('Web3Forms hatası:', response.data);
      res.status(500).json({ message: 'Form gönderilemedi, tekrar deneyin.' });
    }
  } catch (error) {
    console.error('Form gönderme hatası:', error.message);
    res.status(500).json({ message: 'Bir hata oluştu, tekrar deneyin.' });
  }
});

// Sunucuyu başlat (Render URL ile)
app.listen(port, () => {
  console.log(`Server is running on https://osmandemirwebsiteemailpost.onrender.com`);  // Render URL'si
});
