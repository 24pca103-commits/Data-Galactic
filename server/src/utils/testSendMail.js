const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

async function main() {
  const user = process.env.SMTP_USER || 'kan93095@gmail.com';
  const pass = (process.env.SMTP_PASS || 'mewirvlmupfpdwbg').replace(/\s+/g, '');
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'kan93095@gmail.com';

  console.log(`[TestMailer] Attempting live email dispatch via smtp.gmail.com...`);
  console.log(`[TestMailer] From: ${user} -> To Admin: ${adminEmail}`);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass }
  });

  const sampleLead = {
    ref: 'DG-REALTIME',
    name: 'Marcus Vance',
    company: 'Apex Global Enterprises LLC',
    email: 'm.vance@apexglobal.com',
    phone: '+1 (555) 019-2810',
    country: 'United States',
    service: 'Data Cleaning & Formatting',
    projectType: 'Monthly Ongoing Operations',
    volume: '50,000 Records / Month',
    timeline: 'Immediate (Within 24-48 Hours)',
    description: 'We need to standardize and cleanse raw spreadsheet datasets from multiple vendor sources. Looking for deduplication, schema validation, and recurring monthly processing.'
  };

  const htmlTemplate = `
    <div style="margin: 0; padding: 30px 10px; background-color: #05142f; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="620" style="max-width: 620px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3); border: 1px solid #1e3f73;">
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

        <tr>
          <td style="padding: 32px 30px; background-color: #ffffff;">
            <h2 style="margin: 0 0 10px; color: #0f172a; font-size: 20px; font-weight: 700;">⚡ New Project Consultation Request</h2>
            <p style="margin: 0 0 24px; color: #64748b; font-size: 13px;">A new client has submitted a project enquiry on the <strong>DataGalactic</strong> portal. Below are the verified details:</p>

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
              <tr>
                <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; width: 35%; font-weight: 600;">Reference ID</td>
                <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #0047AB; font-size: 14px; font-weight: 800; font-family: monospace;">#${sampleLead.ref}</td>
              </tr>
              <tr>
                <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Client Name</td>
                <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px; font-weight: 700;">${sampleLead.name}</td>
              </tr>
              <tr>
                <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Company / Brand</td>
                <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px; font-weight: 700;">${sampleLead.company}</td>
              </tr>
              <tr>
                <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Business Email</td>
                <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #0047AB; font-size: 13px; font-weight: 700;"><a href="mailto:${sampleLead.email}" style="color: #0047AB; text-decoration: none;">${sampleLead.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Phone / WhatsApp</td>
                <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #059669; font-size: 13px; font-weight: 700;">${sampleLead.phone}</td>
              </tr>
              <tr>
                <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Country / Region</td>
                <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 13px; font-weight: 600;">🇺🇸 ${sampleLead.country}</td>
              </tr>
              <tr>
                <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Requested Service</td>
                <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #0047AB; font-size: 14px; font-weight: 800;">${sampleLead.service}</td>
              </tr>
              <tr>
                <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Engagement Type</td>
                <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #334155; font-size: 13px;">${sampleLead.projectType}</td>
              </tr>
              <tr>
                <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Estimated Volume</td>
                <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #334155; font-size: 13px; font-weight: 600;">${sampleLead.volume}</td>
              </tr>
              <tr>
                <td style="padding: 14px 18px; color: #64748b; font-size: 13px; font-weight: 600;">Expected Timeline</td>
                <td style="padding: 14px 18px; color: #d97706; font-size: 13px; font-weight: 700;">⏱ ${sampleLead.timeline}</td>
              </tr>
            </table>

            <div style="margin-bottom: 24px;">
              <h4 style="margin: 0 0 8px; color: #0f172a; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Project Requirements &amp; Scope:</h4>
              <div style="background-color: #f1f5f9; border-left: 4px solid #0047AB; padding: 16px; border-radius: 6px; color: #334155; font-size: 13px; line-height: 1.6;">
                ${sampleLead.description}
              </div>
            </div>

            <div style="text-align: center; margin: 28px 0 10px;">
              <a href="mailto:${sampleLead.email}?subject=DataGalactic%20Proposal%20for%20${encodeURIComponent(sampleLead.service)}%20[Ref:%20#${sampleLead.ref}]" style="display: inline-block; background: linear-gradient(135deg, #002b66 0%, #0047AB 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-size: 14px; font-weight: 700; box-shadow: 0 4px 14px rgba(0,71,171,0.4);">
                Reply Directly to Client &rarr;
              </a>
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding: 20px 30px; background-color: #05142f; text-align: center; border-top: 1px solid #142d57;">
            <p style="margin: 0; color: #94a3b8; font-size: 12px;">&copy; 2026 DataGalactic Operations Center. Tamil Nadu, India.</p>
            <p style="margin: 5px 0 0; color: #64748b; font-size: 11px;">Automated Real-Time Dispatch System | Target: US, UK, CA, AU, UAE</p>
          </td>
        </tr>
      </table>
    </div>
  `;

  const info = await transporter.sendMail({
    from: `"DataGalactic Alert System" <${user}>`,
    to: adminEmail,
    replyTo: sampleLead.email,
    subject: `🚨 [New Lead #${sampleLead.ref}] ${sampleLead.name} (${sampleLead.company}) - ${sampleLead.service}`,
    html: htmlTemplate
  });

  console.log(`[TestMailer] ✓ SUCCESS! Real-time email dispatched to: ${adminEmail}`);
  console.log(`[TestMailer] MessageId: ${info.messageId}`);
}

main().catch(err => {
  console.error('[TestMailer Error]:', err.message);
  process.exit(1);
});
