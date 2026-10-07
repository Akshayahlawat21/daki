import React, { useState } from 'react';
import { UserPlus, Sparkles, Phone, Mail, CheckCircle, ArrowRight, Zap, Filter, Plus } from 'lucide-react';

export default function LeadsPage({ leads, onConvertLead, onOpenNewRecord }) {
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredLeads = leads.filter(l => {
    return statusFilter === 'all' || l.status === statusFilter;
  });

  return (
    <div className="leads-page-view">
      {/* Header Toolbar */}
      <div className="view-action-header">
        <div className="view-title-group">
          <h1>Leads & Acquisition Signals</h1>
          <p>Real-time inbound lead scoring, buyer intent tracking, and account qualification</p>
        </div>

        <div className="action-button-group">
          <button 
            className="btn-salesforce btn-salesforce-primary"
            onClick={() => onOpenNewRecord('lead')}
          >
            <Plus size={16} />
            <span>Capture New Lead</span>
          </button>
        </div>
      </div>

      <div className="data-table-card">
        {/* Filter Bar */}
        <div className="table-filter-bar">
          <div className="table-filter-left">
            <label style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Status:</label>
            <select 
              className="filter-select"
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
            </select>
          </div>

          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Showing {filteredLeads.length} Leads
          </div>
        </div>

        {/* Leads Table */}
        <table className="crm-standard-table">
          <thead>
            <tr>
              <th>Lead Contact</th>
              <th>Company</th>
              <th>Lead Score</th>
              <th>Status</th>
              <th>Intent Signals</th>
              <th>Source</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id}>
                <td>
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--color-salesforce-dark)' }}>{lead.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{lead.email}</div>
                  </div>
                </td>
                <td style={{ fontWeight: '600' }}>{lead.company}</td>
                <td>
                  <span className={`badge-pill ${lead.score >= 90 ? 'badge-green' : lead.score >= 70 ? 'badge-blue' : 'badge-amber'}`}>
                    <Zap size={12} style={{ marginRight: '3px' }} />
                    {lead.score} / 100
                  </span>
                </td>
                <td>
                  <span className={`badge-pill ${lead.status === 'qualified' ? 'badge-green' : lead.status === 'contacted' ? 'badge-blue' : 'badge-amber'}`}>
                    {lead.status}
                  </span>
                </td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#0369a1', background: '#f0f9ff', padding: '3px 8px', borderRadius: '4px' }}>
                    <Sparkles size={12} color="#0284c7" />
                    {lead.signals || 'Active visitor'}
                  </span>
                </td>
                <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{lead.source}</td>
                <td>
                  <button
                    className="btn-salesforce btn-salesforce-outline"
                    style={{ padding: '4px 10px', fontSize: '12px' }}
                    onClick={() => onConvertLead(lead)}
                    title="Convert to Account & Deal"
                  >
                    <span>Convert</span>
                    <ArrowRight size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
