<template>
  <div class="receipt-container" id="receipt">
    <!-- Watermark -->
    <div class="watermark">SYMOS NAIL SPA</div>

    <div class="receipt-paper">
      <!-- Header -->
      <div class="receipt-header">
        <div class="logo-placeholder">✦</div>
        <h1>Symos Nail Spa</h1>
        <p class="tagline">Luxury Nail Care & Beauty Studio</p>
        <p>Nairobi, Kenya</p>
        <p>+254 712 345 678</p>
        <p>hello@symosnailspa.com</p>
        <p>www.symosnailspa.com</p>
      </div>

      <div class="receipt-divider"></div>

      <!-- Metadata -->
      <div class="meta-row">
        <div>
          <strong>Receipt No:</strong> RCPT-20260506-0012<br />
          <strong>Booking No:</strong> BK-34GH8
        </div>
        <div class="text-right">
          <strong>Date:</strong> 06 May 2026<br />
          <strong>Time:</strong> 2:30 PM
        </div>
      </div>

      <div class="status-row">
        <span class="paid-badge">PAID ✓</span>
        <span>M-Pesa • SGD73K9LQ</span>
      </div>

      <div class="receipt-divider"></div>

      <!-- Customer & Appointment -->
      <div class="info-grid">
        <div>
          <strong>Customer</strong><br />
          Shawn<br />
          +254 712 345 678
        </div>
        <div>
          <strong>Appointment</strong><br />
          10 May 2026 • 11:00 AM<br />
          Technician: Esther Wanjiku<br />
          Status: Confirmed
        </div>
      </div>

      <div class="receipt-divider"></div>

      <!-- Services Table -->
      <table class="services-table">
        <thead>
          <tr>
            <th>Description</th>
            <th class="qty">Qty</th>
            <th class="price">Unit</th>
            <th class="price">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>French Manicure</td>
            <td class="qty">1</td>
            <td class="price">4,980</td>
            <td class="price">4,980</td>
          </tr>
          <tr>
            <td>Callus Removal</td>
            <td class="qty">1</td>
            <td class="price">1,038</td>
            <td class="price">1,038</td>
          </tr>
          <tr>
            <td>Gel Finish Add-on</td>
            <td class="qty">1</td>
            <td class="price">800</td>
            <td class="price">800</td>
          </tr>
        </tbody>
      </table>

      <!-- Totals -->
      <div class="totals">
        <div class="total-row">
          <span>Subtotal</span>
          <span>KSh 6,818</span>
        </div>
        <div class="total-row discount">
          <span>Discount</span>
          <span>- KSh 500</span>
        </div>
        <div class="total-row">
          <strong>Total</strong>
          <strong>KSh 6,318</strong>
        </div>
      </div>

      <div class="receipt-divider"></div>

      <!-- Payment Summary -->
      <div class="payment-summary">
        <div><strong>Amount Paid:</strong> KSh 6,318</div>
        <div><strong>Balance:</strong> <span class="paid">KSh 0</span></div>
        <div><strong>Paid via:</strong> M-Pesa</div>
        <div><strong>Ref:</strong> SGD73K9LQ</div>
        <div><strong>Paid On:</strong> 06 May 2026, 2:31 PM</div>
      </div>

      <div class="receipt-divider"></div>

      <!-- Policies -->
      <div class="policies">
        <p><strong>Policy Reminder:</strong></p>
        <ul>
          <li>Please arrive 10 minutes before your appointment</li>
          <li>Cancellations within 2 hours may incur a fee</li>
          <li>Services are non-refundable once completed</li>
        </ul>
      </div>

      <!-- Thank You -->
      <div class="thank-you">
        Thank you for choosing <strong>Symos Nail Spa</strong> ✨<br />
        We look forward to pampering you again soon!
      </div>

      <!-- QR Code -->
      <div class="qr-section">
        <div class="qr-placeholder">QR Code</div>
        <p class="qr-text">Scan to book your next appointment</p>
      </div>

      <!-- Verification -->
      <div class="verification">
        Verify this receipt: <br />
        <strong>symosnailspa.com/receipt/RCPT-20260506-0012</strong>
      </div>

      <div class="footer-brand">symosnailspa.com • Nairobi, Kenya</div>
    </div>
  </div>
</template>
<style scoped>
.receipt-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #f8f8f8;
  font-family: "Segoe UI", Arial, sans-serif;
}

.receipt-paper {
  background: white;
  padding: 40px 50px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  border: 1px solid #ddd;
}

.watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-35deg);
  font-size: 4.5rem;
  font-weight: 700;
  color: rgba(216, 27, 96, 0.06);
  pointer-events: none;
  white-space: nowrap;
  z-index: 0;
  letter-spacing: 8px;
}

.receipt-header {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
}

.logo-placeholder {
  font-size: 3.2rem;
  margin-bottom: 8px;
}

.receipt-header h1 {
  margin: 8px 0 4px;
  font-size: 1.85rem;
  color: var(--bg-pink);
}

.tagline {
  color: #555;
  margin-bottom: 12px;
}

.receipt-divider {
  height: 1px;
  background: #eee;
  margin: 20px 0;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  margin-bottom: 12px;
}

.status-row {
  background: #f0fdf4;
  color: #166534;
  padding: 8px 16px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
}

.paid-badge {
  background: #166534;
  color: white;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  font-size: 0.98rem;
  margin: 20px 0;
}

.services-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.services-table th,
.services-table td {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.services-table th {
  font-weight: 600;
  color: #444;
}

.qty,
.price {
  text-align: center;
  width: 80px;
}

.totals {
  margin-top: 20px;
  text-align: right;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
}

.total-row.discount {
  color: #10b981;
}

.payment-summary div {
  margin: 6px 0;
}

.policies ul {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #555;
  padding-left: 20px;
}

.thank-you {
  text-align: center;
  margin: 30px 0;
  font-size: 1.1rem;
  color: var(--bg-pink);
}

.qr-section {
  text-align: center;
  margin: 30px 0;
}

.qr-placeholder {
  width: 160px;
  height: 160px;
  border: 2px dashed #ccc;
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: #888;
}

.verification {
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  margin-top: 20px;
}

.footer-brand {
  text-align: center;
  margin-top: 40px;
  color: #999;
  font-size: 0.9rem;
}
</style>
