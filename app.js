// ==============================================================================
// Dakini Sales CRM - Frontend Client Application
// Real-time Supabase Fetching, Instant Filtering, Search & CRUD
// ==============================================================================

// State Management
let supabaseClient = null;
let isConnectedToSupabase = false;
let currentTab = 'dashboard';
let searchQuery = '';

// In-Memory Data Store (Populated via Supabase or Local Demo Data)
let dbData = {
    leads: [
        { id: '1', name: 'Emily Davis', email: 'emily@techhorizon.io', phone: '+1-555-0199', industry: 'SaaS', score: 85, status: 'qualified', source: 'Website Form', created_at: '2026-10-06' },
        { id: '2', name: 'David Smith', email: 'david.smith@cybercore.net', phone: '+1-555-0244', industry: 'Cybersecurity', score: 92, status: 'qualified', source: 'LinkedIn', created_at: '2026-10-05' },
        { id: '3', name: 'Sarah Miller', email: 'sarah.m@cloudscale.ai', phone: '+1-555-0377', industry: 'Artificial Intelligence', score: 78, status: 'contacted', source: 'Event/Conference', created_at: '2026-10-04' },
        { id: '4', name: 'Alex Johnson', email: 'alex.j@finflow.co', phone: '+1-555-0411', industry: 'Fintech', score: 65, status: 'new', source: 'Referral', created_at: '2026-10-03' },
        { id: '5', name: 'David Chen', email: 'dchen@nexushealth.com', phone: '+1-555-0588', industry: 'Healthcare Tech', score: 88, status: 'qualified', source: 'Website Form', created_at: '2026-10-02' }
    ],
    accounts: [
        { id: '1', name: 'Tech Horizon Inc', industry: 'Information Technology', website: 'https://techhorizon.io', phone: '+1-555-0100', address: '100 Silicon Ave, San Francisco, CA', status: 'active' },
        { id: '2', name: 'CyberCore Systems', industry: 'Cybersecurity', website: 'https://cybercore.net', phone: '+1-555-0200', address: '450 Boston Post Rd, Boston, MA', status: 'active' },
        { id: '3', name: 'CloudScale AI', industry: 'Artificial Intelligence', website: 'https://cloudscale.ai', phone: '+1-555-0300', address: '78 Austin Way, Austin, TX', status: 'active' }
    ],
    contacts: [
        { id: '1', first_name: 'Emily', last_name: 'Davis', email: 'emily@techhorizon.io', phone: '+1-555-0199', title: 'VP of Engineering', department: 'Engineering' },
        { id: '2', first_name: 'David', last_name: 'Smith', email: 'david.smith@cybercore.net', phone: '+1-555-0244', title: 'Chief Technology Officer', department: 'Executive' },
        { id: '3', first_name: 'Sarah', last_name: 'Miller', email: 'sarah.m@cloudscale.ai', phone: '+1-555-0377', title: 'Director of Product', department: 'Product' }
    ],
    deals: [
        { id: '1', name: 'Tech Horizon Enterprise Deal', amount: 65000, currency: 'USD', stage: 'Closing', close_date: '2026-11-15', status: 'open' },
        { id: '2', name: 'CyberCore Global Migration', amount: 120000, currency: 'USD', stage: 'Negotiation', close_date: '2026-11-30', status: 'open' },
        { id: '3', name: 'CloudScale AI Seat Expansion', amount: 45000, currency: 'USD', stage: 'Proposal', close_date: '2026-12-10', status: 'open' }
    ],
    invoices: [
        { id: '1', invoice_number: 'INV-2026-001', issue_date: '2026-10-06', due_date: '2026-11-06', total_amount: 65000, currency: 'USD', status: 'issued' },
        { id: '2', invoice_number: 'INV-2026-002', issue_date: '2026-10-01', due_date: '2026-10-31', total_amount: 12000, currency: 'USD', status: 'completed' }
    ],
    activities: [
        { id: '1', type: 'Demo Call', subject: 'Executive Architecture Review (David)', description: 'Demonstrate cloud infrastructure features', start_at: '2026-10-07 14:00', status: 'planned', priority: 'high' },
        { id: '2', type: 'Proposal Review', subject: 'Contract Finalization with Emily', description: 'Review SLA terms and pricing tiers', start_at: '2026-10-08 11:30', status: 'planned', priority: 'high' }
    ]
};

