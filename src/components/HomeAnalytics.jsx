import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download, 
  Filter, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Activity, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function HomeAnalytics({ analyticsData, onNavigateTab }) {
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [timeRange, setTimeRange] = useState('quarter');
  const [hoveredBar, setHoveredBar] = useState(null);

  const { kpis, segments, monthlyComparison, salesEvolution } = analyticsData;

  // Calculate SVG Donut Paths for Deals by Segment
  const totalCount = segments.reduce((sum, s) => sum + s.count, 0);
  let accumulatedAngle = 0;
  
  const donutSlices = segments.map((seg) => {
    const sliceAngle = (seg.count / totalCount) * 360;
    const startAngle = accumulatedAngle;
    const endAngle = accumulatedAngle + sliceAngle;
    accumulatedAngle = endAngle;

    // Convert polar coordinates to cartesian for SVG arc
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;

    const outerRadius = 75;
    const innerRadius = 50;
    const cx = 85;
    const cy = 85;

    const x1 = cx + outerRadius * Math.cos(startRad);
    const y1 = cy + outerRadius * Math.sin(startRad);
    const x2 = cx + outerRadius * Math.cos(endRad);
    const y2 = cy + outerRadius * Math.sin(endRad);

    const x3 = cx + innerRadius * Math.cos(endRad);
    const y3 = cy + innerRadius * Math.sin(endRad);
    const x4 = cx + innerRadius * Math.cos(startRad);
    const y4 = cy + innerRadius * Math.sin(startRad);

    const largeArc = sliceAngle > 180 ? 1 : 0;

    const pathData = `
      M ${x1} ${y1}
      A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
      Z
    `;

    return {
      ...seg,
      pathData,
      startAngle,
      endAngle,
      sliceAngle
    };
  });

  return (
    <div className="home-analytics-page">
      {/* Subheader Toolbar */}
      <div className="view-action-header">
        <div className="view-title-group">
          <h1>Executive Sales & Pipeline Analytics</h1>
          <p>Wave Performance Dashboard • Overall Enterprise CRM Metrics</p>
        </div>

        <div className="action-button-group">
          {/* Time Range Filter Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
            <Calendar size={15} color="#64748b" />
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              style={{ border: 'none', background: 'transparent', fontWeight: '700', outline: 'none', fontSize: '13px' }}
            >
              <option value="quarter">Current Quarter (Q4 2026)</option>
              <option value="ytd">Year to Date (2026)</option>
              <option value="month">Current Month (October)</option>
              <option value="all">All Time History</option>
            </select>
          </div>

          <button 
            className="btn-salesforce btn-salesforce-outline"
            onClick={() => onNavigateTab('opportunities')}
          >
            <span>View Opportunities</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Main Wave 3-Column Analytics Grid */}
      <div className="analytics-grid-layout">
        
        {/* ====================================================================
            COLUMN 1: Left KPI Cards (Closed Quarter, Avg Deal Age, Closed Month, Activities)
           ==================================================================== */}
        <div className="kpi-cards-column">
          {/* Card 1: Closed this Quarter */}
          <div className="analytics-card kpi-card">
            <div className="kpi-card-title">Closed this Quarter</div>
            <div className="kpi-card-value">{kpis.closedQuarter}</div>
            <div className="kpi-card-footer">
              <span className="kpi-badge-growth">
                <TrendingUp size={14} /> {kpis.quarterGrowth}
              </span>
              <span>vs {kpis.quarterTarget} target</span>
            </div>
          </div>

          {/* Card 2: Average Deal Age */}
          <div className="analytics-card kpi-card">
            <div className="kpi-card-title">Average Deal Age</div>
            <div className="kpi-card-value">{kpis.averageDealAge}</div>
            <div className="kpi-card-footer">
              <span className="kpi-badge-growth">
                <Clock size={14} /> {kpis.dealAgeTrend}
              </span>
              <span>cycle efficiency</span>
            </div>
          </div>

          {/* Card 3: Closed this Month */}
          <div className="analytics-card kpi-card">
            <div className="kpi-card-title">Closed this Month</div>
            <div className="kpi-card-value">{kpis.closedMonth}</div>
            <div className="kpi-card-footer">
              <span className="kpi-badge-growth">
                <TrendingUp size={14} /> {kpis.monthGrowth}
              </span>
              <span>MoM revenue run-rate</span>
            </div>
          </div>

          {/* Card 4: Completed Activities */}
          <div className="analytics-card kpi-card">
            <div className="kpi-card-title">Completed Activities</div>
            <div className="kpi-card-value">{kpis.completedActivities}</div>
            <div className="kpi-card-footer">
              <span className="kpi-badge-growth">
                <Activity size={14} /> {kpis.activitiesGrowth}
              </span>
              <span>vs {kpis.activitiesGoal}</span>
            </div>
          </div>
        </div>

        {/* ====================================================================
            COLUMN 2 & 3: Middle & Right Widgets
           ==================================================================== */}
        
        {/* Widget 1: Deals by Segment (Donut Chart) */}
        <div className="analytics-card">
          <div className="card-header-bar">
            <span className="card-title">Deals by Segment</span>
            <span className="card-actions-hint">Total 2.9k Deals</span>
          </div>

          <div className="donut-chart-container">
            {/* Interactive SVG Donut */}
            <div className="donut-svg-wrapper">
              <svg viewBox="0 0 170 170" width="170" height="170">
                {donutSlices.map((slice) => (
                  <path
                    key={slice.id}
                    d={slice.pathData}
                    fill={slice.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      opacity: selectedSegment && selectedSegment !== slice.id ? 0.4 : 1,
                      transformOrigin: '85px 85px',
                      transform: selectedSegment === slice.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                    onClick={() => setSelectedSegment(selectedSegment === slice.id ? null : slice.id)}
                  >
                    <title>{`${slice.label}: ${slice.count} deals (${slice.percentage}%)`}</title>
                  </path>
                ))}
              </svg>
              {/* Donut Center Display */}
              <div className="donut-center-label">
                <div className="donut-center-val">2.9K</div>
                <div className="donut-center-sub">
                  {selectedSegment 
                    ? segments.find(s => s.id === selectedSegment)?.name 
                    : 'Segment Deals'}
                </div>
              </div>
            </div>

            {/* Segment Legend */}
            <div className="donut-legend-list">
              {segments.map((seg) => (
                <div 
                  key={seg.id} 
                  className="donut-legend-item"
                  style={{
                    backgroundColor: selectedSegment === seg.id ? '#f1f5f9' : 'transparent',
                    fontWeight: selectedSegment === seg.id ? 'bold' : 'normal'
                  }}
                  onClick={() => setSelectedSegment(selectedSegment === seg.id ? null : seg.id)}
                >
                  <span className="legend-color-dot" style={{ backgroundColor: seg.color }}></span>
                  <span className="legend-text-label">{seg.name}</span>
                  <span className="legend-val-label">{seg.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Widget 2: Monthly Sales Comparison (Bar Chart) */}
        <div className="analytics-card">
          <div className="card-header-bar">
            <span className="card-title">Monthly sales comparison</span>
            <div style={{ display: 'flex', gap: '10px', fontSize: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#00a4e4', borderRadius: '2px' }}></span> Target
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#2bd0d0', borderRadius: '2px' }}></span> Actual
              </span>
            </div>
          </div>

          <div className="bar-chart-container">
            <div className="bars-group-row">
              {monthlyComparison.map((item) => (
                <div key={item.year} className="bar-group-wrapper" style={{ textAlign: 'center' }}>
                  <div className="bar-pair">
                    {/* Target Bar */}
                    <div 
                      className="single-bar target" 
                      style={{ height: `${(item.target / 850) * 100}%` }}
                      title={`${item.year} Target: $${item.target}k`}
                    ></div>
                    {/* Actual Bar */}
                    <div 
                      className="single-bar actual" 
                      style={{ height: `${(item.actual / 850) * 100}%` }}
                      title={`${item.year} Actual: $${item.actual}k`}
                    ></div>
                  </div>
                  <div className="bar-label-year">{item.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Widget 3: Month on Month Sales Evolution (Data Matrix Table) */}
        <div className="analytics-card">
          <div className="card-header-bar">
            <span className="card-title">Month on month sales evolution</span>
            <span className="card-actions-hint">Velocity Track</span>
          </div>

          <div style={{ maxHeight: '230px', overflowY: 'auto' }}>
            <table className="evolution-table">
              <thead>
                <tr>
                  <th>CLOSE DATE</th>
                  <th style={{ textAlign: 'right' }}>EVOLUTION</th>
                  <th style={{ textAlign: 'right' }}>VOLUME</th>
                </tr>
              </thead>
              <tbody>
                {salesEvolution.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: '600' }}>{row.date}</td>
                    <td style={{ textAlign: 'right' }}>
                      <span className={row.trend === 'up' ? 'evolution-val-positive' : 'evolution-val-negative'}>
                        {row.evolution}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>
                      {row.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Widget 4: Daily Sales Comparison / Growth Trajectory (Area Multi-curve Chart) */}
        <div className="analytics-card">
          <div className="card-header-bar">
            <span className="card-title">Daily sales comparison</span>
            <span className="card-actions-hint">Cumulative $M Trajectory</span>
          </div>

          <div className="growth-area-chart-container">
            <svg viewBox="0 0 400 160" className="svg-growth-chart">
              <defs>
                <linearGradient id="growthGradientOrange" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e87b1c" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#e87b1c" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="growthGradientBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00a4e4" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00a4e4" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="20" y1="30" x2="380" y2="30" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="20" y1="70" x2="380" y2="70" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="20" y1="110" x2="380" y2="110" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="20" y1="150" x2="380" y2="150" stroke="#cbd5e1" />

              {/* Axis Label */}
              <text x="5" y="35" fontSize="10" fill="#94a3b8" fontWeight="bold">$5M</text>
              <text x="5" y="90" fontSize="10" fill="#94a3b8" fontWeight="bold">$2.5M</text>
              <text x="5" y="150" fontSize="10" fill="#94a3b8" fontWeight="bold">$0</text>

              {/* Benchmark Target Line */}
              <line x1="20" y1="70" x2="380" y2="70" stroke="#e6b800" strokeWidth="2" strokeDasharray="5 4" />

              {/* Main Area Fill (Orange trajectory) */}
              <path
                d="M 20 150 L 25 148 L 40 145 L 80 140 L 120 135 L 160 120 L 200 100 L 240 80 L 280 65 L 320 45 L 360 30 L 380 20 L 380 150 Z"
                fill="url(#growthGradientOrange)"
              />

              {/* Main Smooth Line (Orange trajectory) */}
              <path
                d="M 20 150 Q 100 145 160 120 T 260 70 T 380 20"
                fill="none"
                stroke="#e87b1c"
                strokeWidth="2.5"
              />

              {/* Secondary Baseline (Blue trajectory) */}
              <path
                d="M 20 150 Q 120 148 200 130 T 380 95"
                fill="none"
                stroke="#00a4e4"
                strokeWidth="2"
              />

              {/* Key Milestone Nodes */}
              <circle cx="160" cy="120" r="4" fill="#e87b1c" stroke="#fff" strokeWidth="1.5" />
              <circle cx="260" cy="70" r="4" fill="#e87b1c" stroke="#fff" strokeWidth="1.5" />
              <circle cx="380" cy="20" r="5" fill="#e87b1c" stroke="#fff" strokeWidth="2" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
