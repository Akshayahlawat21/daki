import React from 'react';
import { 
  Cloud, 
  Grid, 
  Search, 
  Plus, 
  Smartphone, 
  Database, 
  ChevronDown, 
  Bell, 
  Settings, 
  User,
  LayoutDashboard,
  Building2,
  Briefcase,
  UserPlus,
  Users,
  Receipt,
  BarChart3,
  TrendingUp,
  Layers
} from 'lucide-react';

export default function HeaderNavbar({ 
  activeTab, 
  setActiveTab, 
  searchTerm, 
  setSearchTerm, 
  onOpenNewRecord, 
  onOpenSupabaseConfig, 
  onToggleMobileJourneys, 
  isConnectedToSupabase,
  supabaseUrl
}) {
  const navTabs = [
    { id: 'home', label: 'Home', icon: LayoutDashboard, isDropdown: false },
    { id: 'accounts', label: 'Accounts', icon: Building2, isDropdown: true },
    { id: 'opportunities', label: 'Opportunities', icon: Briefcase, isDropdown: true },
    { id: 'leads', label: 'Leads & Signals', icon: UserPlus, isDropdown: true },
    { id: 'contacts', label: 'Contacts', icon: Users, isDropdown: false },
    { id: 'invoices', label: 'Invoices', icon: Receipt, isDropdown: false },
    { id: 'wave-rep', label: 'Wave for Sales Rep', icon: TrendingUp, isDropdown: false },
    { id: 'wave-mgr', label: 'Wave for Sales Mgr', icon: BarChart3, isDropdown: false },
    { id: 'wave-ops', label: 'Wave for Sales Ops', icon: Layers, isDropdown: false },
    { id: 'dashboards', label: 'Dashboards', icon: LayoutDashboard, isDropdown: true },
  ];

  return (
    <header className="salesforce-header">
      {/* Top Application Bar */}
      <div className="top-bar-row">
        <div className="brand-section">
          {/* 9-Dot App Launcher */}
          <button className="app-launcher-btn" title="App Launcher">
            <Grid size={18} color="#0070d2" />
            <span className="app-badge-title">Sales</span>
          </button>

          {/* Salesforce Cloud Logo */}
          <div className="salesforce-cloud-logo" title="Salesforce Wave Platform">
            <Cloud size={24} fill="currentColor" />
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="header-search-bar">
          <Search size={16} className="search-icon-inside" />
          <input
            type="text"
            className="search-input-field"
            placeholder="Search Salesforce CRM (deals, accounts, leads, contacts)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Top Right Action Tools */}
        <div className="top-bar-actions">
          {/* Supabase Connection Status Pill */}
          <div 
            className={`supabase-status-pill ${!isConnectedToSupabase ? 'disconnected' : ''}`}
            onClick={onOpenSupabaseConfig}
            title="Click to configure Supabase Connection"
          >
            <span className="status-live-dot"></span>
            <span>{isConnectedToSupabase ? 'Supabase Live' : 'Demo Mode (Click to Connect)'}</span>
          </div>

          {/* Mobile Companion Toggle */}
          <button 
            className="action-icon-btn" 
            title="Preview Mobile Journey Companion (from Screenshot)"
            onClick={onToggleMobileJourneys}
          >
            <Smartphone size={18} />
          </button>

          {/* Quick Create New Record Button */}
          <button 
            className="btn-salesforce btn-salesforce-primary"
            onClick={onOpenNewRecord}
          >
            <Plus size={16} />
            <span>New Record</span>
          </button>

          {/* User Profile Avatar */}
          <div className="action-icon-btn" title="Alex Johnson (System Admin)">
            <User size={18} />
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation Bar */}
      <nav className="tabs-navigation-bar">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`nav-tab-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.isDropdown && <ChevronDown size={12} className="nav-tab-dropdown-arrow" />}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