// ==============================================================================
// INITIALIZATION
// ==============================================================================

document.addEventListener('DOMContentLoaded', () => {
    initLucide();
    setupEventListeners();
    checkSavedSupabaseConfig();
    renderAllViews();
});

function initLucide() {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// ==============================================================================
// SUPABASE CLIENT INITIALIZATION & LIVE DATA FETCHING
// ==============================================================================

function checkSavedSupabaseConfig() {
    const savedUrl = localStorage.getItem('supabase_url') || 'https://ijcadjkycoursargthbm.supabase.co';
    const savedKey = localStorage.getItem('supabase_key');

    document.getElementById('supabase-url').value = savedUrl;
    if (savedKey) {
        document.getElementById('supabase-key').value = savedKey;
        initSupabase(savedUrl, savedKey);
    } else {
        updateConnectionStatus(false);
    }
}

function initSupabase(url, key) {
    try {
        if (!window.supabase || !window.supabase.createClient) {
            console.warn('Supabase SDK not loaded, using local demo data.');
            return;
        }

        supabaseClient = window.supabase.createClient(url, key);
        updateConnectionStatus(true);
        fetchLiveDataFromSupabase();
    } catch (err) {
        console.error('Failed to init Supabase client:', err);
        updateConnectionStatus(false);
    }
}

async function fetchLiveDataFromSupabase() {
    if (!supabaseClient) return;

    try {
        // 1. Fetch Leads
        const { data: leads, error: errLeads } = await supabaseClient.from('leads').select('*').order('created_at', { ascending: false });
        if (!errLeads && leads && leads.length > 0) dbData.leads = leads;

        // 2. Fetch Accounts
        const { data: accounts, error: errAcc } = await supabaseClient.from('accounts').select('*').order('created_at', { ascending: false });
        if (!errAcc && accounts && accounts.length > 0) dbData.accounts = accounts;

        // 3. Fetch Contacts
        const { data: contacts, error: errCont } = await supabaseClient.from('contacts').select('*').order('created_at', { ascending: false });
        if (!errCont && contacts && contacts.length > 0) dbData.contacts = contacts;

        // 4. Fetch Deals
        const { data: deals, error: errDeals } = await supabaseClient.from('deals').select('*').order('created_at', { ascending: false });
        if (!errDeals && deals && deals.length > 0) dbData.deals = deals;

        // 5. Fetch Invoices
        const { data: invoices, error: errInv } = await supabaseClient.from('invoices').select('*').order('created_at', { ascending: false });
        if (!errInv && invoices && invoices.length > 0) dbData.invoices = invoices;

        // 6. Fetch Activities
        const { data: activities, error: errAct } = await supabaseClient.from('activities').select('*').order('created_at', { ascending: false });
        if (!errAct && activities && activities.length > 0) dbData.activities = activities;

        renderAllViews();
    } catch (err) {
        console.error('Error fetching Supabase data:', err);
    }
}

function updateConnectionStatus(connected) {
    isConnectedToSupabase = connected;
    const statusEl = document.getElementById('connection-status');
    const labelEl = statusEl.querySelector('.status-label');

    if (connected) {
        statusEl.classList.add('connected');
        labelEl.textContent = 'Live Supabase';
    } else {
        statusEl.classList.remove('connected');
        labelEl.textContent = 'Demo Mode (Click to Connect)';
    }
}

// ==============================================================================
// EVENT LISTENERS & FILTERING
// ==============================================================================

function setupEventListeners() {
    // Navigation items
    document.querySelectorAll('.nav-item[data-tab]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tab = btn.getAttribute('data-tab');
            switchTab(tab);
        });
    });

    // Global Search Input (Filter by names, companies, etc.)
    const searchInput = document.getElementById('global-search');
    const clearSearchBtn = document.getElementById('clear-search');

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        clearSearchBtn.classList.toggle('hidden', searchQuery.length === 0);
        renderCurrentView();
    });

    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.classList.add('hidden');
        renderCurrentView();
    });

    // Dropdown Filters
    const leadFilter = document.getElementById('filter-lead-status');
    if (leadFilter) leadFilter.addEventListener('change', () => renderLeadsTable());

    const accountFilter = document.getElementById('filter-account-status');
    if (accountFilter) accountFilter.addEventListener('change', () => renderAccountsTable());

    const dealFilter = document.getElementById('filter-deal-stage');
    if (dealFilter) dealFilter.addEventListener('change', () => renderDealsTable());

    // Settings Modal
    document.getElementById('btn-open-settings').addEventListener('click', () => openModal('settings-modal'));
    document.getElementById('connection-status').addEventListener('click', () => openModal('settings-modal'));
    document.getElementById('btn-close-settings').addEventListener('click', () => closeModal('settings-modal'));

    document.getElementById('btn-save-settings').addEventListener('click', () => {
        const url = document.getElementById('supabase-url').value.trim();
        const key = document.getElementById('supabase-key').value.trim();

        if (!key) {
            alert('Please enter your Supabase anon/public key.');
            return;
        }

        localStorage.setItem('supabase_url', url);
        localStorage.setItem('supabase_key', key);
        initSupabase(url, key);
        closeModal('settings-modal');
    });

    document.getElementById('btn-use-mock').addEventListener('click', () => {
        localStorage.removeItem('supabase_key');
        supabaseClient = null;
        updateConnectionStatus(false);
        closeModal('settings-modal');
        renderAllViews();
    });

    // New Lead Modal
    document.getElementById('btn-primary-action').addEventListener('click', () => openModal('new-lead-modal'));
    document.getElementById('btn-close-lead').addEventListener('click', () => closeModal('new-lead-modal'));
    document.getElementById('btn-cancel-lead').addEventListener('click', () => closeModal('new-lead-modal'));

    document.getElementById('form-new-lead').addEventListener('submit', async (e) => {
        e.preventDefault();
        const newLead = {
            id: 'lead-' + Date.now(),
            organization_id: 'a0000000-0000-0000-0000-000000000001',
            name: document.getElementById('lead-name').value.trim(),
            email: document.getElementById('lead-email').value.trim(),
            phone: document.getElementById('lead-phone').value.trim(),
            industry: document.getElementById('lead-industry').value.trim(),
            source: document.getElementById('lead-source').value,
            score: parseInt(document.getElementById('lead-score').value) || 50,
            status: 'new',
            created_at: new Date().toISOString()
        };

        if (supabaseClient) {
            try {
                const { error } = await supabaseClient.from('leads').insert([newLead]);
                if (error) console.error('Supabase insert error:', error);
                else await fetchLiveDataFromSupabase();
            } catch (err) {
                console.error(err);
            }
        } else {
            dbData.leads.unshift(newLead);
            renderAllViews();
        }

        closeModal('new-lead-modal');
        document.getElementById('form-new-lead').reset();
    });
}

