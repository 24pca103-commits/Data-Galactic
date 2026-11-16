const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');

const dns = require('dns');
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

// In-memory OTP storage: email -> { otp, expiresAt, verified }
const otpStore = new Map();

// Cached transporter
let transporter = null;

/**
 * Configure and return the nodemailer transporter
 */
const getTransporter = async () => {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER || 'kan93095@gmail.com';
  const pass = process.env.SMTP_PASS || 'mewirvlmupfpdwbg';
  const service = process.env.SMTP_SERVICE || (user && user.includes('@gmail.com') ? 'gmail' : undefined);

  // 1. Direct Service (e.g. Gmail with App Password)
  if (service && user && pass) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false
      }
    });
    console.log(`[MailService] Configured direct Gmail SMTP service for: ${user}`);
    return transporter;
  }

  // 2. Custom SMTP Host & Port (e.g. smtp.gmail.com, Zoho, SendGrid, Brevo, AWS SES)
  if (host && user && pass) {
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const secure = process.env.SMTP_SECURE === 'true' || port === 465;

    transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      tls: {
        rejectUnauthorized: false
      }
    });
    console.log(`[MailService] Configured with custom SMTP: ${host}:${port} (secure=${secure}) for ${user}`);
    return transporter;
  }

  // 3. Fallback Development Transporter
  console.log('[MailService] No custom SMTP credentials found in .env (SMTP_USER / SMTP_PASS). Initializing development mailer...');
  try {
    // Quick attempt at Ethereal with a 3-second timeout to avoid stalling requests
    const testAccountPromise = nodemailer.createTestAccount();
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Ethereal setup timed out')), 3000)
    );
    const testAccount = await Promise.race([testAccountPromise, timeoutPromise]);

    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    console.log('[MailService] Connected to Ethereal Dev Mailbox:', testAccount.user);
  } catch (err) {
    console.warn('[MailService] Falling back to Console Logger stream transport:', err.message);
    transporter = nodemailer.createTransport({
      streamTransport: true,
      newline: 'windows',
      buffer: true
    });
  }

  return transporter;
};

/**
 * Format star rating visually
 */
const renderStars = (rating) => {
  const num = Math.max(1, Math.min(5, Number(rating) || 5));
  return '★'.repeat(num) + '☆'.repeat(5 - num);
};

/**
 * Helper to get sender and admin email addresses safely
 */
