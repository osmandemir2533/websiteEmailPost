import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const resend = new Resend(process.env.RESEND_API_KEY);

//--------------
// SADECE LOCALDE TEST İÇİN TAMAMEN AÇIK CORS - Testleri yaptıktan sonra 12 ile 13 ü yorum satırına al canlıya atmak için 16.satırda denilenleri yap
//app.use(cors());
//app.options('*', cors());
//--------------



//--------------
//CANLI İÇİN AŞAĞIDAKİ KODLAR - 17 ile 24 arasındaki yorum satırlarını kaldır
const corsOptions = {
  origin: [
    'https://osmandemir2533.github.io',
    'https://osmandemir.netlify.app'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
//--------------



// Middleware'ler
app.use(bodyParser.json());

// Email transporter oluştur


// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Çalışıyor! 🚀',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// User-Agent'tan cihaz modelini tahmin etmeye çalış
function getDeviceModel(userAgent) {
  // iPhone/iPad
  const iphoneMatch = userAgent.match(/iPhone|iPad|iPod/);
  if (iphoneMatch) return iphoneMatch[0];

  // Android cihazlar (ör: SM-G991B, Pixel 6, Redmi Note 8)
  const androidModelMatch = userAgent.match(/; ([^;]*?Build)/);
  if (androidModelMatch && androidModelMatch[1]) {
    // "SM-G991B Build/..." gibi ise sadece model kodunu al
    return androidModelMatch[1].replace(' Build', '').trim();
  }

  // Samsung, Huawei, Xiaomi, OnePlus gibi markalar için ek kontrol
  const knownModels = userAgent.match(/(SM-[A-Z0-9]+|ONEPLUS[A-Z0-9]+|Redmi [^;]+|M2007J3SG|Mi [^;]+)/i);
  if (knownModels) return knownModels[0];

  // PC ve diğerleri için model bilgisi yok
  if (userAgent.includes('Windows')) return 'PC';
  if (userAgent.includes('Macintosh')) return 'Mac';
  if (userAgent.includes('Linux')) return 'Linux PC';

  return 'Bilinmeyen';
}

  async function getGeoLocation(ip) {
    try {
      console.log('GeoLocation isteği gönderiliyor - IP:', ip);
      const response = await axios.get(`http://ip-api.com/json/${ip}?fields=country,regionName,city,district,query`);
      const data = response.data;
      console.log('GeoLocation API yanıtı:', data);
      
      if (data && data.status !== 'fail') {
        // Örnek: Türkiye, İstanbul, Kadıköy
        let detay = [data.country, data.regionName, data.city, data.district].filter(Boolean).join(', ');
        console.log('GeoLocation başarılı:', detay);
        return detay || 'Localhost (Test Ortamı)';
      } else {
        console.log('GeoLocation başarısız - Status:', data.status, 'Message:', data.message);
        return 'API yanıt vermedi';
      }
    } catch (e) {
      console.error('GeoLocation hatası:', e.message);
      return 'API hatası';
    }
  }

// XSS temizliği için yardımcı fonksiyon
function escapeHtml(text) {
  if (!text) return '';
  return text.toString().replace(/[&<>"']/g, function(m) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m];
  });
}

// İletişim formu için POST endpoint - Kendi email servisimiz
app.post('/send-email', async (req, res) => {
  const { name, email, message, phone, location } = req.body;
  
  // Sistem bilgilerini otomatik al
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket?.remoteAddress || 'Bilinmeyen';
  if (typeof ip === 'string' && ip.includes(',')) {
    ip = ip.split(',')[0].trim();
  }
  
  // IPv6 localhost'u IPv4'e çevir
  if (ip === '::1' || ip === '::ffff:127.0.0.1') {
    ip = '127.0.0.1';
  }
  
  // Localhost için API çağrısı yapma
  let geoLocation;
  if (ip === '127.0.0.1' || ip === '::1') {
    geoLocation = 'Localhost (Test Ortamı)';
  } else {
    geoLocation = await getGeoLocation(ip);
  }
  
  // Tarayıcı bilgisini temizle
  const userAgent = req.headers['user-agent'] || 'Bilinmeyen';
  let browser = 'Bilinmeyen';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';
  else if (userAgent.includes('Opera')) browser = 'Opera';
  
  // Dil bilgisini temizle
  const language = req.headers['accept-language'] || 'Bilinmeyen';
  let cleanLanguage = 'Bilinmeyen';
  if (language.includes('tr-TR')) cleanLanguage = 'Türkçe';
  else if (language.includes('en-US')) cleanLanguage = 'İngilizce';
  else if (language.includes('de')) cleanLanguage = 'Almanca';
  else if (language.includes('fr')) cleanLanguage = 'Fransızca';
  else if (language.includes('es')) cleanLanguage = 'İspanyolca';
  
  // Cihaz tipini algıla
  let deviceType = 'Bilinmeyen';
  if (userAgent.includes('Mobile') || userAgent.includes('Android') || userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    deviceType = 'Mobil';
  } else if (userAgent.includes('Tablet')) {
    deviceType = 'Tablet';
  } else {
    deviceType = 'PC';
  }
  
  // İşletim sistemi algıla
  let os = 'Bilinmeyen';
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac OS X')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iOS')) os = 'iOS';
  
  // Cihaz modelini tahmin et
  const deviceModel = getDeviceModel(userAgent);

  console.log(`Email gönderme isteği alındı - Gönderen: ${name} (${email})`);

  if (!name || !email || !message) {
    console.log(`❌ Eksik alanlar - Gönderen: ${name || 'Bilinmeyen'} (${email || 'Bilinmeyen'})`);
    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun!' });
  }

  // Environment variables kontrolü
  if (!process.env.RESEND_API_KEY) {
    console.error('Resend API anahtarı eksik!');
    return res.status(500).json({ message: 'Sunucu yapılandırma hatası!' });
  }
  

  try {
    console.log(`Email gönderiliyor - Gönderen: ${name} (${email})`);
    
    // Email içeriği
    const mailHtml = `
        <style>
          @media only screen and (max-width: 600px) {
            .mesaj-icerik {
              font-weight: 1500 !important;
              font-size: 1.6rem !important;
            }
            .isim-pc {
              font-weight: 1100 !important;
            }
            .border-left-pc {
              border-left: 7px solid #AFEEEE !important;
            }
          }
          @media only screen and (min-width: 601px) {
            .container-pc {
              max-width: 800px !important;
              margin: 0 auto !important;
            }
            .isim-pc, .mesaj-icerik {
              font-weight: 600 !important;
            }
            .mesaj-kutu-pc {
              border-left: 7px solid #AFEEEE !important;
            }
          }
        </style>
        <div class="container-pc" style="font-family: 'Segoe UI', Arial, sans-serif; background:rgb(244, 248, 255); padding: 8px; border-radius: 18px; box-shadow: 0 8px 32px rgba(80,80,180,0.12); max-width: 600px; margin: 0 auto;">
          <div style="background:#fff; border-radius:12px; box-shadow:0 2px 8px #e0e7ff; padding:24px; margin-bottom:24px;">
            <h2 style="color:#2563eb; margin-top:0; font-size:0.95rem; font-weight:700; margin-bottom:8px;">Gönderen Bilgileri</h2>
            <div style='display:flex; margin:0 0 1px 0;'><div style='min-width:160px; font-weight:700; color:#222;'>İsim:</div><div style='padding-left:8px;'>${escapeHtml(name)}</div></div>
            <div style='display:flex; margin:0 0 1px 0;'><div style='min-width:160px; font-weight:700; color:#222;'>Email:</div><div style='padding-left:8px;'><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div></div>
            ${phone ? `<div style='display:flex; margin:0 0 1px 0;'><div style='min-width:160px; font-weight:700; color:#222;'>Telefon:</div><div style='padding-left:8px;'>${escapeHtml(phone)}</div></div>` : ''}
            ${location ? `<div style='display:flex; margin:0 0 1px 0;'><div style='min-width:160px; font-weight:700; color:#222;'>Konum:</div><div style='padding-left:8px;'>${escapeHtml(location)}</div></div>` : ''}
            <div style='display:flex; margin:0 0 1px 0;'><div style='min-width:160px; font-weight:700; color:#222;'>IP (Konum Adresi):</div><div style='padding-left:8px;'>${ip} <span style="color:#e53935;">${(geoLocation && !geoLocation.startsWith('API') && geoLocation !== 'API yanıt vermedi') ? `(${escapeHtml(geoLocation)})` : '(Adres alınamadı)'}</span></div></div>
            <div style='display:flex; margin:0 0 1px 0;'><div style='min-width:160px; font-weight:700; color:#222;'>Tarayıcı:</div><div style='padding-left:8px;'>${escapeHtml(browser)}</div></div>
            <div style='display:flex; margin:0 0 1px 0;'><div style='min-width:160px; font-weight:700; color:#222;'>Cihaz:</div><div style='padding-left:8px;'>${escapeHtml(deviceType)}${deviceModel && deviceModel !== deviceType ? ` (${escapeHtml(deviceModel)})` : ''}</div></div>
            <div style='display:flex; margin:0 0 1px 0;'><div style='min-width:160px; font-weight:700; color:#222;'>İşletim Sistemi:</div><div style='padding-left:8px;'>${escapeHtml(os)}</div></div>
            <div style='display:flex; margin:0 0 1px 0;'><div style='min-width:160px; font-weight:700; color:#222;'>Dil:</div><div style='padding-left:8px;'>${escapeHtml(cleanLanguage)}</div></div>
            <div style='display:flex; margin:0 0 0 0;'><div style='min-width:160px; font-weight:700; color:#222;'>Tarih:</div><div style='padding-left:8px;'>${escapeHtml(new Date().toLocaleString('tr-TR'))}</div></div>
          </div>
          <div class="border-left-mobile border-left-pc" style="background: linear-gradient(135deg,rgb(238, 241, 250),rgba(226, 231, 246, 0.91),rgba(206, 216, 244, 0.74),rgba(187, 203, 247, 0.59),rgba(182, 182, 229, 0.59),rgba(151, 102, 186, 0.53)); 
            border-radius: 16px; 
            padding: 40px 8px; 
            margin-bottom: 24px; 
            box-shadow: 0 4px 16px rgb(116, 152, 222);">
          <span style="color:#e53935; font-size:1.1rem; font-weight:normal;">Mesaj:</span>
            <div class="mesaj-icerik" style="font-size:1.35rem; color:#000; font-weight:600; margin-top:16px;">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
          </div>
        </div>
      `;

    // Email gönder
    const response = await resend.emails.send({
      from: 'OsmanMail <onboarding@resend.dev>', // test aşamasında sabit kalmalı
      to: process.env.RESEND_TO_EMAIL,            // .env dosyasındaki maili okur
      subject: '📩 Yeni Mesaj!',
      html: mailHtml
    });
   

    console.log(`✅ Email başarıyla gönderildi - Gönderen: ${name} (${email})`);
    res.status(200).json({ message: 'Form başarıyla gönderildi!' });
    
  } catch (error) {
    console.error(`❌ Email gönderme hatası - Gönderen: ${name} (${email}) - Hata: ${error.message}`);
    res.status(500).json({ message: 'Bir hata oluştu, tekrar deneyin.' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Sunucu hatası:', err);
  res.status(500).json({ message: 'Sunucu hatası oluştu!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint bulunamadı!' });
});

// Sunucuyu başlat
app.listen(port, () => {
// local için:
// console.log(`Server is running on port ${port}`);
// console.log(`Health check: http://localhost:${port}/`);
// console.log(`Email endpoint: http://localhost:${port}/send-email`);  
// Canlı için:
  console.log(`🚀 Server is running on port ${port}`);
  console.log(`📧 Email endpoint: /send-email`);
});
