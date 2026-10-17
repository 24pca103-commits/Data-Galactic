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
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // direct SSL for port 465
      family: 4, // strictly force IPv4 to prevent ENETUNREACH in Render cloud network
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000
    });
    console.log(`[MailService] Configured direct IPv4 SSL smtp.gmail.com:465 for: ${user}`);
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

  // 1. Client Confirmation Email
  const clientOptions = {
    from: `"DataGalactic Client Support" <${fromEmail}>`,
    to: enquiryData.email,
    replyTo: adminEmail,
    subject: `Enquiry Received: ${enquiryData.service} [Ref: #DG-${refCode}]`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background: #05142f; padding: 26px 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">Data<span style="color: #4c8df7;">Galactic</span></h1>
          <p style="color: #94a3b8; margin: 4px 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Precision Beyond Limits</p>
        </div>
        <div style="padding: 28px 24px; background: #f8fafc;">
          <h2 style="color: #0f172a; margin-top: 0; font-size: 18px;">Thank You, ${enquiryData.name}!</h2>
          <p style="color: #475569; font-size: 14px; line-height: 1.6;">
            We have received your request for <strong>${enquiryData.service}</strong>. Our enterprise operations specialists are currently evaluating your project parameters.
          </p>
          
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 20px 0;">
            <h4 style="margin: 0 0 12px; color: #05142f; font-size: 14px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">Registration &amp; Project Summary:</h4>
            <table style="width: 100%; font-size: 13px; color: #334155; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; color: #64748b; width: 40%;">Reference Number:</td><td style="font-weight: 700; color: #0284c7;">#DG-${refCode}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;">Company / Brand:</td><td style="font-weight: 600;">${enquiryData.companyName}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;">Requested Service:</td><td style="font-weight: 600; color: #0f172a;">${enquiryData.service}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;">Engagement Model:</td><td>${enquiryData.projectType}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;">Country / Region:</td><td>${enquiryData.country}</td></tr>
              ${enquiryData.phone ? `<tr><td style="padding: 6px 0; color: #64748b;">Phone:</td><td>${enquiryData.phone}</td></tr>` : ''}
              <tr><td style="padding: 6px 0; color: #64748b;">Estimated Volume:</td><td>${enquiryData.estimatedVolume || 'Standard Volume'}</td></tr>
              ${enquiryData.file ? `<tr><td style="padding: 6px 0; color: #64748b;">Attached File:</td><td style="color: #059669; font-weight: 600;">✓ ${enquiryData.file.originalName}</td></tr>` : ''}
            </table>
          </div>

          <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 14px 18px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af; font-size: 13px; font-weight: 700;">What happens next?</p>
            <p style="margin: 6px 0 0; color: #1e3a8a; font-size: 12px; line-height: 1.6;">
              A Dedicated Project Manager will review your scope, prepare custom pricing, and deliver a formal quotation within <strong>12 to 24 hours</strong>.
            </p>
          </div>

          <p style="color: #64748b; font-size: 12px; margin-top: 24px; line-height: 1.5;">
            Need immediate assistance or have urgent requirements? Contact our direct team at <a href="mailto:hello@datagalactic.in" style="color: #0284c7; text-decoration: none; font-weight: 600;">hello@datagalactic.in</a> or call <strong>+91 9363164608</strong>.
          </p>
        </div>
        <div style="background: #05142f; padding: 16px 24px; text-align: center; color: #64748b; font-size: 11px;">
          &copy; ${new Date().getFullYear()} DataGalactic Enterprise Services. All rights reserved.
        </div>
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
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 24px; background: #f1f5f9;">
        <div style="max-width: 620px; margin: 0 auto; background: #ffffff; padding: 28px; border-radius: 10px; border: 1px solid #cbd5e1; box-shadow: 0 4px 10px rgba(0,0,0,0.04);">
          <div style="border-bottom: 2px solid #0284c7; padding-bottom: 14px; margin-bottom: 20px;">
            <h2 style="color: #0f172a; margin: 0; font-size: 20px;">⚡ New Project Consultation Request</h2>
            <p style="color: #64748b; margin: 4px 0 0; font-size: 12px;">Reference: #DG-${refCode} | Logged: ${new Date().toLocaleString()}</p>
          </div>

          <table style="width: 100%; font-size: 13px; color: #334155; border-collapse: collapse;">
            <tr style="background: #f8fafc;"><td style="padding: 8px 12px; font-weight: 600; width: 35%;">Client Name:</td><td style="padding: 8px 12px;">${enquiryData.name}</td></tr>
            <tr><td style="padding: 8px 12px; font-weight: 600;">Company Name:</td><td style="padding: 8px 12px; font-weight: bold; color: #0284c7;">${enquiryData.companyName}</td></tr>
            <tr style="background: #f8fafc;"><td style="padding: 8px 12px; font-weight: 600;">Business Email:</td><td style="padding: 8px 12px;"><a href="mailto:${enquiryData.email}" style="color: #0284c7; text-decoration: none;">${enquiryData.email}</a></td></tr>
            <tr><td style="padding: 8px 12px; font-weight: 600;">Phone:</td><td style="padding: 8px 12px;">${enquiryData.phone || 'Not provided'}</td></tr>
            <tr style="background: #f8fafc;"><td style="padding: 8px 12px; font-weight: 600;">Country / Region:</td><td style="padding: 8px 12px;">${enquiryData.country}</td></tr>
            <tr><td style="padding: 8px 12px; font-weight: 600;">Service Requested:</td><td style="padding: 8px 12px; font-weight: 700; color: #0f172a;">${enquiryData.service}</td></tr>
            <tr style="background: #f8fafc;"><td style="padding: 8px 12px; font-weight: 600;">Engagement Type:</td><td style="padding: 8px 12px;">${enquiryData.projectType}</td></tr>
            <tr><td style="padding: 8px 12px; font-weight: 600;">Estimated Volume:</td><td style="padding: 8px 12px;">${enquiryData.estimatedVolume || 'Not specified'}</td></tr>
            <tr style="background: #f8fafc;"><td style="padding: 8px 12px; font-weight: 600;">File Attachment:</td><td style="padding: 8px 12px;">${enquiryData.file ? enquiryData.file.originalName : 'No file attached'}</td></tr>
          </table>

          <div style="margin-top: 20px;">
            <p style="font-weight: 600; color: #0f172a; margin-bottom: 6px; font-size: 13px;">Project Description &amp; Scope:</p>
            <div style="background: #f8fafc; padding: 14px; border-radius: 6px; border: 1px solid #e2e8f0; color: #334155; font-size: 13px; line-height: 1.6; white-space: pre-wrap;">
              ${enquiryData.description}
            </div>
          </div>

          <div style="margin-top: 24px; padding-top: 14px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            💡 View this lead in real-time in the <strong style="color: #0f172a;">DataGalactic Admin Dashboard</strong>.
          </div>
        </div>
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
      subject: `Thank You for Your Feedback! — DataGalactic`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background: #05142f; padding: 26px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">Data<span style="color: #4c8df7;">Galactic</span></h1>
            <p style="color: #94a3b8; margin: 4px 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Precision Beyond Limits</p>
          </div>
          <div style="padding: 28px 24px; background: #f8fafc;">
            <h2 style="color: #0f172a; margin-top: 0; font-size: 18px;">Thank You, ${feedbackData.name}!</h2>
            <p style="color: #475569; font-size: 14px; line-height: 1.6;">
              We sincerely appreciate you taking the time to share your feedback regarding our <strong>${feedbackData.serviceType}</strong> services.
            </p>

            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 20px 0;">
              <div style="font-size: 18px; color: #f59e0b; margin-bottom: 8px;">${stars} <span style="font-size: 13px; color: #64748b; font-weight: 600;">(${feedbackData.rating}/5)</span></div>
              <div style="color: #334155; font-size: 13px; line-height: 1.6; font-style: italic; background: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                "${feedbackData.quote}"
              </div>
            </div>

            <p style="color: #475569; font-size: 13px; line-height: 1.6;">
              Client partnerships and rigorous standards are at the heart of DataGalactic. Your insights help us continually deliver high accuracy, fast SLAs, and dependable data support.
            </p>

            <p style="color: #64748b; font-size: 12px; margin-top: 24px;">
              Looking to expand your workflows or need additional assistance? Reach us anytime at <a href="mailto:hello@datagalactic.in" style="color: #0284c7; text-decoration: none; font-weight: 600;">hello@datagalactic.in</a>.
            </p>
          </div>
          <div style="background: #05142f; padding: 16px 24px; text-align: center; color: #64748b; font-size: 11px;">
            &copy; ${new Date().getFullYear()} DataGalactic Enterprise Services. All rights reserved.
          </div>
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
