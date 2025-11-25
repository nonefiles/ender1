import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type');

    let data: any;
    let attachments: any[] = [];

    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData();
      data = Object.fromEntries(formData.entries());

      const file = formData.get('cv') as File | null;
      if (file) {
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

    let subject = 'Yeni Form Başvurusu';
    let htmlContent = '';

    switch (type) {
      case 'volunteer':
        subject = 'Yeni Gönüllü Başvurusu';
        htmlContent = `
          <h1>Yeni Gönüllü Başvurusu</h1>
          <p>Ad Soyad: ${formData.name}</p>
          <p>Email: ${formData.email}</p>
          <p>Telefon: ${formData.phone}</p>
          <p>Mesaj: ${formData.message}</p>
        `;
        break;
      case 'contact':
        subject = 'Yeni İletişim Formu Mesajı';
        htmlContent = `
          <h1>Yeni İletişim Formu Mesajı</h1>
          <p>Ad Soyad: ${formData.name}</p>
          <p>Email: ${formData.email}</p>
          <p>Konu: ${formData.subject}</p>
          <p>Mesaj: ${formData.message}</p>
        `;
        break;
      case 'application':
        subject = `Yeni Proje Başvurusu: ${applicationTitle}`;
        htmlContent = `
          <h1>Yeni Proje Başvurusu</h1>
          <p>Proje Adı: ${applicationTitle}</p>
          <p>Ad Soyad: ${formData.name}</p>
          <p>Email: ${formData.email}</p>
          <p>Telefon: ${formData.phone}</p>
          <p>Mesaj: ${formData.message}</p>
        `;
        break;
      default:
        htmlContent = `
          <h1>Bilinmeyen Form Tipi</h1>
          <pre>${JSON.stringify(formData, null, 2)}</pre>
        `;
        break;
    }

    const { data: emailData, error } = await resend.emails.send({
      from: 'cumcum565@gmail.com', // Resend tarafından doğrulanmış bir e-posta adresi kullanın
      to: ['cumcum565@gmail.com'],
      subject: subject,
      html: htmlContent,
      attachments: attachments,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully', emailData });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}