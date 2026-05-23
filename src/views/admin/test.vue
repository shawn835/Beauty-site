<template>
  <div class="receipt-wrapper">
    <div class="receipt">
      <!-- Brand Header -->
      <div class="receipt-header">
        <div class="brand">
          <h1>Symos Nail Spa</h1>
          <p class="tagline">Luxury Nail Care & Beauty Studio</p>
        </div>
        <div class="business-info">
          <p>Nairobi, Kenya</p>
          <p>+254 712 345 678</p>
          <p>hello@symosnailspa.com</p>
          <p>www.symosnailspa.com</p>
        </div>
      </div>

      <div class="receipt-divider"></div>

      <!-- Transaction Info -->
      <div class="transaction-info">
        <div>
          <strong>Receipt No:</strong> RCPT-20260521-0087<br>
          <strong>Booking No:</strong> BK-1FP45954
        </div>
        <div class="text-right">
          <strong>Date:</strong> 21 May 2026<br>
          <strong>Time:</strong> 14:35
        </div>
      </div>

      <div class="status-badge">PAID</div>

      <div class="receipt-divider"></div>

      <!-- Customer & Appointment -->
      <div class="info-grid">
        <div>
          <strong>Customer</strong><br>
          Shawn<br>
          +254 712 345 678
        </div>
        <div>
          <strong>Appointment</strong><br>
          Saturday, 24 May 2026<br>
          11:00 AM - 2:00 PM<br>
          Technician: Esther Wanjiku
        </div>
      </div>

      <div class="receipt-divider"></div>

      <!-- Services -->
      <table class="services-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Duration</th>
            <th class="price-col">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>French Manicure</strong></td>
            <td>1 hr 30 mins</td>
            <td class="price-col">KSh 4,980</td>
          </tr>
          <tr>
            <td><strong>Spa Pedicure</strong></td>
            <td>1 hr 45 mins</td>
            <td class="price-col">KSh 3,500</td>
          </tr>

          <!-- Sub-services -->
          <tr class="sub-service">
            <td colspan="3" class="sub-title">Add-ons</td>
          </tr>
          <tr class="sub-service">
            <td>Gel Overlay</td>
            <td>30 mins</td>
            <td class="price-col">KSh 800</td>
          </tr>
          <tr class="sub-service">
            <td>Rhinestone Accent</td>
            <td>15 mins</td>
            <td class="price-col">KSh 600</td>
          </tr>
        </tbody>
      </table>

      <!-- Payment Summary -->
      <div class="payment-summary">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>KSh 9,880</span>
        </div>
        <div class="summary-row discount">
          <span>Discount</span>
          <span>- KSh 500</span>
        </div>
        <div class="summary-row total">
          <strong>Total</strong>
          <strong>KSh 9,380</strong>
        </div>
      </div>

      <div class="receipt-divider"></div>

      <!-- Payment Info -->
      <div class="payment-info">
        <div><strong>Payment Method:</strong> M-Pesa</div>
        <div><strong>Transaction Ref:</strong> MPESA-20260521-7842</div>
        <div><strong>Paid On:</strong> 21 May 2026, 14:35</div>
      </div>

      <!-- Thank You -->
      <div class="thank-you">
        Thank you for choosing Symos Nail Spa ✨<br>
        We look forward to seeing you again!
      </div>

      <!-- Footer -->
      <div class="receipt-footer">
        <p>Verify this receipt at: <strong>symosnailspa.com/verify/RCPT-20260521-0087</strong></p>
        <p class="small">• Please arrive 10 minutes early • Cancellations within 12 hours may incur fees</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.receipt-wrapper {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
}

.receipt {
  background: white;
  padding: 50px 60px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  font-family: 'Segoe UI', Arial, sans-serif;
  color: #222;
  line-height: 1.6;
}

.receipt-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}

.brand h1 {
  margin: 0;
  font-size: 1.9rem;
  color: #d81b60;
}

.tagline {
  margin: 4px 0 0;
  color: #555;
  font-size: 0.95rem;
}

.transaction-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  margin-bottom: 20px;
}

.status-badge {
  background: #10b981;
  color: white;
  padding: 6px 20px;
  border-radius: 30px;
  font-weight: 700;
  display: inline-block;
  margin: 12px 0;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin: 24px 0;
  font-size: 0.98rem;
}

.services-table {
  width: 100%;
  border-collapse: collapse;
  margin: 24px 0;
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

.price-col {
  text-align: right;
  font-weight: 500;
}

.sub-service td {
  padding-left: 32px;
  color: #555;
  font-size: 0.95rem;
}

.sub-title {
  font-weight: 600;
  color: #d81b60;
  padding-top: 12px !important;
}

.payment-summary {
  margin: 20px 0;
  padding: 16px 0;
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
}

.summary-row.discount {
  color: #10b981;
}

.summary-row.total {
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 8px;
}

.payment-info {
  margin: 20px 0;
  font-size: 0.95rem;
}

.thank-you {
  text-align: center;
  margin: 40px 0;
  font-size: 1.15rem;
  color: #d81b60;
}

.receipt-footer {
  text-align: center;
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
  font-size: 0.85rem;
  color: #666;
}

.receipt-divider {
  height: 1px;
  background: #eee;
  margin: 20px 0;
}
</style>