// ==============================================================================
// NAVIGATION & VIEW SWITCHER
// ==============================================================================

function switchTab(tabName) {
    currentTab = tabName;

    // Update nav item active states
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });

    // Update content views
    document.querySelectorAll('.content-view').forEach(view => {
        view.classList.toggle('active', view.id === `view-${tabName}`);
    });

    // Update Titles
    const titles = {
        dashboard: { title: 'Sales Dashboard', subtitle: 'Overview of leads, accounts, pipeline revenue and performance' },
        leads: { title: 'Leads & Signals', subtitle: 'Search, filter, and track prospective buyer signals' },
        accounts: { title: 'Accounts Directory', subtitle: 'Manage organizations and enterprise clients' },
        contacts: { title: 'Key Contacts', subtitle: 'Decision makers and customer points of contact' },
        deals: { title: 'Deals & Opportunities', subtitle: 'Track stage progression and revenue forecast' },
        invoices: { title: 'Invoices & Billing', subtitle: 'Issued invoices, payments and transaction records' },
        activities: { title: 'Sales Activities', subtitle: 'Scheduled calls, demos, and follow-ups' }
    };

    const currentInfo = titles[tabName] || titles.dashboard;
    document.getElementById('page-title').textContent = currentInfo.title;
    document.getElementById('page-subtitle').textContent = currentInfo.subtitle;

    renderCurrentView();
    initLucide();
}

