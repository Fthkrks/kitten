import nodemailer from 'nodemailer';

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Email template for user confirmation
export function getUserConfirmationEmail(firstName: string) {
  return {
    subject: 'Application Received - Astrid Moon Cattery',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #5A5A5A; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; color: #8EA58E; font-size: 24px; margin-bottom: 20px; }
          .content { background-color: #f9f9f9; padding: 20px; border-radius: 8px; }
          .footer { margin-top: 20px; text-align: center; font-size: 14px; color: #888; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="header">Astrid Moon Cattery</h1>
          <div class="content">
            <p>Dear ${firstName},</p>
            
            <p>Thank you for submitting your kitten application to Astrid Moon Cattery!</p>
            
            <p>We have received your application and will review it carefully. Please allow 1-3 business days for us to get back to you.</p>
            
            <p>If you have any questions in the meantime, feel free to contact us.</p>
            
            <p>Best regards,<br>
            <strong>Astrid Moon Cattery</strong><br>
            (832) 951-0506</p>
          </div>
          <div class="footer">
            <p>This is an automated confirmation email. Please do not reply directly to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Dear ${firstName},

Thank you for submitting your kitten application to Astrid Moon Cattery!

We have received your application and will review it carefully. Please allow 1-3 business days for us to get back to you.

Best regards,
Astrid Moon Cattery
(832) 951-0506`,
  };
}

// Email template for admin notification
export function getAdminNotificationEmail(formData: any, questions: any[]) {
  const questionsHtml = questions.map((q) => {
    const answer = formData.dynamicAnswers?.[q.id] || 'Not answered';
    return `
      <div style="margin-bottom: 15px;">
        <strong>${q.question}</strong><br>
        <span style="color: #666;">Answer: ${answer}</span>
      </div>
    `;
  }).join('');

  return {
    subject: `New Kitten Application - ${formData.firstName} ${formData.lastName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 700px; margin: 0 auto; padding: 20px; }
          .header { background-color: #8EA58E; color: white; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 25px; border-radius: 0 0 8px 8px; }
          .section { margin-bottom: 25px; }
          .section-title { font-size: 18px; color: #8EA58E; font-weight: bold; margin-bottom: 10px; border-bottom: 2px solid #8EA58E; padding-bottom: 5px; }
          .info-row { margin-bottom: 8px; }
          .label { font-weight: bold; color: #555; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">New Kitten Application</h1>
          </div>
          <div class="content">
            <div class="section">
              <div class="section-title">CONTACT INFORMATION</div>
              <div class="info-row"><span class="label">Name:</span> ${formData.firstName} ${formData.lastName}</div>
              <div class="info-row"><span class="label">Email:</span> ${formData.email}</div>
              <div class="info-row"><span class="label">Phone:</span> ${formData.phone}</div>
              <div class="info-row"><span class="label">Address:</span> ${formData.streetAddress}</div>
              <div class="info-row"><span class="label">City:</span> ${formData.city}</div>
              <div class="info-row"><span class="label">State:</span> ${formData.state}</div>
              <div class="info-row"><span class="label">Zip:</span> ${formData.zip}</div>
            </div>
            
            <div class="section">
              <div class="section-title">QUESTIONS & ANSWERS</div>
              ${questionsHtml}
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `New Kitten Application

CONTACT INFORMATION:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.streetAddress}, ${formData.city}, ${formData.state} ${formData.zip}

QUESTIONS & ANSWERS:
${questions.map((q) => {
  const answer = formData.dynamicAnswers?.[q.id] || 'Not answered';
  return `${q.question}\nAnswer: ${answer}`;
}).join('\n\n')}`,
  };
}

// Send email function
export async function sendEmail(to: string, subject: string, html: string, text: string) {
  try {
    console.log('📧 Attempting to send email to:', to);
    console.log('📧 Using Gmail SMTP with Nodemailer');
    
    const transporter = createTransporter();
    
    const info = await transporter.sendMail({
      from: `"Astrid Moon Cattery" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text,
    });

    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    throw error;
  }
}
