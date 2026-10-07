import React, { useState } from 'react';
import { mobileJourneys } from '../mockData';
import { X, ChevronRight, Calendar, Mail, Megaphone, MapPin, MoreHorizontal, Wifi, Battery } from 'lucide-react';

export default function MobileJourneysModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('Running');

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="phone-companion-frame" 
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
      >
        {/* Status Bar */}
        <div className="phone-header-notch">
          <span>•••• AT&T</span>
          <span>11:20 PM</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            53% <Battery size={13} />
          </span>
        </div>

        {/* App Title Header */}
        <div style={{ backgroundColor: '#2d3748', color: 'white', padding: '10px 16px', textAlign: 'center', position: 'relative' }}>
          <button 
            onClick={onClose}
            style={{ position: 'absolute', right: '12px', top: '10px', background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
          <div style={{ fontWeight: 'bold', fontSize: '15px' }}>Journeys</div>
          <div style={{ fontSize: '11px', color: '#a0aec0' }}>Northern Trail Outfitters</div>
        </div>

        {/* Tab Pills */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', padding: '8px 12px', gap: '6px' }}>
          {['Running', 'Stopped', 'Drafts'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              style={{
                flex: 1,
                padding: '4px 0',
                border: activeTab === t ? '1px solid #e87b1c' : '1px solid #cbd5e1',
                borderRadius: '4px',
                background: activeTab === t ? '#fffaf0' : 'white',
                color: activeTab === t ? '#e87b1c' : '#718096',
                fontWeight: 'bold',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Journey Cards List */}
        <div style={{ height: '360px', overflowY: 'auto', backgroundColor: '#ffffff', padding: '0 12px' }}>
          {mobileJourneys.map((j) => (
            <div key={j.id} style={{ padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#1a202c' }}>
                  {j.title} <span style={{ color: '#718096', fontSize: '11px', fontWeight: 'normal' }}>{j.version}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: '#718096' }}>
                  <span>{j.date}</span>
                  <ChevronRight size={14} />
                </div>
              </div>

              {/* Progress Goal Bar */}
              <div style={{ width: '100%', height: '6px', backgroundColor: '#edf2f7', borderRadius: '3px', margin: '8px 0', overflow: 'hidden' }}>
                <div style={{ width: j.metGoal, height: '100%', backgroundColor: '#2bd0d0' }}></div>
              </div>

              {/* Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '11px', color: '#718096' }}>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#1a202c', fontSize: '13px' }}>{j.totalEntries.toLocaleString()}</div>
                  <div>TOTAL ENTRIES</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', color: '#1a202c', fontSize: '13px' }}>{j.goal}</div>
                  <div>GOAL</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 'bold', color: '#2bd0d0', fontSize: '13px' }}>{j.metGoal}</div>
                  <div>MET GOAL</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Phone Bottom Nav Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px 0', borderTop: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
          <div style={{ textAlign: 'center', color: '#a0aec0', fontSize: '10px' }}>
            <Calendar size={16} />
            <div>Calendar</div>
          </div>
          <div style={{ textAlign: 'center', color: '#a0aec0', fontSize: '10px' }}>
            <Mail size={16} />
            <div>Email</div>
          </div>
          <div style={{ textAlign: 'center', color: '#a0aec0', fontSize: '10px' }}>
            <Megaphone size={16} />
            <div>Campaigns</div>
          </div>
          <div style={{ textAlign: 'center', color: '#e87b1c', fontSize: '10px', fontWeight: 'bold' }}>
            <MapPin size={16} />
            <div>Journeys</div>
          </div>
          <div style={{ textAlign: 'center', color: '#a0aec0', fontSize: '10px' }}>
            <MoreHorizontal size={16} />
            <div>More</div>
          </div>
        </div>
      </div>
    </div>
  );
}