function renderCurrentView() {
    switch (currentTab) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'leads':
            renderLeadsTable();
            break;
        case 'accounts':
            renderAccountsTable();
            break;
        case 'contacts':
            renderContactsTable();
            break;
        case 'deals':
            renderDealsTable();
            break;
        case 'invoices':
            renderInvoicesTable();
            break;
        case 'activities':
            renderActivitiesTable();
            break;
    }
}

function renderAllViews() {
    updateKPIs();
    renderDashboard();
    renderLeadsTable();
    renderAccountsTable();
    renderContactsTable();
    renderDealsTable();
    renderInvoicesTable();
    renderActivitiesTable();
    updatePills();
    initLucide();
}

// ==============================================================================
// RENDERING FUNCTIONS WITH LIVE FILTERING
// ==============================================================================

function updateKPIs() {
    const totalPipeline = dbData.deals.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
    const qualifiedLeads = dbData.leads.filter(l => l.status === 'qualified').length || dbData.leads.length;
    const totalAccounts = dbData.accounts.length;
    const totalBilled = dbData.invoices.reduce((sum, inv) => sum + (parseFloat(inv.total_amount) || 0), 0);

    document.getElementById('kpi-pipeline').textContent = `$${totalPipeline.toLocaleString()}`;
    document.getElementById('kpi-leads').textContent = qualifiedLeads;
    document.getElementById('kpi-accounts').textContent = totalAccounts;
    document.getElementById('kpi-invoices').textContent = `$${totalBilled.toLocaleString()}`;
}

function updatePills() {
    document.getElementById('leads-count').textContent = dbData.leads.length;
    document.getElementById('accounts-count').textContent = dbData.accounts.length;
    document.getElementById('contacts-count').textContent = dbData.contacts.length;
    document.getElementById('deals-count').textContent = dbData.deals.length;
    document.getElementById('invoices-count').textContent = dbData.invoices.length;
}

// Render Dashboard View (Supports Instant Search Filtering)
function renderDashboard() {
    const leadsTbody = document.querySelector('#dashboard-leads-table tbody');
    const filteredLeads = dbData.leads.filter(lead => {
        return !searchQuery ||
            (lead.name && lead.name.toLowerCase().includes(searchQuery)) ||
            (lead.email && lead.email.toLowerCase().includes(searchQuery)) ||
            (lead.industry && lead.industry.toLowerCase().includes(searchQuery)) ||
            (lead.source && lead.source.toLowerCase().includes(searchQuery));
    });

    if (filteredLeads.length === 0) {
        leadsTbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 20px;">No leads matching "${escapeHtml(searchQuery)}"</td></tr>`;
    } else {
        leadsTbody.innerHTML = filteredLeads.slice(0, 5).map(lead => `
            <tr>
                <td class="table-highlight">${escapeHtml(lead.name)}</td>
                <td>${escapeHtml(lead.industry || '—')}</td>
                <td><span class="badge-status ${lead.status}">${lead.status}</span></td>
                <td><span class="score-pill ${lead.score >= 70 ? 'high' : 'medium'}">${lead.score || 0}</span></td>
                <td>${escapeHtml(lead.source || 'Direct')}</td>
            </tr>
        `).join('');
    }

    const dealsTbody = document.querySelector('#dashboard-deals-table tbody');
    const filteredDeals = dbData.deals.filter(deal => {
        return !searchQuery ||
            (deal.name && deal.name.toLowerCase().includes(searchQuery)) ||
            (deal.stage && deal.stage.toLowerCase().includes(searchQuery));
    });

    if (filteredDeals.length === 0) {
        dealsTbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 20px;">No deals matching "${escapeHtml(searchQuery)}"</td></tr>`;
    } else {
        dealsTbody.innerHTML = filteredDeals.slice(0, 5).map(deal => `
            <tr>
                <td class="table-highlight">${escapeHtml(deal.name)}</td>
                <td><strong>$${(parseFloat(deal.amount) || 0).toLocaleString()}</strong></td>
                <td>${escapeHtml(deal.stage)}</td>
                <td><span class="badge-status ${deal.status}">${deal.status}</span></td>
            </tr>
        `).join('');
    }
}

