import React from 'react';
import { Users, Mail, Phone, Plus, Star, Building2 } from 'lucide-react';

export default function ContactsPage({ contacts, onOpenNewRecord }) {
  return (
    <div className="contacts-page-view">
      {/* Header Toolbar */}
      <div className="view-action-header">
        <div className="view-title-group">
          <h1>Corporate Contacts & Decision Makers</h1>
          <p>Key stakeholders, champions, buyers, and account contacts</p>
        </div>

        <div className="action-button-group">
          <button 
            className="btn-salesforce btn-salesforce-primary"
            onClick={() => onOpenNewRecord('contact')}
          >
            <Plus size={16} />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      <div className="data-table-card">
        <table className="crm-standard-table">
          <thead>
            <tr>
              <th>Contact Name & Role</th>
              <th>Account</th>
              <th>Department</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Decision Maker</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
                      {contact.firstName[0]}{contact.lastName[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', color: 'var(--color-salesforce-dark)' }}>
                        {contact.firstName} {contact.lastName}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{contact.title}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                    <Building2 size={14} color="#64748b" /> {contact.accountName}
                  </span>
                </td>
                <td>
                  <span className="badge-pill badge-blue">{contact.department}</span>
                </td>
                <td>
                  <a href={`mailto:${contact.email}`} style={{ color: 'var(--color-salesforce-blue)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Mail size={13} /> {contact.email}
                  </a>
                </td>
                <td>
                  <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Phone size={13} /> {contact.phone}
                  </span>
                </td>
                <td>
                  {contact.isKeyDecisionMaker ? (
                    <span className="badge-pill badge-green">
                      <Star size={12} style={{ marginRight: '3px' }} />
                      Key Buyer
                    </span>
                  ) : (
                    <span className="badge-pill badge-purple">Influencer</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
