import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// ==============================================================================
// 1. Supabase Client Configuration
// Replace with your Supabase Project URL and Anon Public Key
// ==============================================================================
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ijcadjkycoursargthbm.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY_HERE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==============================================================================
// 2. React Sales CRM Component with Real-time Filtering
// ==============================================================================
export default function SalesCRM() {
  const [activeTab, setActiveTab] = useState('leads');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // CRM State Data
  const [leads, setLeads] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [deals, setDeals] = useState([]);

  // Fetch Data on Component Mount & Tab Switch
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  async function fetchData() {
    setLoading(true);
    try {
      if (activeTab === 'leads') {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) setLeads(data);
      } else if (activeTab === 'accounts') {
        const { data, error } = await supabase
          .from('accounts')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) setAccounts(data);
      } else if (activeTab === 'deals') {
        const { data, error } = await supabase
          .from('deals')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) setDeals(data);
      }
    } catch (err) {
      console.error('Error fetching from Supabase:', err);
    } finally {
      setLoading(false);
    }
  }

  // Real-time Search & Filter by Name / Email / Company
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      !searchTerm ||
      (lead.name && lead.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.industry && lead.industry.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredAccounts = accounts.filter((acc) => {
    return (
      !searchTerm ||
      (acc.name && acc.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (acc.industry && acc.industry.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const filteredDeals = deals.filter((deal) => {
    return (
      !searchTerm ||
      (deal.name && deal.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (deal.stage && deal.stage.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Dakini Sales CRM</h1>
          <p style={styles.subtitle}>Supabase Real-time API Integration</p>
        </div>

        {/* Global Search Filter */}
        <div style={styles.searchWrapper}>
          <input
            type="text"
            placeholder="🔍 Filter by name, email, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </header>

      {/* Navigation Tabs */}
      <div style={styles.tabBar}>
        <button
          onClick={() => setActiveTab('leads')}
          style={{ ...styles.tabBtn, ...(activeTab === 'leads' ? styles.tabBtnActive : {}) }}
        >
          Leads ({leads.length})
        </button>
        <button
          onClick={() => setActiveTab('accounts')}
          style={{ ...styles.tabBtn, ...(activeTab === 'accounts' ? styles.tabBtnActive : {}) }}
        >
          Accounts ({accounts.length})
        </button>
        <button
          onClick={() => setActiveTab('deals')}
          style={{ ...styles.tabBtn, ...(activeTab === 'deals' ? styles.tabBtnActive : {}) }}
        >
          Deals ({deals.length})
        </button>
      </div>

      {/* Filter Dropdown (for Leads) */}
      {activeTab === 'leads' && (
        <div style={styles.filterBar}>
          <label style={{ color: '#9CA3AF', fontSize: '14px', marginRight: '8px' }}>Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={styles.select}
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
          </select>
          <span style={{ marginLeft: 'auto', color: '#6B7280', fontSize: '13px' }}>
            Showing {filteredLeads.length} leads
          </span>
        </div>
      )}

      {/* Content Table */}
      <div style={styles.tableCard}>
        {loading ? (
          <div style={styles.emptyState}>Loading from Supabase...</div>
        ) : activeTab === 'leads' ? (
          <table style={styles.table}>
            <thead>
              <tr style={styles.thRow}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Industry</th>
                <th style={styles.th}>Score</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="5" style={styles.emptyState}>
                    No leads found matching "{searchTerm}"
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} style={styles.tr}>
                    <td style={{ ...styles.td, fontWeight: '600', color: '#fff' }}>{lead.name}</td>
                    <td style={styles.td}>{lead.email || '—'}</td>
                    <td style={styles.td}>{lead.industry || '—'}</td>
                    <td style={styles.td}>
                      <span style={lead.score >= 70 ? styles.badgeGreen : styles.badgeYellow}>
                        {lead.score || 0}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.badgeBlue}>{lead.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : activeTab === 'accounts' ? (
          <table style={styles.table}>
            <thead>
              <tr style={styles.thRow}>
                <th style={styles.th}>Company Name</th>
                <th style={styles.th}>Industry</th>
                <th style={styles.th}>Website</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((acc) => (
                <tr key={acc.id} style={styles.tr}>
                  <td style={{ ...styles.td, fontWeight: '600', color: '#fff' }}>{acc.name}</td>
                  <td style={styles.td}>{acc.industry || '—'}</td>
                  <td style={styles.td}>{acc.website || '—'}</td>
                  <td style={styles.td}>
                    <span style={styles.badgeGreen}>{acc.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.thRow}>
                <th style={styles.th}>Deal Name</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Stage</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeals.map((deal) => (
                <tr key={deal.id} style={styles.tr}>
                  <td style={{ ...styles.td, fontWeight: '600', color: '#fff' }}>{deal.name}</td>
                  <td style={{ ...styles.td, color: '#10B981', fontWeight: '700' }}>
                    ${parseFloat(deal.amount || 0).toLocaleString()}
                  </td>
                  <td style={styles.td}>{deal.stage}</td>
                  <td style={styles.td}>
                    <span style={styles.badgeBlue}>{deal.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ==============================================================================
// 3. Modern Dark Styles
// ==============================================================================
const styles = {
  container: {
    backgroundColor: '#0B0F19',
    color: '#F3F4F6',
    minHeight: '100vh',
    padding: '32px 40px',
    fontFamily: 'sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  title: { fontSize: '28px', fontWeight: '800', margin: 0, color: '#fff' },
  subtitle: { fontSize: '14px', color: '#9CA3AF', margin: '4px 0 0 0' },
  searchWrapper: { width: '320px' },
  searchInput: {
    width: '100%',
    padding: '10px 16px',
    backgroundColor: '#131A2B',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none'
  },
  tabBar: {
    display: 'flex',
    gap: '10px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    paddingBottom: '12px',
    marginBottom: '20px'
  },
  tabBtn: {
    padding: '8px 18px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#9CA3AF',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '8px'
  },
  tabBtnActive: {
    backgroundColor: 'rgba(79, 70, 229, 0.2)',
    color: '#818CF8'
  },
  filterBar: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px'
  },
  select: {
    backgroundColor: '#131A2B',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: '6px',
    outline: 'none'
  },
  tableCard: {
    backgroundColor: '#131A2B',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '14px',
    overflow: 'hidden'
  },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  thRow: { borderBottom: '1px solid rgba(255,255,255,0.08)' },
  th: {
    padding: '14px 18px',
    fontSize: '12px',
    textTransform: 'uppercase',
    color: '#9CA3AF',
    letterSpacing: '0.05em'
  },
  tr: { borderBottom: '1px solid rgba(255,255,255,0.04)' },
  td: { padding: '14px 18px', fontSize: '14px', color: '#D1D5DB' },
  badgeGreen: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    color: '#10B981',
    padding: '4px 10px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: '700'
  },
  badgeBlue: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    color: '#3B82F6',
    padding: '4px 10px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: '700'
  },
  badgeYellow: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    color: '#F59E0B',
    padding: '4px 10px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: '700'
  },
  emptyState: { padding: '40px', textAlign: 'center', color: '#6B7280' }
};
