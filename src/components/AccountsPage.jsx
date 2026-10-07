import React, { useState } from 'react';
import { Building2, Globe, Phone, DollarSign, Users, Plus, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function AccountsPage({ accounts, onOpenNewRecord, onSelectAccount }) {
  const [industryFilter, setIndustryFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');

  const filteredAccounts = accounts.filter(acc => {
    const matchesIndustry = industryFilter === 'all' || acc.industry === industryFilter;
    const matchesTier = tierFilter === 'all' || acc.tier === tierFilter;
    return matchesIndustry && matchesTier;
  });

  const industries = Array.from(new Set(accounts.map(a => a.industry)));
  const tiers = Array.from(new Set(accounts.map(a => a.tier)));

  return (
    <div className="accounts-page-view">
      {/* Header Toolbar */}
      <div className="view-action-header">
        <div className="view-title-group">
          <h1>Enterprise Accounts Directory</h1>
          <p>Manage corporate customer profiles, tier hierarchy, and key accounts</p>
        </div>

        <div className="action-button-group">
          <button 
            className="btn-salesforce btn-salesforce-primary"
            onClick={() => onOpenNewRecord('account')}
          >
            <Plus size={16} />
            <span>Add Account</span>
          </button>
        </div>
      </div>

      {/* Table Data Card */}
      <div className="data-table-card">
        {/* Filter Bar */}
        <div className="table-filter-bar">
          <div className="table-filter-left">
            <label style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Industry:</label>
            <select 
              className="filter-select"
              value={industryFilter} 
              onChange={(e) => setIndustryFilter(e.target.value)}
            >
              <option value="all">All Industries</option>
              {industries.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>

            <label style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-secondary)', marginLeft: '12px' }}>Tier:</label>
            <select 
              className="filter-select"
              value={tierFilter} 
              onChange={(e) => setTierFilter(e.target.value)}
            >
              <option value="all">All Tiers</option>
              {tiers.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Showing {filteredAccounts.length} of {accounts.length} Accounts
          </div>
        </div>

        {/* Standard CRM Table */}
        <table className="crm-standard-table">
          <thead>
            <tr>
              <th>Account Name</th>
              <th>Tier</th>
              <th>Industry</th>
              <th>Annual Revenue</th>
              <th>Contacts</th>
              <th>Active Pipeline</th>
              <th>Account Health</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((acc) => (
              <tr key={acc.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7', fontWeight: 'bold' }}>
                      <Building2 size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', color: 'var(--color-salesforce-dark)' }}>{acc.name}</div>
                      <a href={acc.website} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--color-salesforce-blue)', textDecoration: 'none' }}>
                        {acc.website}
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`badge-pill ${acc.tier === 'Enterprise' ? 'badge-purple' : acc.tier === 'Mid-Market' ? 'badge-blue' : 'badge-amber'}`}>
                    {acc.tier}
                  </span>
                </td>
                <td>{acc.industry}</td>
                <td style={{ fontWeight: '600' }}>{acc.annualRevenue}</td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                    <Users size={14} color="#64748b" /> {acc.contactsCount}
                  </span>
                </td>
                <td style={{ color: 'var(--color-salesforce-green)', fontWeight: '700' }}>
                  ${(acc.totalDealValue || 0).toLocaleString()}
                </td>
                <td>
                  <span className={`badge-pill ${acc.health === 'High' ? 'badge-green' : 'badge-amber'}`}>
                    <ShieldCheck size={12} style={{ marginRight: '3px' }} />
                    {acc.health} Health
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
