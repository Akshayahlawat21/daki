import React from 'react';
import { initialSalesReps } from '../mockData';
import { Trophy, Target, TrendingUp, Award, CheckCircle, BarChart2 } from 'lucide-react';

export default function WaveRepPage({ mode = 'rep' }) {
  const titles = {
    'wave-rep': { title: 'Wave for Sales Rep', desc: 'Individual Rep Quota Attainment & Pipeline Health' },
    'wave-mgr': { title: 'Wave for Sales Manager', desc: 'Team Performance, Quota Rollups, and Win Rates' },
    'wave-ops': { title: 'Wave for Sales Ops', desc: 'Pipeline Velocity, Stage Conversion Ratios, and Forecast Accuracy' },
    'dashboards': { title: 'Executive Dashboards', desc: 'Global Sales Intelligence & Performance Hub' }
  };

  const currentInfo = titles[mode] || titles['wave-rep'];

  return (
    <div className="wave-rep-page-view">
      {/* Header Toolbar */}
      <div className="view-action-header">
        <div className="view-title-group">
          <h1>{currentInfo.title}</h1>
          <p>{currentInfo.desc}</p>
        </div>
      </div>

      {/* Leaderboard Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginBottom: '24px' }}>
        {initialSalesReps.map((rep, index) => (
          <div key={rep.id} className="analytics-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: index === 0 ? '#fef3c7' : '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: index === 0 ? '#b45309' : '#0284c7', fontWeight: 'bold' }}>
                  {index === 0 ? <Trophy size={18} /> : rep.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '16px', color: 'var(--color-salesforce-dark)' }}>{rep.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{rep.role}</div>
                </div>
              </div>
              <span className={`badge-pill ${rep.percentage >= 90 ? 'badge-green' : 'badge-blue'}`}>
                {rep.percentage}% Quota
              </span>
            </div>

            {/* Quota Progress Bar */}
            <div style={{ margin: '14px 0 8px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
                <span>${(rep.achieved / 1000).toFixed(0)}k Achieved</span>
                <span style={{ color: 'var(--text-muted)' }}>${(rep.quota / 1000).toFixed(0)}k Target</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    width: `${Math.min(rep.percentage, 100)}%`, 
                    height: '100%', 
                    background: 'linear-gradient(90deg, #00a4e4, #10b981)',
                    borderRadius: '4px'
                  }}
                ></div>
              </div>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '10px', marginTop: '10px', fontSize: '13px' }}>
              <span>Deals Won: <strong>{rep.dealsWon}</strong></span>
              <span>Win Rate: <strong style={{ color: 'var(--color-salesforce-green)' }}>{rep.winRate}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
