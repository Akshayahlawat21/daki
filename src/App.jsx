import React, { useState, useEffect } from 'react';
import HeaderNavbar from './components/HeaderNavbar';
import HomeAnalytics from './components/HomeAnalytics';
import AccountsPage from './components/AccountsPage';
import OpportunitiesPage from './components/OpportunitiesPage';
import LeadsPage from './components/LeadsPage';
import ContactsPage from './components/ContactsPage';
import InvoicesPage from './components/InvoicesPage';
import WaveRepPage from './components/WaveRepPage';
import MobileJourneysModal from './components/MobileJourneysModal';
import SupabaseConfigModal from './components/SupabaseConfigModal';
import CreateRecordModal from './components/CreateRecordModal';
import { 
  initialAnalyticsData, 
  initialAccounts, 
  initialOpportunities, 
  initialLeads, 
  initialContacts, 
  initialInvoices 
} from './mockData';
import { getStoredSupabaseConfig, createCustomSupabaseClient } from './supabaseClient';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  
  // App Data States
  const [analyticsData, setAnalyticsData] = useState(initialAnalyticsData);
  const [accounts, setAccounts] = useState(initialAccounts);
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [leads, setLeads] = useState(initialLeads);
  const [contacts, setContacts] = useState(initialContacts);
  const [invoices, setInvoices] = useState(initialInvoices);

  // Supabase State
  const [supabaseClient, setSupabaseClient] = useState(null);
  const [isConnectedToSupabase, setIsConnectedToSupabase] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState('https://ijcadjkycoursargthbm.supabase.co');
  const [supabaseKey, setSupabaseKey] = useState('');

  // Modals
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [isMobileJourneysOpen, setIsMobileJourneysOpen] = useState(false);
  const [isNewRecordModalOpen, setIsNewRecordModalOpen] = useState(false);
  const [newRecordDefaultType, setNewRecordDefaultType] = useState('lead');

  // Load Saved Supabase Credentials on Mount
  useEffect(() => {
    const { url, key } = getStoredSupabaseConfig();
    setSupabaseUrl(url);
    setSupabaseKey(key);
    if (key) {
      const client = createCustomSupabaseClient(url, key);
      if (client) {
        setSupabaseClient(client);
        setIsConnectedToSupabase(true);
        fetchSupabaseTables(client);
      }
    }
  }, []);

  async function fetchSupabaseTables(client) {
    try {
      const { data: dbLeads } = await client.from('leads').select('*');
      if (dbLeads && dbLeads.length > 0) {
        setLeads(dbLeads.map(l => ({
          id: l.id.toString(),
          name: `${l.first_name || ''} ${l.last_name || ''}`.trim() || l.name || 'Anonymous Lead',
          email: l.email,
          company: l.company || 'Enterprise Prospect',
          phone: l.phone || '+1-555-0100',
          industry: l.industry || 'Technology',
          score: l.score || 85,
          status: l.status || 'qualified',
          source: l.source || 'Direct',
          signals: 'Live Supabase Record'
        })));
      }

      const { data: dbAccounts } = await client.from('accounts').select('*');
      if (dbAccounts && dbAccounts.length > 0) {
        setAccounts(dbAccounts.map(a => ({
          id: a.id.toString(),
          name: a.name,
          industry: a.industry || 'SaaS',
          website: a.website || 'https://example.com',
          tier: a.tier || 'Enterprise',
          annualRevenue: a.annual_revenue ? `$${(a.annual_revenue / 1000000).toFixed(0)}M` : '$50M',
          status: a.status || 'active',
          contactsCount: 4,
          dealsCount: 2,
          totalDealValue: 120000,
          health: 'High'
        })));
      }
    } catch (err) {
      console.warn('Live fetch note:', err);
    }
  }

  // Record Creation Handler
  const handleSaveRecord = async (type, record) => {
    if (type === 'lead') {
      const formattedLead = {
        id: record.id || Date.now().toString(),
        name: record.name || 'New Lead',
        email: record.email || '',
        company: record.company || 'Enterprise Corp',
        phone: record.phone || '+1-555-0199',
        industry: record.industry || 'Technology',
        score: record.score || 85,
        status: record.status || 'new',
        source: record.source || 'Direct Capture',
        signals: 'New Lead Signal',
        created_at: new Date().toISOString().split('T')[0]
      };
      setLeads(prev => [formattedLead, ...prev]);
      setActiveTab('leads');

      if (isConnectedToSupabase && supabaseClient) {
        try {
          await supabaseClient.from('leads').insert([{
            first_name: formattedLead.name.split(' ')[0] || formattedLead.name,
            last_name: formattedLead.name.split(' ').slice(1).join(' ') || '',
            email: formattedLead.email,
            company: formattedLead.company,
            phone: formattedLead.phone,
            industry: formattedLead.industry,
            score: formattedLead.score,
            status: formattedLead.status,
            source: formattedLead.source
          }]);
        } catch (err) {
          console.warn('Supabase insert lead error:', err);
        }
      }
    } else if (type === 'account') {
      const formattedAccount = {
        id: record.id || Date.now().toString(),
        name: record.name || 'New Enterprise Account',
        industry: record.industry || 'Information Technology',
        website: record.website || 'https://example.com',
        tier: record.tier || 'Enterprise',
        annualRevenue: record.annualRevenue ? (record.annualRevenue.startsWith('$') ? record.annualRevenue : `$${record.annualRevenue}`) : '$75M',
        status: 'active',
        contactsCount: record.contactsCount || 2,
        dealsCount: record.dealsCount || 1,
        totalDealValue: record.totalDealValue || 150000,
        health: record.health || 'High'
      };
      setAccounts(prev => [formattedAccount, ...prev]);
      setActiveTab('accounts');

      if (isConnectedToSupabase && supabaseClient) {
        try {
          await supabaseClient.from('accounts').insert([{
            name: formattedAccount.name,
            industry: formattedAccount.industry,
            website: formattedAccount.website,
            tier: formattedAccount.tier,
            status: formattedAccount.status
          }]);
        } catch (err) {
          console.warn('Supabase insert account error:', err);
        }
      }
    } else if (type === 'opportunity') {
      const formattedOpp = {
        id: record.id || Date.now().toString(),
        name: record.name || 'Strategic Expansion Deal',
        accountId: record.accountId || '1',
        accountName: record.accountName || 'Enterprise Account',
        amount: parseFloat(record.amount) || 95000,
        stage: record.stage || 'Proposal',
        probability: record.probability || 60,
        closeDate: record.closeDate || '2026-12-15',
        owner: record.owner || 'Alex Johnson',
        segment: record.segment || 'ENT'
      };
      setOpportunities(prev => [formattedOpp, ...prev]);
      setActiveTab('opportunities');

      if (isConnectedToSupabase && supabaseClient) {
        try {
          await supabaseClient.from('deals').insert([{
            name: formattedOpp.name,
            amount: formattedOpp.amount,
            stage: formattedOpp.stage,
            close_date: formattedOpp.closeDate
          }]);
        } catch (err) {
          console.warn('Supabase insert deal error:', err);
        }
      }
    } else if (type === 'contact') {
      const formattedContact = {
        id: record.id || Date.now().toString(),
        firstName: record.firstName || 'Jane',
        lastName: record.lastName || 'Doe',
        title: record.title || 'Director of Operations',
        accountName: record.accountName || 'Enterprise Corp',
        department: record.department || 'Operations',
        email: record.email || 'jane@example.com',
        phone: record.phone || '+1-555-0188',
        isKeyDecisionMaker: true
      };
      setContacts(prev => [formattedContact, ...prev]);
      setActiveTab('contacts');
    } else if (type === 'invoice') {
      const formattedInvoice = {
        id: record.id || Date.now().toString(),
        invoiceNumber: record.invoiceNumber || `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
        accountName: record.accountName || 'Enterprise Account',
        issueDate: record.issueDate || new Date().toISOString().split('T')[0],
        dueDate: record.dueDate || '2026-11-30',
        amount: parseFloat(record.amount) || 85000,
        status: record.status || 'issued',
        paymentMethod: record.paymentMethod || 'Net-30 Wire'
      };
      setInvoices(prev => [formattedInvoice, ...prev]);
      setActiveTab('invoices');
    }
  };

  // Convert Lead Action
  const handleConvertLead = (lead) => {
    // Create new Account
    const newAccount = {
      id: Date.now().toString(),
      name: lead.company || `${lead.name}'s Organization`,
      industry: lead.industry || 'Enterprise Technology',
      website: `https://${lead.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      tier: 'Enterprise',
      annualRevenue: '$40M',
      status: 'active',
      contactsCount: 1,
      dealsCount: 1,
      totalDealValue: 85000,
      health: 'High'
    };

    // Create new Opportunity
    const newOpportunity = {
      id: (Date.now() + 1).toString(),
      name: `${lead.company} - Expansion Deal`,
      accountId: newAccount.id,
      accountName: newAccount.name,
      amount: 85000,
      stage: 'Qualification',
      probability: 50,
      closeDate: '2026-11-30',
      owner: 'Alex Johnson',
      segment: 'ENT'
    };

    setAccounts(prev => [newAccount, ...prev]);
    setOpportunities(prev => [newOpportunity, ...prev]);
    setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: 'converted' } : l));
    
    setActiveTab('opportunities');
  };

  // Stage Update Handler
  const handleUpdateOpportunityStage = (oppId, newStage) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === oppId) {
        return {
          ...opp,
          stage: newStage,
          probability: newStage === 'Closed Won' ? 100 : newStage === 'Closing' ? 90 : opp.probability
        };
      }
      return opp;
    }));
  };

  // Filter lists based on global search term
  const matchesSearch = (item, keys) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return keys.some(k => item[k] && item[k].toString().toLowerCase().includes(term));
  };

  const filteredAccounts = accounts.filter(a => matchesSearch(a, ['name', 'industry', 'tier']));
  const filteredOpportunities = opportunities.filter(o => matchesSearch(o, ['name', 'accountName', 'stage', 'owner']));
  const filteredLeads = leads.filter(l => matchesSearch(l, ['name', 'company', 'email', 'industry', 'source']));
  const filteredContacts = contacts.filter(c => matchesSearch(c, ['firstName', 'lastName', 'title', 'accountName', 'email']));
  const filteredInvoices = invoices.filter(i => matchesSearch(i, ['invoiceNumber', 'accountName', 'status']));

  return (
    <div className="app-wrapper">
      {/* Salesforce Wave Header Navigation Bar */}
      <HeaderNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenNewRecord={() => {
          setNewRecordDefaultType(activeTab === 'accounts' ? 'account' : activeTab === 'opportunities' ? 'opportunity' : activeTab === 'contacts' ? 'contact' : 'lead');
          setIsNewRecordModalOpen(true);
        }}
        onOpenSupabaseConfig={() => setIsSupabaseModalOpen(true)}
        onToggleMobileJourneys={() => setIsMobileJourneysOpen(true)}
        isConnectedToSupabase={isConnectedToSupabase}
        supabaseUrl={supabaseUrl}
      />

      {/* Main Content Area */}
      <main className="main-content-layout">
        {activeTab === 'home' && (
          <HomeAnalytics
            analyticsData={analyticsData}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'accounts' && (
          <AccountsPage
            accounts={filteredAccounts}
            onOpenNewRecord={(type) => {
              setNewRecordDefaultType(type || 'account');
              setIsNewRecordModalOpen(true);
            }}
          />
        )}

        {activeTab === 'opportunities' && (
          <OpportunitiesPage
            opportunities={filteredOpportunities}
            onUpdateOpportunityStage={handleUpdateOpportunityStage}
            onOpenNewRecord={(type) => {
              setNewRecordDefaultType(type || 'opportunity');
              setIsNewRecordModalOpen(true);
            }}
          />
        )}

        {activeTab === 'leads' && (
          <LeadsPage
            leads={filteredLeads}
            onConvertLead={handleConvertLead}
            onOpenNewRecord={(type) => {
              setNewRecordDefaultType(type || 'lead');
              setIsNewRecordModalOpen(true);
            }}
          />
        )}

        {activeTab === 'contacts' && (
          <ContactsPage
            contacts={filteredContacts}
            onOpenNewRecord={(type) => {
              setNewRecordDefaultType(type || 'contact');
              setIsNewRecordModalOpen(true);
            }}
          />
        )}

        {activeTab === 'invoices' && (
          <InvoicesPage
            invoices={filteredInvoices}
            onOpenNewRecord={(type) => {
              setNewRecordDefaultType(type || 'invoice');
              setIsNewRecordModalOpen(true);
            }}
          />
        )}

        {['wave-rep', 'wave-mgr', 'wave-ops', 'dashboards'].includes(activeTab) && (
          <WaveRepPage mode={activeTab} />
        )}
      </main>

      {/* Modals */}
      <MobileJourneysModal
        isOpen={isMobileJourneysOpen}
        onClose={() => setIsMobileJourneysOpen(false)}
      />

      <SupabaseConfigModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        currentUrl={supabaseUrl}
        currentKey={supabaseKey}
        onConnected={(client, isConnected, url, key) => {
          setSupabaseClient(client);
          setIsConnectedToSupabase(isConnected);
          setSupabaseUrl(url);
          setSupabaseKey(key);
          if (client) fetchSupabaseTables(client);
        }}
      />

      <CreateRecordModal
        isOpen={isNewRecordModalOpen}
        onClose={() => setIsNewRecordModalOpen(false)}
        defaultType={newRecordDefaultType}
        onSaveRecord={handleSaveRecord}
      />
    </div>
  );
}
