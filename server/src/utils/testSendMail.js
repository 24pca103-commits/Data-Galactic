const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { sendEnquiryEmails } = require('./mailService');

async function testUserAndAdminEmail() {
  console.log('[TestMailer] Starting live real-time test for User & Admin confirmation emails...');

  const sampleEnquiry = {
    name: 'Karthik Raja',
    companyName: 'DataGalactic Global Ops',
    email: 'kan93095@gmail.com', // Sending to user's real email so they can check their inbox
    phone: '+91 9363164608',
    country: 'United States',
    service: 'Data Cleaning & Formatting',
    projectType: 'Monthly Ongoing Operations',
    estimatedVolume: '25,000 Records / Week',
    description: 'We need recurring spreadsheet standardization, automated deduplication, and schema validation. Looking for a dedicated operations team with 12-24h turnaround SLA.'
  };

  const sampleEnquiryId = 'lead_demo_789456';

  try {
    console.log(`[TestMailer] Sending client confirmation and admin alert for enquiry...`);
    const results = await sendEnquiryEmails(sampleEnquiry, sampleEnquiryId);

    console.log('[TestMailer] Dispatch results:');
    results.forEach((res, i) => {
      const recipient = i === 0 ? 'User / Client (kan93095@gmail.com)' : 'Admin Notification (kan93095@gmail.com)';
      if (res.status === 'fulfilled') {
        console.log(`  ✓ SUCCESS: ${recipient} -> MessageId: ${res.value?.messageId}`);
      } else {
        console.error(`  ✗ FAILED: ${recipient} -> Error:`, res.reason?.message || res.reason);
      }
    });

    console.log('\n[TestMailer] Live test completed successfully! Please check your inbox at kan93095@gmail.com.');
  } catch (error) {
    console.error('[TestMailer Error]:', error);
  }
}

testUserAndAdminEmail();
