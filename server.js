const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

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
    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun!' });
  }

  try {
    const response = await axios.post(WEB3FORMS_API_URL, {
      access_key: process.env.WEB3FORMS_ACCESS_KEY,
      name,
      email,
      message,
    });

    if (response.data.success) {
      res.status(200).json({ message: 'Form başarıyla gönderildi!' });
    } else {
      res.status(500).json({ message: 'Form gönderilemedi, tekrar deneyin.' });
    }
  } catch (error) {
    console.error('Form gönderme hatası:', error.message);
    res.status(500).json({ message: 'Bir hata oluştu, tekrar deneyin.' });
  }
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
