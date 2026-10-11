const nodemailer = require('nodemailer');

// In-memory OTP storage: email -> { otp, expiresAt, verified }
const otpStore = new Map();

// Create reusable transporter
let transporter = null;

const getTransporter = async () => {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user, pass }
    });
    console.log('[MailService] Configured with custom SMTP:', host);
  } else {
    // Development fallback: Use Ethereal test account or local logging
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      console.log('[MailService] Configured with Ethereal test SMTP:', testAccount.user);
    } catch (err) {
      console.warn('[MailService] Fallback to direct mock transport:', err.message);
      transporter = nodemailer.createTransport({
        streamTransport: true,
        newline: 'unix',
        buffer: true
      });
    }
  }

  return transporter;
};

// Send OTP Email
const sendOtpEmail = async (email, otp) => {
  const mailTransporter = await getTransporter();
  const fromEmail = process.env.SMTP_FROM || process.env.COMPANY_EMAIL || 'hello@datagalactic.in';

  const mailOptions = {
    from: `"DataGalactic Verification" <${fromEmail}>`,
    to: email,
    subject: `Your DataGalactic Verification Code: ${otp}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background: #05142f; padding: 28px 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Data<span style="color: #4c8df7;">Galactic</span></h1>
          <p style="color: #94a3b8; margin: 6px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Precision Beyond Limits</p>
        </div>
        <div style="padding: 32px 28px; background: #f8fafc;">
          <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">Email Verification Code</h2>
          <p style="color: #475569; font-size: 14px; line-height: 1.6;">Hello,</p>
          <p style="color: #475569; font-size: 14px; line-height: 1.6;">Thank you for requesting a project consultation with DataGalactic. Please enter the following 6-digit One-Time Password (OTP) to verify your business email address:</p>
          
          <div style="text-align: center; margin: 28px 0;">
            <div style="display: inline-block; background: #05142f; color: #4c8df7; font-size: 32px; font-weight: 800; letter-spacing: 8px; padding: 16px 36px; border-radius: 10px; border: 2px dashed #4c8df7;">
              ${otp}
            </div>
            <p style="color: #64748b; font-size: 12px; margin-top: 10px;">This OTP is valid for 10 minutes. Do not share this code with anyone.</p>
          </div>

          <p style="color: #475569; font-size: 13px; line-height: 1.6;">If you did not request this verification, you can safely ignore this email.</p>
        </div>
        <div style="background: #05142f; padding: 18px 24px; text-align: center; color: #64748b; font-size: 12px;">
          <p style="margin: 0; color: #94a3b8;">&copy; ${new Date().getFullYear()} DataGalactic. All rights reserved.</p>
          <p style="margin: 4px 0 0; color: #64748b;">Enterprise Data &amp; Business Support Services | hello@datagalactic.in</p>
        </div>
      </div>
    `
  };

  const info = await mailTransporter.sendMail(mailOptions);
  console.log(`[MailService] OTP sent to ${email} (MessageId: ${info.messageId || 'direct'})`);
  
  // If Ethereal was used, log the preview URL for testing
  if (nodemailer.getTestMessageUrl(info)) {
    console.log(`[MailService] Ethereal Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  }

  return { success: true, messageId: info.messageId, previewUrl: nodemailer.getTestMessageUrl(info) };
};

// Send Enquiry Submission Confirmation & Admin Notification
const sendEnquiryEmails = async (enquiryData, enquiryId) => {
  const mailTransporter = await getTransporter();
  const fromEmail = process.env.SMTP_FROM || process.env.COMPANY_EMAIL || 'hello@datagalactic.in';
  const adminEmail = process.env.ADMIN_EMAIL || process.env.COMPANY_EMAIL || 'hello@datagalactic.in';

  // 1. Client Confirmation Email
  const clientOptions = {
    from: `"DataGalactic Client Support" <${fromEmail}>`,
    to: enquiryData.email,
    subject: `Enquiry Received: ${enquiryData.service} [Ref: #${String(enquiryId).slice(-6)}]`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: #05142f; padding: 26px 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">Data<span style="color: #4c8df7;">Galactic</span></h1>
          <p style="color: #94a3b8; margin: 4px 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Precision Beyond Limits</p>
        </div>
        <div style="padding: 28px 24px; background: #f8fafc;">
          <h2 style="color: #0f172a; margin-top: 0; font-size: 18px;">Thank You, ${enquiryData.name}!</h2>
          <p style="color: #475569; font-size: 14px; line-height: 1.6;">
            We have received your enquiry for <strong>${enquiryData.service}</strong>. Our enterprise operations team is currently reviewing your project scope.
          </p>
          
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 20px 0;">
            <h4 style="margin: 0 0 12px; color: #05142f; font-size: 14px; border-bottom: 1px solid #f1f5f9; pb-2;">Project Summary:</h4>
            <table style="width: 100%; font-size: 13px; color: #334155;">
              <tr><td style="padding: 4px 0; color: #64748b; width: 38%;">Reference ID:</td><td style="font-weight: 600;">#${String(enquiryId).slice(-8)}</td></tr>
              <tr><td style="padding: 4px 0; color: #64748b;">Company:</td><td style="font-weight: 600;">${enquiryData.companyName}</td></tr>
              <tr><td style="padding: 4px 0; color: #64748b;">Service:</td><td style="font-weight: 600; color: #0284c7;">${enquiryData.service}</td></tr>
              <tr><td style="padding: 4px 0; color: #64748b;">Project Engagement:</td><td>${enquiryData.projectType}</td></tr>
              <tr><td style="padding: 4px 0; color: #64748b;">Country:</td><td>${enquiryData.country}</td></tr>
              ${enquiryData.phone ? `<tr><td style="padding: 4px 0; color: #64748b;">Phone:</td><td>${enquiryData.phone}</td></tr>` : ''}
              <tr><td style="padding: 4px 0; color: #64748b;">Estimated Volume:</td><td>${enquiryData.estimatedVolume || 'Standard'}</td></tr>
            </table>
          </div>

          <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px 16px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af; font-size: 13px; font-weight: 600;">What happens next?</p>
            <p style="margin: 4px 0 0; color: #1e3a8a; font-size: 12px; line-height: 1.5;">
              A Dedicated Project Lead will analyze your requirements and send a customized quote &amp; sample pilot estimate within <strong>12 to 24 hours</strong>.
            </p>
          </div>

          <p style="color: #64748b; font-size: 12px; margin-top: 24px;">Need urgent assistance? Reply directly to this email or call us at <strong>+91 9363164608</strong>.</p>
        </div>
        <div style="background: #05142f; padding: 16px 24px; text-align: center; color: #64748b; font-size: 11px;">
          &copy; ${new Date().getFullYear()} DataGalactic Enterprise Services.
        </div>
      </div>
    `
  };

  // 2. Admin Alert Email
  const adminOptions = {
    from: `"DataGalactic Leads" <${fromEmail}>`,
    to: adminEmail,
    subject: `🚨 [New Lead] ${enquiryData.name} (${enquiryData.companyName}) - ${enquiryData.service}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; background: #f1f5f9;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 24px; border-radius: 8px; border: 1px solid #cbd5e1;">
          <h2 style="color: #0f172a; margin-top: 0;">New Project Consultation Request</h2>
          <p><strong>Name:</strong> ${enquiryData.name}</p>
          <p><strong>Company:</strong> ${enquiryData.companyName}</p>
          <p><strong>Email:</strong> <a href="mailto:${enquiryData.email}">${enquiryData.email}</a></p>
          <p><strong>Phone:</strong> ${enquiryData.phone || 'N/A'}</p>
          <p><strong>Country:</strong> ${enquiryData.country}</p>
          <p><strong>Service Requested:</strong> ${enquiryData.service}</p>
          <p><strong>Engagement Type:</strong> ${enquiryData.projectType}</p>
          <p><strong>Volume:</strong> ${enquiryData.estimatedVolume}</p>
          <p><strong>Description:</strong></p>
          <div style="background: #f8fafc; padding: 12px; border-radius: 4px; border: 1px solid #e2e8f0; white-space: pre-wrap;">
            ${enquiryData.description}
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #64748b;">Logged at: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `
  };

  try {
    const results = await Promise.allSettled([
      mailTransporter.sendMail(clientOptions),
      mailTransporter.sendMail(adminOptions)
    ]);
    console.log('[MailService] Real-time confirmation emails processed:', results.map(r => r.status));
  } catch (err) {
    console.error('[MailService Error]:', err.message);
  }
};

module.exports = {
  otpStore,
  sendOtpEmail,
  sendEnquiryEmails
};
