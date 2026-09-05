/**
 * =========================================================================
 * AST MACRAMÉ - GOOGLE APPS SCRIPT (ORDERS & EMAIL NOTIFICATIONS)
 * =========================================================================
 * Features:
 * 1. Appends new retail orders into the "Retail" sheet with "Note" right after "Address".
 * 2. Sends formatted HTML email alerts to your inbox instantly.
 * 3. Includes 1-Click WhatsApp & Phone call links for quick customer fulfillment.
 * =========================================================================
 */

// 1. SET YOUR NOTIFICATION EMAIL HERE:
const NOTIFICATION_EMAIL = Session.getActiveUser().getEmail() || "your-email@gmail.com";

// 2. SET YOUR SECURITY TOKEN (Optional, matching VITE_FORM_TOKEN if used):
const SECRET_TOKEN = ""; 

function doPost(e) {
  try {
    const params = e.parameter || {};

    // Security token check (if enabled)
    if (SECRET_TOKEN && params.token !== SECRET_TOKEN) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Unauthorized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetName = params.sheetName || "Retail";
    let sheet = ss.getSheetByName(sheetName);

    // If sheet doesn't exist, create it and set up header row with Note right after Address
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow([
        "Date",
        "Time",
        "Name",
        "Phone",
        "Address",
        "Note",             // <-- Dedicated column right after Address!
        "Order Type",
        "Color",
        "Size",
        "Delivery Charge",
        "Total Amount",
        "Order ID"
      ]);
      sheet.getRange(1, 1, 1, 12).setFontWeight("bold").setBackground("#F3EFEA");
    }

    // Extract order parameters
    const date = params.date || Utilities.formatDate(new Date(), "GMT+6", "MMM d, yyyy");
    const time = params.time || Utilities.formatDate(new Date(), "GMT+6", "h:mm a");
    const name = params.name || "N/A";
    const phone = params.phone || "N/A";
    const address = params.address || "N/A";
    const note = params.note || params.message || "None";
    const orderType = params.orderType || "Single";
    const color = params.color || "N/A";
    const size = params.size || "N/A";
    const deliveryCharge = params.deliveryCharge || "Standard Delivery Charge 100 Tk (All over Bangladesh)";
    const totalAmount = params.totalAmount || "N/A";
    const orderId = params.orderId || "AST-" + Math.floor(100000 + Math.random() * 900000);

    // Append Row to Google Sheet (Note is column 6, after Address)
    sheet.appendRow([
      date,
      time,
      name,
      phone,
      address,
      note,
      orderType,
      color,
      size,
      deliveryCharge,
      totalAmount,
      orderId
    ]);

    // Send Email Notification
    sendOrderEmail({
      orderId: orderId,
      date: date,
      time: time,
      name: name,
      phone: phone,
      address: address,
      note: note,
      orderType: orderType,
      color: color,
      size: size,
      deliveryCharge: deliveryCharge,
      totalAmount: totalAmount
    });

    return ContentService.createTextOutput(JSON.stringify({ status: "success", orderId: orderId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Sends HTML Email to Store Owner
 */
function sendOrderEmail(data) {
  const recipient = NOTIFICATION_EMAIL;
  const subject = `🛍️ New Order: ${data.name} - ${data.totalAmount} (${data.orderId})`;
  
  // Format clean phone for WhatsApp
  const cleanPhone = data.phone.replace(/[^0-9]/g, '');
  const waUrl = "https://wa.me/" + cleanPhone;
  const callUrl = "tel:" + data.phone;

  // HTML Email Template
  const htmlBody = `
  <div style="padding: 24px 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4;">
    <table style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #faf8f5; border-radius: 10px; overflow: hidden; border-collapse: collapse; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e2ded7;">
      
      <!-- Header -->
      <tr>
        <td style="background-color: #1C2841; padding: 26px 20px; text-align: center;">
          <h2 style="margin: 0; color: #E5C3A6; font-size: 20px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 800;">AST MACRAMÉ</h2>
          <p style="margin: 6px 0 0 0; color: #ffffff; font-size: 13px; letter-spacing: 0.5px;">New Retail Order Received • ${data.orderId}</p>
        </td>
      </tr>

      <!-- Order Content -->
      <tr>
        <td style="padding: 26px 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #333; line-height: 1.6;">
            
            <!-- Date & Time -->
            <tr><td style="width: 105px; color: #666; font-size: 13px;">Date</td><td style="width: 15px; color: #999;">:</td><td style="font-weight: 700; color: #1C2841;">${data.date}</td></tr>
            <tr><td style="color: #666; font-size: 13px;">Time</td><td style="color: #999;">:</td><td style="font-weight: 700; color: #1C2841;">${data.time}</td></tr>
            <tr><td style="color: #666; font-size: 13px;">Order ID</td><td style="color: #999;">:</td><td style="font-weight: 700; font-family: monospace; color: #1C2841;">${data.orderId}</td></tr>
            
            <tr><td colspan="3"><hr style="border: none; border-top: 1px solid #e5dfd6; margin: 16px 0;"></td></tr>
            
            <!-- Customer Information -->
            <tr><td style="color: #666; font-size: 13px;">Name</td><td style="color: #999;">:</td><td style="font-weight: 700; font-size: 15px; color: #1C2841;">${data.name}</td></tr>
            <tr>
              <td style="color: #666; font-size: 13px;">Phone</td>
              <td style="color: #999;">:</td>
              <td style="font-weight: 700; color: #065F46;">
                <a href="${callUrl}" style="color: #065F46; text-decoration: none;">${data.phone}</a>
                &nbsp;•&nbsp;
                <a href="${waUrl}" style="color: #25D366; font-weight: 700; text-decoration: none; font-size: 12px; background: #e8f8ed; padding: 2px 8px; border-radius: 12px; border: 1px solid #c5edd1;">Chat WhatsApp</a>
              </td>
            </tr>
            <tr><td style="color: #666; font-size: 13px; vertical-align: top;">Address</td><td style="color: #999; vertical-align: top;">:</td><td style="font-weight: 600; color: #333;">${data.address}</td></tr>
            
            <tr><td colspan="3"><hr style="border: none; border-top: 1px solid #e5dfd6; margin: 16px 0;"></td></tr>
            
            <!-- Order Breakdown -->
            <tr><td style="color: #666; font-size: 13px;">Order</td><td style="color: #999;">:</td><td style="font-weight: 700; color: #1C2841;">${data.orderType}</td></tr>
            <tr><td style="color: #666; font-size: 13px;">Specifications</td><td style="color: #999;">:</td><td style="font-weight: 600; color: #444;">Color: <strong>${data.color}</strong> | Size: <strong>${data.size}</strong></td></tr>
            <tr><td style="color: #666; font-size: 13px; vertical-align: top;">Delivery</td><td style="color: #999; vertical-align: top;">:</td><td style="font-weight: 600; color: #444;">${data.deliveryCharge}</td></tr>
            
            <!-- Total -->
            <tr>
              <td style="padding-top: 14px; color: #1C2841; font-size: 14px;"><strong>TOTAL PAYABLE</strong></td>
              <td style="padding-top: 14px; color: #1C2841;"><strong>:</strong></td>
              <td style="padding-top: 14px; color: #C25E3E; font-size: 19px; font-weight: 800;">${data.totalAmount} (COD)</td>
            </tr>
            
            <tr><td colspan="3"><hr style="border: none; border-top: 1px solid #e5dfd6; margin: 16px 0;"></td></tr>
            
            <!-- Note Section (Dedicated) -->
            <tr>
              <td style="color: #666; font-size: 13px; vertical-align: top;">Customer Note</td>
              <td style="color: #999; vertical-align: top;">:</td>
              <td style="font-style: ${data.note !== 'None' ? 'normal' : 'italic'}; color: ${data.note !== 'None' ? '#1C2841' : '#888'}; font-weight: ${data.note !== 'None' ? '600' : 'normal'}; background: ${data.note !== 'None' ? '#fff3e0' : 'transparent'}; padding: ${data.note !== 'None' ? '6px 10px' : '0'}; border-radius: 6px;">
                ${data.note}
              </td>
            </tr>

          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background-color: #f1ede6; padding: 14px; text-align: center; font-size: 11px; color: #777; border-top: 1px solid #e2ded7;">
          AST Macramé Automated E-Commerce Fulfillment System
        </td>
      </tr>

    </table>
  </div>
  `;

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    htmlBody: htmlBody
  });
}
