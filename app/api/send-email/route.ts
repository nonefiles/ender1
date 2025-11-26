import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// API anahtarını çevre değişkeninden (env) alıyoruz
const resend = new Resend(process.env.RESEND_API_KEY);

// Tarih formatlama yardımcısı
const getCurrentDate = () => {
  return new Date().toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type');

    let data: any;
    let attachments: any[] = [];

    // Form verilerini veya JSON verilerini işle
    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData();
      data = Object.fromEntries(formData.entries());

      // Dosya (CV vb.) varsa işle
      const file = formData.get('cv') as File | null;
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        attachments.push({
          filename: file.name,
          content: buffer,
        });
      }
    } else if (contentType?.includes('application/json')) {
      data = await request.json();
    } else {
      return NextResponse.json({ error: 'Unsupported Content-Type' }, { status: 400 });
    }

    const { type, applicationTitle, ...formData } = data;

    // E-posta detaylarını hazırla
    let emailTitle = '';
    let emailFields: { label: string; value: string }[] = [];
    const date = getCurrentDate();

    // Gönderen kişinin e-posta adresi (Yanıtla dendiğinde bu adrese gidecek)
    const senderEmail = formData.email || 'no-reply@engelleriasin.org';

    // Form tipine göre içerik belirle
    switch (type) {
      case 'volunteer':
        emailTitle = 'Yeni Gönüllü Başvurusu';
        emailFields = [
          { label: 'Ad Soyad', value: formData.name },
          { label: 'E-posta', value: formData.email },
          { label: 'Telefon', value: formData.phone },
          { label: 'Meslek / Uzmanlık', value: formData.occupation || '-' },
          { label: 'Yetenekler', value: formData.skills || '-' },
          { label: 'Motivasyon / Mesaj', value: formData.message },
        ];
        break;
      case 'contact':
        emailTitle = `İletişim Formu: ${formData.subject}`;
        emailFields = [
          { label: 'Ad Soyad', value: formData.name },
          { label: 'E-posta', value: formData.email },
          { label: 'Konu', value: formData.subject },
          { label: 'Mesaj', value: formData.message },
        ];
        break;
      case 'application':
        emailTitle = `Proje Başvurusu: ${applicationTitle}`;
        emailFields = [
          { label: 'Başvurulan Proje', value: applicationTitle },
          { label: 'Ad Soyad', value: formData.name },
          { label: 'E-posta', value: formData.email },
          { label: 'Telefon', value: formData.phone },
          { label: 'Deneyim', value: formData.experience || '-' },
          { label: 'Motivasyon', value: formData.motivation || '-' },
        ];
        break;
      default:
        emailTitle = 'Yeni Web Sitesi Bildirimi';
        emailFields = Object.entries(formData).map(([key, value]) => ({
          label: key,
          value: String(value),
        }));
        break;
    }

    // Profesyonel HTML E-posta Şablonu
    const htmlContent = `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${emailTitle}</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border: 1px solid #e0e0e0; }
    .header { background-color: #671615; color: #ffffff; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
    .header p { margin: 8px 0 0; opacity: 0.9; font-size: 14px; font-weight: 400; }
    .content { padding: 40px 30px; background-color: #ffffff; }
    .title-section { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #f8f8f8; }
    .title-section h2 { color: #333; margin: 0 0 10px; font-size: 20px; font-weight: 700; }
    .date-badge { display: inline-block; background-color: #f5f5f5; padding: 6px 12px; border-radius: 20px; font-size: 12px; color: #666; font-weight: 500; }
    .field-group { margin-bottom: 20px; }
    .label { font-size: 11px; text-transform: uppercase; color: #999; font-weight: 700; letter-spacing: 1px; margin-bottom: 6px; display: block; }
    .value { font-size: 15px; color: #222; line-height: 1.6; background-color: #fcfcfc; padding: 12px; border-radius: 6px; border-left: 3px solid #671615; }
    .footer { background-color: #f9f9f9; padding: 25px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eaeaea; }
    .footer a { color: #671615; text-decoration: none; font-weight: 600; }
    .logo-text { font-weight: 800; color: #671615; font-size: 14px; letter-spacing: 1px; }
    @media only screen and (max-width: 600px) {
      .container { margin: 0; border-radius: 0; width: 100% !important; }
      .content { padding: 20px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Başlık Alanı -->
    <div class="header">
      <h1>Engelleri Aşın Derneği</h1>
      <p>Web Sitesi Bildirim Sistemi</p>
    </div>

    <!-- İçerik Alanı -->
    <div class="content">
      <div class="title-section">
        <h2>${emailTitle}</h2>
        <div class="date-badge">${date}</div>
      </div>
      
      ${emailFields.map(field => `
        <div class="field-group">
          <span class="label">${field.label}</span>
          <div class="value">${field.value ? field.value.replace(/\n/g, '<br>') : '-'}</div>
        </div>
      `).join('')}
      
    </div>

    <!-- Alt Bilgi -->
    <div class="footer">
      <p>Bu e-posta <a href="https://www.engelleriasin.org">www.engelleriasin.org</a> üzerinden otomatik olarak gönderilmiştir.</p>
      <p style="margin-top: 10px;">&copy; ${new Date().getFullYear()} Engelleri Aşın Derneği. Tüm hakları saklıdır.</p>
    </div>
  </div>
</body>
</html>
    `;

    const { data: emailData, error } = await resend.emails.send({
      // ÖNEMLİ: Domain doğrulaması yapana kadar 'from' kısmını değiştirmeyin.
      from: 'onboarding@resend.dev', 
      
      // Formu dolduran kişiye "Yanıtla" dendiğinde gidecek adres
      replyTo: senderEmail, 
      
      // Başvuruların geleceği sizin adresiniz
      to: ['cumcum565@gmail.com'], 
      
      subject: `${emailTitle} - ${formData.name}`, // Konu başlığı artık daha açıklayıcı
      html: htmlContent,
      attachments: attachments,
    });

    if (error) {
      console.error('Resend Hatası:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email başarıyla gönderildi', emailData });
  } catch (error) {
    console.error('API Hatası:', error);
    return NextResponse.json({ error: 'Sunucu Hatası' }, { status: 500 });
  }
}