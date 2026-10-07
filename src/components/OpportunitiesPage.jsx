import React, { useState } from 'react';
import { 
  Briefcase, 
  Kanban, 
  List, 
  Plus, 
  DollarSign, 
  Calendar, 
  User, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STAGES = [
  'Prospecting',
  'Qualification',
  'Proposal',
  'Negotiation',
  'Closing',
  'Closed Won'
];

export default function OpportunitiesPage({ opportunities, onUpdateOpportunityStage, onOpenNewRecord }) {
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'list'
  const [stageFilter, setStageFilter] = useState('all');

  const handleStageChange = (opportunityId, newStage) => {
    onUpdateOpportunityStage(opportunityId, newStage);
    if (newStage === 'Closed Won') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const totalPipelineAmount = opportunities.reduce((sum, opp) => sum + (opp.amount || 0), 0);
  const weightedPipelineAmount = opportunities.reduce((sum, opp) => sum + ((opp.amount || 0) * (opp.probability || 0) / 100), 0);

  const filteredOpportunities = opportunities.filter(opp => {
    return stageFilter === 'all' || opp.stage === stageFilter;
  });

  return (
    <div className="opportunities-page-view">
      {/* Header Toolbar */}
      <div className="view-action-header">
        <div className="view-title-group">
          <h1>Opportunities & Sales Pipeline</h1>
          <p>
            Total Pipeline: <strong>${totalPipelineAmount.toLocaleString()}</strong> • Weighted: <strong>${Math.round(weightedPipelineAmount).toLocaleString()}</strong>
          </p>
        </div>

        <div className="action-button-group">
          {/* View Mode Toggle */}
          <div style={{ display: 'flex', background: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', overflow: 'hidden' }}>
            <button
              onClick={() => setViewMode('kanban')}
              style={{
                padding: '6px 12px',
                border: 'none',
                background: viewMode === 'kanban' ? 'var(--color-salesforce-light)' : 'white',
                color: viewMode === 'kanban' ? 'var(--color-salesforce-blue)' : 'var(--text-secondary)',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Kanban size={15} /> Kanban
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '6px 12px',
                border: 'none',
                background: viewMode === 'list' ? 'var(--color-salesforce-light)' : 'white',
                color: viewMode === 'list' ? 'var(--color-salesforce-blue)' : 'var(--text-secondary)',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <List size={15} /> List
            </button>
          </div>

          <button 
            className="btn-salesforce btn-salesforce-primary"
            onClick={() => onOpenNewRecord('opportunity')}
          >
            <Plus size={16} />
            <span>New Opportunity</span>
          </button>
        </div>
      </div>

      {/* Kanban View Mode */}
      {viewMode === 'kanban' ? (
        <div className="kanban-board-container">
          {STAGES.map((stageName) => {
            const stageDeals = opportunities.filter(o => o.stage === stageName);
            const stageTotal = stageDeals.reduce((sum, d) => sum + (d.amount || 0), 0);

            return (
              <div key={stageName} className="kanban-column">
                <div className="kanban-column-header">
                  <div>
                    <div className="kanban-column-title">{stageName}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      ${stageTotal.toLocaleString()} • {stageDeals.length} deals
                    </div>
                  </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                  {stageDeals.length === 0 ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '13px', fontStyle: 'italic' }}>
                      No deals in {stageName}
                    </div>
                  ) : (
                    stageDeals.map((deal) => (
                      <div key={deal.id} className="kanban-card">
                        <div className="kanban-card-title">{deal.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                          {deal.accountName}
                        </div>
                        <div className="kanban-card-amount">
                          ${(deal.amount || 0).toLocaleString()}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', borderTop: '1px solid #f1f5f9', paddingTop: '6px', marginTop: '6px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <User size={12} /> {deal.owner}
                          </span>
                          <span style={{ fontWeight: 'bold', color: 'var(--color-salesforce-blue)' }}>
                            {deal.probability}% Win
                          </span>
                        </div>

                        {/* Quick Stage Mover Selector */}
                        <div style={{ marginTop: '8px' }}>
                          <select 
                            value={deal.stage}
                            onChange={(e) => handleStageChange(deal.id, e.target.value)}
                            style={{ width: '100%', padding: '4px 6px', fontSize: '12px', borderRadius: '4px', border: '1px solid var(--border-color)', outline: 'none', background: '#f8fafc' }}
                          >
                            {STAGES.map(s => (
                              <option key={s} value={s}>Move to: {s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View Mode */
        <div className="data-table-card">
          <table className="crm-standard-table">
            <thead>
              <tr>
                <th>Opportunity Name</th>
                <th>Account</th>
                <th>Amount</th>
                <th>Stage</th>
                <th>Probability</th>
                <th>Close Date</th>
                <th>Owner</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOpportunities.map((deal) => (
                <tr key={deal.id}>
                  <td style={{ fontWeight: '700', color: 'var(--color-salesforce-dark)' }}>{deal.name}</td>
                  <td>{deal.accountName}</td>
                  <td style={{ color: 'var(--color-salesforce-green)', fontWeight: '700' }}>
                    ${(deal.amount || 0).toLocaleString()}
                  </td>
                  <td>
                    <span className={`badge-pill ${deal.stage === 'Closed Won' ? 'badge-green' : deal.stage === 'Closing' ? 'badge-purple' : 'badge-blue'}`}>
                      {deal.stage}
                    </span>
                  </td>
                  <td>{deal.probability}%</td>
                  <td>{deal.closeDate}</td>
                  <td>{deal.owner}</td>
                  <td>
                    <select
                      value={deal.stage}
                      onChange={(e) => handleStageChange(deal.id, e.target.value)}
                      style={{ padding: '3px 8px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '12px' }}
                    >
                      {STAGES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
