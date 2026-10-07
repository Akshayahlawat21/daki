import React from 'react';
import { Receipt, DollarSign, Calendar, CheckCircle2, Clock, Plus, Download } from 'lucide-react';

export default function InvoicesPage({ invoices, onOpenNewRecord }) {
  const totalBilled = invoices.reduce((sum, inv) => sum + (inv.amount || 0), 0);
  const totalPaid = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + (inv.amount || 0), 0);
  const totalPending = totalBilled - totalPaid;

  return (
    <div className="invoices-page-view">
      {/* Header Toolbar */}
      <div className="view-action-header">
        <div className="view-title-group">
          <h1>Invoices & Revenue Ledger</h1>
          <p>Commercial billing, customer invoice status, and settlement tracking</p>
        </div>

        <div className="action-button-group">
          <button 
            className="btn-salesforce btn-salesforce-primary"
            onClick={() => onOpenNewRecord('invoice')}
          >
            <Plus size={16} />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        <div className="analytics-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-muted)' }}>TOTAL BILLED REVENUE</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--color-salesforce-dark)', margin: '4px 0' }}>
            ${totalBilled.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Across {invoices.length} Enterprise Invoices</div>
        </div>

        <div className="analytics-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-salesforce-green)' }}>SETTLED / PAID</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--color-salesforce-green)', margin: '4px 0' }}>
            ${totalPaid.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Received funds</div>
        </div>

        <div className="analytics-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-salesforce-orange)' }}>PENDING RECEIVABLES</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--color-salesforce-orange)', margin: '4px 0' }}>
            ${totalPending.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Awaiting wire transfer</div>
        </div>
      </div>

      <div className="data-table-card">
        <table className="crm-standard-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Customer Account</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td style={{ fontWeight: '700', color: 'var(--color-salesforce-blue)' }}>{inv.invoiceNumber}</td>
                <td style={{ fontWeight: '600' }}>{inv.accountName}</td>
                <td>{inv.issueDate}</td>
                <td>{inv.dueDate}</td>
                <td style={{ fontWeight: '700', color: 'var(--color-salesforce-dark)' }}>
                  ${(inv.amount || 0).toLocaleString()}
                </td>
                <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{inv.paymentMethod}</td>
                <td>
                  <span className={`badge-pill ${inv.status === 'paid' ? 'badge-green' : inv.status === 'issued' ? 'badge-blue' : 'badge-amber'}`}>
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