const getMailAddresses = () => {
  const rawFrom = process.env.SMTP_FROM || process.env.SMTP_USER || process.env.COMPANY_EMAIL || 'kan93095@gmail.com';
  const fromMatch = rawFrom.match(/<([^>]+)>/);
  const fromEmail = fromMatch ? fromMatch[1].trim() : rawFrom.replace(/["']/g, '').trim();

  const rawAdmin = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || process.env.COMPANY_EMAIL || 'kan93095@gmail.com';
  const adminMatch = rawAdmin.match(/<([^>]+)>/);
  const adminEmail = adminMatch ? adminMatch[1].trim() : rawAdmin.replace(/["']/g, '').trim();

  return { fromEmail, adminEmail };
};

/**
 * 1. Send OTP Email to User (Real-Time)
 */
const sendOtpEmail = async (email, otp) => {
  const mailTransporter = await getTransporter();
  const { fromEmail } = getMailAddresses();

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
  console.log(`[MailService] Real-time OTP sent to ${email} (MessageId: ${info.messageId || 'direct'})`);
  
  if (nodemailer.getTestMessageUrl(info)) {
    console.log(`[MailService] Ethereal Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  }

  return { success: true, messageId: info.messageId, previewUrl: nodemailer.getTestMessageUrl(info) };
};

/**
 * 2. Send Registration / Project Enquiry Emails to User AND Admin (Real-Time)
 */
const sendEnquiryEmails = async (enquiryData, enquiryId) => {
  const mailTransporter = await getTransporter();
  const { fromEmail, adminEmail } = getMailAddresses();
  const refCode = String(enquiryId).slice(-6).toUpperCase();

  // 1. Client Confirmation Email (Premium Branded Responsive Template)
  const clientOptions = {
    from: `"DataGalactic Client Support" <${fromEmail}>`,
    to: enquiryData.email,
    replyTo: adminEmail,
    subject: `✅ Request Confirmed: ${enquiryData.service} [Ref: #DG-${refCode}] — DataGalactic`,
    html: `
      <div style="margin: 0; padding: 30px 10px; background-color: #05142f; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="620" style="max-width: 620px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3); border: 1px solid #1e3f73;">
          <!-- Header -->
          <tr>
            <td style="padding: 34px 30px; background: linear-gradient(135deg, #05142f 0%, #0047AB 100%); text-align: center;">
              <table align="center" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: middle; padding-right: 14px;">
                    <div style="width: 48px; height: 48px; background: #0047AB; border-radius: 14px; border: 2px solid #4c8df7; color: #ffffff; font-weight: 900; font-size: 22px; line-height: 48px; text-align: center; box-shadow: 0 4px 12px rgba(0,71,171,0.5);">DG</div>
                  </td>
                  <td style="vertical-align: middle; text-align: left;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">Data<span style="color: #4c8df7;">Galactic</span></h1>
                    <p style="margin: 4px 0 0; color: #aac7ee; font-size: 11px; text-transform: uppercase; letter-spacing: 2.5px; font-weight: 600;">Precision Beyond Limits</p>
                  </td>
                </tr>
              </table>
              <div style="display: inline-block; margin-top: 18px; padding: 6px 18px; background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; border-radius: 30px; color: #a7f3d0; font-size: 12px; font-weight: 700; letter-spacing: 0.5px;">
                ✓ REQUEST RECEIVED &amp; LOGGED
              </div>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 32px 30px; background-color: #ffffff;">
              <h2 style="margin: 0 0 14px; color: #0f172a; font-size: 20px; font-weight: 700;">
                Hello, ${enquiryData.name} 👋
              </h2>
              <p style="margin: 0 0 20px; color: #475569; font-size: 14px; line-height: 1.65;">
                Thank you for reaching out to <strong>DataGalactic</strong>. We have successfully registered your request for <strong style="color: #0047AB;">${enquiryData.service}</strong>. Our enterprise operations specialists are currently evaluating your requirements to provide an accurate scope and tailored quotation.
              </p>

              <!-- Reference Badge Box -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px; background: linear-gradient(135deg, #f0f7ff 0%, #e0effe 100%); border-radius: 12px; border: 1px solid #bae6fd; padding: 16px 20px;">
                <tr>
                  <td style="vertical-align: middle;">
                    <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #0369a1; font-weight: 700;">Official Reference ID</span>
                    <span style="font-size: 22px; font-weight: 800; color: #0047AB; letter-spacing: 1px;">#DG-${refCode}</span>
                  </td>
                  <td style="text-align: right; vertical-align: middle;">
                    <span style="display: inline-block; background: #0284c7; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 700;">12-24h Response SLA</span>
                  </td>
                </tr>
              </table>

              <!-- Project Summary Table -->
              <h3 style="margin: 0 0 12px; color: #0f172a; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">
                📋 Your Project Summary
              </h3>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin-bottom: 24px; background-color: #f8fafc; border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600; width: 38%;">Requested Service</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #0047AB; font-size: 14px; font-weight: 800;">${enquiryData.service}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Company / Brand</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 13px; font-weight: 700;">${enquiryData.companyName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Engagement Type</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #334155; font-size: 13px; font-weight: 600;">${enquiryData.projectType}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Country / Region</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 13px;">${enquiryData.country}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Estimated Volume</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #334155; font-size: 13px;">${enquiryData.estimatedVolume || 'Standard / Flexible Volume'}</td>
                </tr>
                ${enquiryData.phone ? `
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Contact Phone</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 13px;">${enquiryData.phone}</td>
                </tr>` : ''}
                <tr>
                  <td style="padding: 12px 16px; color: #64748b; font-size: 13px; font-weight: 600;">Attachment Uploaded</td>
                  <td style="padding: 12px 16px; color: #059669; font-size: 13px; font-weight: 600;">${enquiryData.file ? `✓ ${enquiryData.file.originalName}` : 'None provided'}</td>
                </tr>
              </table>

              <!-- Project Scope Box -->
              <div style="margin-bottom: 26px;">
                <h4 style="margin: 0 0 8px; color: #0f172a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;">
                  Submitted Requirements:
                </h4>
                <div style="background-color: #f8fafc; border-left: 4px solid #0047AB; padding: 14px 16px; border-radius: 6px; color: #334155; font-size: 13px; line-height: 1.6; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; white-space: pre-wrap;">${enquiryData.description}</div>
              </div>

              <!-- Next Steps Timeline Box -->
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; margin-bottom: 26px;">
                <h4 style="margin: 0 0 12px; color: #166534; font-size: 14px; font-weight: 700; display: flex; align-items: center;">
                  🚀 What Happens Next?
                </h4>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="vertical-align: top; width: 28px; padding-bottom: 10px;">
                      <div style="width: 22px; height: 22px; background: #16a34a; color: #ffffff; border-radius: 50%; text-align: center; font-size: 12px; line-height: 22px; font-weight: 700;">1</div>
                    </td>
                    <td style="vertical-align: top; padding-bottom: 10px; padding-left: 8px;">
                      <p style="margin: 0; color: #0f172a; font-size: 13px; font-weight: 700;">Scope &amp; Feasibility Evaluation</p>
                      <p style="margin: 2px 0 0; color: #475569; font-size: 12px;">Our team analyzes your datasets, file formats, and operational goals.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="vertical-align: top; width: 28px; padding-bottom: 10px;">
                      <div style="width: 22px; height: 22px; background: #16a34a; color: #ffffff; border-radius: 50%; text-align: center; font-size: 12px; line-height: 22px; font-weight: 700;">2</div>
                    </td>
                    <td style="vertical-align: top; padding-bottom: 10px; padding-left: 8px;">
                      <p style="margin: 0; color: #0f172a; font-size: 13px; font-weight: 700;">Dedicated Project Manager Assigned</p>
                      <p style="margin: 2px 0 0; color: #475569; font-size: 12px;">A single point of contact will prepare a custom proposal and sample proof.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="vertical-align: top; width: 28px;">
                      <div style="width: 22px; height: 22px; background: #16a34a; color: #ffffff; border-radius: 50%; text-align: center; font-size: 12px; line-height: 22px; font-weight: 700;">3</div>
                    </td>
                    <td style="vertical-align: top; padding-left: 8px;">
                      <p style="margin: 0; color: #0f172a; font-size: 13px; font-weight: 700;">Quotation Delivery</p>
                      <p style="margin: 2px 0 0; color: #475569; font-size: 12px;">You will receive the quotation and turnaround schedule within <strong>12 to 24 hours</strong>.</p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Confidentiality & Trust Guarantee -->
              <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 10px; padding: 14px 18px; margin-bottom: 26px;">
                <p style="margin: 0; color: #334155; font-size: 12px; line-height: 1.5;">
                  🔒 <strong>Strict NDA &amp; Data Security:</strong> Your data and proprietary business information are protected under strict Non-Disclosure Agreements, role-based access controls, and secure transfer standards.
                </p>
              </div>

              <!-- Support CTA -->
              <div style="text-align: center; padding: 10px 0 0;">
                <p style="margin: 0 0 10px; color: #64748b; font-size: 13px;">Have urgent deadlines or need immediate assistance?</p>
                <a href="mailto:${adminEmail}?subject=Urgent%20Inquiry%20regarding%20Ref%20#DG-${refCode}" style="display: inline-block; background: #0047AB; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-size: 13px; font-weight: 700; box-shadow: 0 4px 12px rgba(0,71,171,0.3);">
                  Reply to this Email &rarr;
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 30px; background-color: #05142f; text-align: center; border-top: 1px solid #142d57;">
              <p style="margin: 0; color: #ffffff; font-size: 13px; font-weight: 700;">DataGalactic Enterprise Outsourcing Operations</p>
              <p style="margin: 6px 0 0; color: #94a3b8; font-size: 12px;">Email: <a href="mailto:hello@datagalactic.in" style="color: #4c8df7; text-decoration: none;">hello@datagalactic.in</a> | Phone: <span style="color: #ffffff;">+91 9363164608</span></p>
              <p style="margin: 6px 0 0; color: #64748b; font-size: 11px;">Tamil Nadu, India &bull; Serving Clients in US, UK, Canada, Australia &amp; UAE</p>
              <p style="margin: 12px 0 0; color: #475569; font-size: 11px;">&copy; ${new Date().getFullYear()} DataGalactic. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </div>
    `
  };

  // 2. Admin Alert Email (With lead data and optional attachment)
  const adminOptions = {
    from: `"DataGalactic Alert System" <${fromEmail}>`,
    to: adminEmail,
    replyTo: enquiryData.email,
    subject: `🚨 [New Lead #DG-${refCode}] ${enquiryData.name} (${enquiryData.companyName}) - ${enquiryData.service}`,
    html: `
      <div style="margin: 0; padding: 30px 10px; background-color: #05142f; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="620" style="max-width: 620px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3); border: 1px solid #1e3f73;">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 30px; background: linear-gradient(135deg, #05142f 0%, #0d4ba3 100%); text-align: center;">
              <table align="center" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: middle; padding-right: 12px;">
                    <div style="width: 44px; height: 44px; background: #0047AB; border-radius: 12px; border: 2px solid #4c8df7; color: #ffffff; font-weight: 900; font-size: 20px; line-height: 44px; text-align: center;">DG</div>
                  </td>
                  <td style="vertical-align: middle; text-align: left;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Data<span style="color: #4c8df7;">Galactic</span></h1>
                    <p style="margin: 3px 0 0; color: #aac7ee; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Precision Beyond Limits</p>
                  </td>
                </tr>
              </table>
              <div style="display: inline-block; margin-top: 18px; padding: 6px 16px; background: rgba(76, 141, 247, 0.2); border: 1px solid #4c8df7; border-radius: 30px; color: #aac7ee; font-size: 12px; font-weight: 700;">
                🚨 REAL-TIME LEAD NOTIFICATION ALERT
              </div>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 30px; background-color: #ffffff;">
              <h2 style="margin: 0 0 10px; color: #0f172a; font-size: 20px; font-weight: 700;">⚡ New Project Consultation Request</h2>
              <p style="margin: 0 0 24px; color: #64748b; font-size: 13px;">A new client has submitted a project enquiry on the <strong>DataGalactic</strong> portal. Below are the verified details:</p>

              <!-- Client Key Info Table -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; width: 35%; font-weight: 600;">Reference ID</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #0047AB; font-size: 14px; font-weight: 800; font-family: monospace;">#DG-${refCode}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Client Name</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px; font-weight: 700;">${enquiryData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Company / Brand</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px; font-weight: 700;">${enquiryData.companyName}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Business Email</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #0047AB; font-size: 13px; font-weight: 700;"><a href="mailto:${enquiryData.email}" style="color: #0047AB; text-decoration: none;">${enquiryData.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Phone / WhatsApp</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #059669; font-size: 13px; font-weight: 700;">${enquiryData.phone || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Country / Region</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 13px; font-weight: 600;">${enquiryData.country}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Requested Service</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #0047AB; font-size: 14px; font-weight: 800;">${enquiryData.service}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Engagement Type</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #334155; font-size: 13px;">${enquiryData.projectType}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Estimated Volume</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #334155; font-size: 13px; font-weight: 600;">${enquiryData.estimatedVolume || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; color: #64748b; font-size: 13px; font-weight: 600;">File Attachment</td>
                  <td style="padding: 14px 18px; color: #0f172a; font-size: 13px; font-weight: 600;">${enquiryData.file ? `📎 ${enquiryData.file.originalName}` : 'None'}</td>
                </tr>
              </table>

              <!-- Project Scope / Description -->
              <div style="margin-bottom: 24px;">
                <h4 style="margin: 0 0 8px; color: #0f172a; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Project Scope &amp; Specifications:</h4>
                <div style="background-color: #f1f5f9; border-left: 4px solid #0047AB; padding: 16px; border-radius: 6px; color: #334155; font-size: 13px; line-height: 1.6; white-space: pre-wrap;">
                  ${enquiryData.description}
                </div>
              </div>

              <!-- Action Link -->
              <div style="text-align: center; margin: 28px 0 10px;">
                <a href="mailto:${enquiryData.email}?subject=DataGalactic%20Proposal%20for%20${encodeURIComponent(enquiryData.service)}%20[Ref:%20#DG-${refCode}]" style="display: inline-block; background: linear-gradient(135deg, #002b66 0%, #0047AB 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-size: 14px; font-weight: 700; box-shadow: 0 4px 14px rgba(0,71,171,0.4);">
                  Reply Directly to Client &rarr;
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #05142f; text-align: center; border-top: 1px solid #142d57;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">&copy; 2026 DataGalactic Operations Center. Tamil Nadu, India.</p>
              <p style="margin: 5px 0 0; color: #64748b; font-size: 11px;">Automated Real-Time Dispatch System | Serving US, UK, CA, AU &amp; UAE</p>
            </td>
          </tr>
        </table>
      </div>
    `
  };

  // If a file was uploaded and is readable on disk, attach it directly to the admin email
  if (enquiryData.file && enquiryData.file.path) {
    try {
      if (fs.existsSync(enquiryData.file.path)) {
        adminOptions.attachments = [
          {
            filename: enquiryData.file.originalName,
            path: enquiryData.file.path
          }
        ];
      }
    } catch (attErr) {
      console.warn('[MailService] Failed to attach file to admin email:', attErr.message);
    }
  }

  try {
    const results = await Promise.allSettled([
      mailTransporter.sendMail(clientOptions),
      mailTransporter.sendMail(adminOptions)
    ]);

    results.forEach((res, idx) => {
      const recipient = idx === 0 ? `Client (${enquiryData.email})` : `Admin (${adminEmail})`;
      if (res.status === 'fulfilled') {
        console.log(`[MailService] ✓ Registration enquiry email dispatched to ${recipient}`);
      } else {
        console.error(`[MailService] ✗ Failed sending enquiry email to ${recipient}:`, res.reason?.message || res.reason);
      }
    });

    return results;
  } catch (err) {
    console.error('[MailService sendEnquiryEmails Error]:', err.message);
  }
};

/**
 * 3. Send Client Feedback Notification Emails to Admin AND User (Real-Time)
 */
const sendFeedbackEmails = async (feedbackData, feedbackId) => {
  const mailTransporter = await getTransporter();
  const { fromEmail, adminEmail } = getMailAddresses();
  const stars = renderStars(feedbackData.rating);

  // 1. Admin Alert Email for New Feedback
  const adminOptions = {
    from: `"DataGalactic Feedback Alert" <${fromEmail}>`,
    to: adminEmail,
    replyTo: feedbackData.email || fromEmail,
    subject: `⭐ [New Feedback: ${feedbackData.rating}/5★] ${feedbackData.name} - ${feedbackData.serviceType}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 24px; background: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 28px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 10px rgba(0,0,0,0.04);">
          <div style="border-bottom: 2px solid #f59e0b; padding-bottom: 14px; margin-bottom: 20px;">
            <div style="display: inline-block; background: #fef3c7; color: #b45309; font-weight: 700; font-size: 13px; padding: 4px 12px; border-radius: 999px; margin-bottom: 8px;">
              ${stars} (${feedbackData.rating} of 5 Stars)
            </div>
            <h2 style="color: #0f172a; margin: 0; font-size: 20px;">New Client Review Submitted</h2>
            <p style="color: #64748b; margin: 4px 0 0; font-size: 12px;">Submitted on: ${new Date().toLocaleString()}</p>
          </div>

          <table style="width: 100%; font-size: 13px; color: #334155; border-collapse: collapse;">
            <tr style="background: #f8fafc;"><td style="padding: 8px 12px; font-weight: 600; width: 35%;">Client Name:</td><td style="padding: 8px 12px; font-weight: 600;">${feedbackData.name}</td></tr>
            <tr><td style="padding: 8px 12px; font-weight: 600;">Client Email:</td><td style="padding: 8px 12px;">${feedbackData.email ? `<a href="mailto:${feedbackData.email}" style="color: #0284c7; text-decoration: none;">${feedbackData.email}</a>` : '<span style="color: #94a3b8;">Not provided</span>'}</td></tr>
            <tr style="background: #f8fafc;"><td style="padding: 8px 12px; font-weight: 600;">Company / Org:</td><td style="padding: 8px 12px;">${feedbackData.company || '<span style="color: #94a3b8;">Not provided</span>'}</td></tr>
            <tr><td style="padding: 8px 12px; font-weight: 600;">Service Rated:</td><td style="padding: 8px 12px; font-weight: 700; color: #0284c7;">${feedbackData.serviceType}</td></tr>
            <tr style="background: #f8fafc;"><td style="padding: 8px 12px; font-weight: 600;">Client Role / Industry:</td><td style="padding: 8px 12px;">${feedbackData.clientType || 'Corporate Client'}</td></tr>
            <tr><td style="padding: 8px 12px; font-weight: 600;">Region / Country:</td><td style="padding: 8px 12px;">${feedbackData.region || 'Global'}</td></tr>
            <tr style="background: #f8fafc;"><td style="padding: 8px 12px; font-weight: 600;">Status:</td><td style="padding: 8px 12px; color: #d97706; font-weight: 600;">Pending Approval</td></tr>
          </table>

          <div style="margin-top: 20px;">
            <p style="font-weight: 600; color: #0f172a; margin-bottom: 6px; font-size: 13px;">Testimonial Quote:</p>
            <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 14px 16px; border-radius: 4px; color: #78350f; font-size: 13px; line-height: 1.6; font-style: italic;">
              "${feedbackData.quote}"
            </div>
          </div>

          <div style="margin-top: 24px; padding-top: 14px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            💡 You can publish or edit this testimonial from the <strong style="color: #0f172a;">DataGalactic Admin Panel</strong>.
          </div>
        </div>
      </div>
    `
  };

  const emailTasks = [mailTransporter.sendMail(adminOptions)];

  // 2. User Thank-You Confirmation Email (if user provided an email address)
  if (feedbackData.email && feedbackData.email.includes('@')) {
    const userOptions = {
      from: `"DataGalactic Client Care" <${fromEmail}>`,
      to: feedbackData.email,
      replyTo: adminEmail,
      subject: `⭐ Thank You for Your Feedback! — DataGalactic`,
      html: `
        <div style="margin: 0; padding: 30px 10px; background-color: #05142f; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="620" style="max-width: 620px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3); border: 1px solid #1e3f73;">
            <!-- Header -->
            <tr>
              <td style="padding: 34px 30px; background: linear-gradient(135deg, #05142f 0%, #0047AB 100%); text-align: center;">
                <table align="center" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="vertical-align: middle; padding-right: 14px;">
                      <div style="width: 48px; height: 48px; background: #0047AB; border-radius: 14px; border: 2px solid #4c8df7; color: #ffffff; font-weight: 900; font-size: 22px; line-height: 48px; text-align: center;">DG</div>
                    </td>
                    <td style="vertical-align: middle; text-align: left;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">Data<span style="color: #4c8df7;">Galactic</span></h1>
                      <p style="margin: 4px 0 0; color: #aac7ee; font-size: 11px; text-transform: uppercase; letter-spacing: 2.5px; font-weight: 600;">Precision Beyond Limits</p>
                    </td>
                  </tr>
                </table>
                <div style="display: inline-block; margin-top: 18px; padding: 6px 18px; background: rgba(245, 158, 11, 0.2); border: 1px solid #f59e0b; border-radius: 30px; color: #fde68a; font-size: 12px; font-weight: 700;">
                  ⭐ CLIENT REVIEW RECEIVED
                </div>
              </td>
            </tr>

            <!-- Main Body -->
            <tr>
              <td style="padding: 32px 30px; background-color: #ffffff;">
                <h2 style="margin: 0 0 14px; color: #0f172a; font-size: 20px; font-weight: 700;">
                  Thank You, ${feedbackData.name}! 👋
                </h2>
                <p style="margin: 0 0 20px; color: #475569; font-size: 14px; line-height: 1.65;">
                  We truly appreciate you taking the time to share your experience with <strong>DataGalactic</strong> regarding our <strong style="color: #0047AB;">${feedbackData.serviceType}</strong> services.
                </p>

                <!-- Feedback Display Card -->
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                  <div style="margin-bottom: 12px; font-size: 18px; color: #f59e0b; letter-spacing: 2px;">
                    ${stars} <span style="font-size: 13px; color: #64748b; font-weight: 700; margin-left: 6px;">(${feedbackData.rating} out of 5 Stars)</span>
                  </div>
                  <div style="background-color: #ffffff; border-left: 4px solid #f59e0b; padding: 14px 18px; border-radius: 6px; color: #334155; font-size: 13px; line-height: 1.6; font-style: italic; border-top: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9;">
                    "${feedbackData.quote}"
                  </div>
                  <div style="margin-top: 12px; font-size: 12px; color: #64748b;">
                    <strong>Service:</strong> ${feedbackData.serviceType} &bull; <strong>Company:</strong> ${feedbackData.company || 'Enterprise Partner'}
                  </div>
                </div>

                <p style="color: #475569; font-size: 13px; line-height: 1.6; margin-bottom: 20px;">
                  Client trust and rigorous data standards are at the foundation of everything we do. Feedback like yours drives our team to consistently deliver 99.9% accuracy and dependable SLA turnarounds.
                </p>

                <!-- Next Collaboration Callout -->
                <div style="background: linear-gradient(135deg, #f0f7ff 0%, #e0effe 100%); border: 1px solid #bae6fd; border-radius: 12px; padding: 18px 20px; text-align: center; margin-bottom: 24px;">
                  <h4 style="margin: 0 0 6px; color: #0047AB; font-size: 14px; font-weight: 700;">Need to scale more datasets or start a new project?</h4>
                  <p style="margin: 0 0 14px; color: #475569; font-size: 12px;">Our team is ready to support your upcoming operations and research demands.</p>
                  <a href="mailto:${adminEmail}?subject=New%20Data%20Project%20Inquiry%20from%20${encodeURIComponent(feedbackData.name)}" style="display: inline-block; background: #0047AB; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 8px; font-size: 12px; font-weight: 700;">
                    Consult Our Team &rarr;
                  </a>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 24px 30px; background-color: #05142f; text-align: center; border-top: 1px solid #142d57;">
                <p style="margin: 0; color: #ffffff; font-size: 13px; font-weight: 700;">DataGalactic Client Operations</p>
                <p style="margin: 6px 0 0; color: #94a3b8; font-size: 12px;">Email: <a href="mailto:hello@datagalactic.in" style="color: #4c8df7; text-decoration: none;">hello@datagalactic.in</a> | Phone: <span style="color: #ffffff;">+91 9363164608</span></p>
                <p style="margin: 6px 0 0; color: #64748b; font-size: 11px;">Tamil Nadu, India &bull; Serving Clients Worldwide</p>
                <p style="margin: 12px 0 0; color: #475569; font-size: 11px;">&copy; ${new Date().getFullYear()} DataGalactic. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </div>
      `
    };
    emailTasks.push(mailTransporter.sendMail(userOptions));
  }

  try {
    const results = await Promise.allSettled(emailTasks);
    results.forEach((res, idx) => {
      const recipient = idx === 0 ? `Admin (${adminEmail})` : `Client (${feedbackData.email})`;
      if (res.status === 'fulfilled') {
        console.log(`[MailService] ✓ Feedback notification email dispatched to ${recipient}`);
      } else {
        console.error(`[MailService] ✗ Failed sending feedback email to ${recipient}:`, res.reason?.message || res.reason);
      }
    });
    return results;
  } catch (err) {
    console.error('[MailService sendFeedbackEmails Error]:', err.message);
  }
};

module.exports = {
  otpStore,
  getTransporter,
  sendOtpEmail,
  sendEnquiryEmails,
  sendFeedbackEmails
};
