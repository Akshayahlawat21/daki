import React, { useState } from 'react';
import { X, Plus, Check } from 'lucide-react';

export default function CreateRecordModal({ isOpen, onClose, defaultType = 'lead', onSaveRecord }) {
  const [recordType, setRecordType] = useState(defaultType);
  const [formData, setFormData] = useState({});

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveRecord(recordType, {
      ...formData,
      id: Date.now().toString(),
      created_at: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  const updateField = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Create New {recordType.charAt(0).toUpperCase() + recordType.slice(1)}</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Record Type Selector */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', backgroundColor: '#f8fafc', padding: '6px 16px', gap: '6px' }}>
          {['lead', 'account', 'opportunity', 'contact'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setRecordType(t); setFormData({}); }}
              style={{
                padding: '6px 12px',
                border: 'none',
                background: recordType === t ? 'white' : 'transparent',
                color: recordType === t ? 'var(--color-salesforce-blue)' : 'var(--text-muted)',
                fontWeight: 'bold',
                borderRadius: '4px',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {recordType === 'lead' && (
              <>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. John Doe"
                    onChange={(e) => updateField('name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Company Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Acme Corp"
                    onChange={(e) => updateField('company', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="john@acme.com"
                    onChange={(e) => updateField('email', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Industry</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="SaaS, FinTech, Healthcare..."
                    onChange={(e) => updateField('industry', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Lead Score (0 - 100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    defaultValue="85"
                    className="form-input"
                    onChange={(e) => updateField('score', parseInt(e.target.value) || 85)}
                  />
                </div>
              </>
            )}

            {recordType === 'account' && (
              <>
                <div className="form-group">
                  <label className="form-label">Account / Company Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Global Tech Enterprise"
                    onChange={(e) => updateField('name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Industry</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Information Technology, Retail..."
                    onChange={(e) => updateField('industry', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Website URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://example.com"
                    onChange={(e) => updateField('website', e.target.value)}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Account Tier</label>
                    <select 
                      className="form-input"
                      onChange={(e) => updateField('tier', e.target.value)}
                      defaultValue="Enterprise"
                    >
                      <option value="Enterprise">Enterprise</option>
                      <option value="Mid-Market">Mid-Market</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Growth Business">Growth Business</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Account Health</label>
                    <select 
                      className="form-input"
                      onChange={(e) => updateField('health', e.target.value)}
                      defaultValue="High"
                    >
                      <option value="High">High Health</option>
                      <option value="Medium">Medium Health</option>
                      <option value="Low">At Risk</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Annual Revenue Estimate</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. $120M or 120000000"
                    onChange={(e) => updateField('annualRevenue', e.target.value)}
                  />
                </div>
              </>
            )}

            {recordType === 'opportunity' && (
              <>
                <div className="form-group">
                  <label className="form-label">Opportunity Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Cloud Migration Phase 1"
                    onChange={(e) => updateField('name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Associated Account *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Tech Horizon Inc"
                    onChange={(e) => updateField('accountName', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Deal Amount ($ USD) *</label>
                  <input
                    type="number"
                    required
                    className="form-input"
                    placeholder="75000"
                    onChange={(e) => updateField('amount', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Stage</label>
                  <select 
                    className="form-input"
                    onChange={(e) => updateField('stage', e.target.value)}
                    defaultValue="Proposal"
                  >
                    <option value="Prospecting">Prospecting</option>
                    <option value="Qualification">Qualification</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Closing">Closing</option>
                    <option value="Closed Won">Closed Won</option>
                  </select>
                </div>
              </>
            )}

            {recordType === 'contact' && (
              <>
                <div className="form-group">
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="Jane"
                    onChange={(e) => updateField('firstName', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="Doe"
                    onChange={(e) => updateField('lastName', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Job Title</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="VP of Engineering"
                    onChange={(e) => updateField('title', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Account / Company</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Acme Inc"
                    onChange={(e) => updateField('accountName', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="jane@example.com"
                    onChange={(e) => updateField('email', e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-salesforce btn-salesforce-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-salesforce btn-salesforce-primary">
              <Plus size={14} />
              <span>Create Record</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