// Render Leads Table with Search & Status Filter
function renderLeadsTable() {
    const tbody = document.querySelector('#leads-table tbody');
    const statusFilter = document.getElementById('filter-lead-status')?.value || 'all';

    const filtered = dbData.leads.filter(lead => {
        const matchesSearch = !searchQuery || 
            (lead.name && lead.name.toLowerCase().includes(searchQuery)) ||
            (lead.email && lead.email.toLowerCase().includes(searchQuery)) ||
            (lead.industry && lead.industry.toLowerCase().includes(searchQuery)) ||
            (lead.source && lead.source.toLowerCase().includes(searchQuery));

        const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    document.getElementById('leads-results-count').textContent = `Showing ${filtered.length} of ${dbData.leads.length} leads`;

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 32px;">No leads matching "${escapeHtml(searchQuery)}"</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(lead => `
        <tr>
            <td class="table-highlight">${escapeHtml(lead.name)}</td>
            <td>${escapeHtml(lead.email || '—')}</td>
            <td>${escapeHtml(lead.phone || '—')}</td>
            <td>${escapeHtml(lead.industry || '—')}</td>
            <td><span class="score-pill ${lead.score >= 70 ? 'high' : 'medium'}">${lead.score || 0}</span></td>
            <td><span class="badge-status ${lead.status}">${lead.status}</span></td>
            <td>${lead.created_at ? new Date(lead.created_at).toLocaleDateString() : 'Today'}</td>
            <td>
                <button class="btn btn-outline btn-sm" onclick="alert('Viewing lead details for ${escapeHtml(lead.name)}')">View</button>
            </td>
        </tr>
    `).join('');
}

// Render Accounts Table with Search & Filter
function renderAccountsTable() {
    const tbody = document.querySelector('#accounts-table tbody');
    const statusFilter = document.getElementById('filter-account-status')?.value || 'all';

    const filtered = dbData.accounts.filter(acc => {
        const matchesSearch = !searchQuery || 
            (acc.name && acc.name.toLowerCase().includes(searchQuery)) ||
            (acc.industry && acc.industry.toLowerCase().includes(searchQuery)) ||
            (acc.website && acc.website.toLowerCase().includes(searchQuery));

        const matchesStatus = statusFilter === 'all' || acc.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    document.getElementById('accounts-results-count').textContent = `Showing ${filtered.length} of ${dbData.accounts.length} accounts`;

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 32px;">No accounts found matching filter.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(acc => `
        <tr>
            <td class="table-highlight">${escapeHtml(acc.name)}</td>
            <td>${escapeHtml(acc.industry || '—')}</td>
            <td><a href="${escapeHtml(acc.website || '#')}" target="_blank" style="color: #818CF8; text-decoration: none;">${escapeHtml(acc.website || '—')}</a></td>
            <td>${escapeHtml(acc.phone || '—')}</td>
            <td>${escapeHtml(acc.address || '—')}</td>
            <td><span class="badge-status ${acc.status}">${acc.status}</span></td>
        </tr>
    `).join('');
}

// Render Contacts Table
function renderContactsTable() {
    const tbody = document.querySelector('#contacts-table tbody');
    const filtered = dbData.contacts.filter(c => {
        const fullName = `${c.first_name || ''} ${c.last_name || ''}`.toLowerCase();
        return !searchQuery ||
            fullName.includes(searchQuery) ||
            (c.email && c.email.toLowerCase().includes(searchQuery)) ||
            (c.title && c.title.toLowerCase().includes(searchQuery));
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 32px;">No contacts found.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(c => `
        <tr>
            <td class="table-highlight">${escapeHtml(c.first_name)} ${escapeHtml(c.last_name)}</td>
            <td>${escapeHtml(c.email || '—')}</td>
            <td>${escapeHtml(c.phone || '—')}</td>
            <td>${escapeHtml(c.title || '—')}</td>
            <td>${escapeHtml(c.department || '—')}</td>
        </tr>
    `).join('');
}

// Render Deals Table
function renderDealsTable() {
    const tbody = document.querySelector('#deals-table tbody');
    const stageFilter = document.getElementById('filter-deal-stage')?.value || 'all';

    const filtered = dbData.deals.filter(d => {
        const matchesSearch = !searchQuery || 
            (d.name && d.name.toLowerCase().includes(searchQuery)) ||
            (d.stage && d.stage.toLowerCase().includes(searchQuery));
        const matchesStage = stageFilter === 'all' || d.stage === stageFilter;
        return matchesSearch && matchesStage;
    });

    document.getElementById('deals-results-count').textContent = `Showing ${filtered.length} of ${dbData.deals.length} deals`;

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 32px;">No deals found.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(d => `
        <tr>
            <td class="table-highlight">${escapeHtml(d.name)}</td>
            <td><strong>$${(parseFloat(d.amount) || 0).toLocaleString()}</strong></td>
            <td>${escapeHtml(d.currency || 'USD')}</td>
            <td>${escapeHtml(d.stage)}</td>
            <td>${d.close_date || '—'}</td>
            <td><span class="badge-status ${d.status}">${d.status}</span></td>
        </tr>
    `).join('');
}

// Render Invoices Table
function renderInvoicesTable() {
    const tbody = document.querySelector('#invoices-table tbody');
    const filtered = dbData.invoices.filter(inv => {
        return !searchQuery ||
            (inv.invoice_number && inv.invoice_number.toLowerCase().includes(searchQuery)) ||
            (inv.status && inv.status.toLowerCase().includes(searchQuery));
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 32px;">No invoices found.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(inv => `
        <tr>
            <td class="table-highlight">${escapeHtml(inv.invoice_number)}</td>
            <td>${inv.issue_date || '—'}</td>
            <td>${inv.due_date || '—'}</td>
            <td><strong>$${(parseFloat(inv.total_amount) || 0).toLocaleString()}</strong></td>
            <td>${escapeHtml(inv.currency || 'USD')}</td>
            <td><span class="badge-status ${inv.status}">${inv.status}</span></td>
        </tr>
    `).join('');
}

// Render Activities Table
function renderActivitiesTable() {
    const tbody = document.querySelector('#activities-table tbody');
    const filtered = dbData.activities.filter(act => {
        return !searchQuery ||
            (act.subject && act.subject.toLowerCase().includes(searchQuery)) ||
            (act.type && act.type.toLowerCase().includes(searchQuery));
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 32px;">No activities found.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(act => `
        <tr>
            <td><strong>${escapeHtml(act.type)}</strong></td>
            <td class="table-highlight">${escapeHtml(act.subject)}</td>
            <td>${escapeHtml(act.description || '—')}</td>
            <td>${act.start_at || '—'}</td>
            <td><span class="badge-status ${act.status}">${act.status}</span></td>
            <td><span class="badge-status ${act.priority === 'high' ? 'new' : 'contacted'}">${act.priority}</span></td>
        </tr>
    `).join('');
}

// ==============================================================================
// MODAL HELPERS
// ==============================================================================

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('active');
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('active');
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
