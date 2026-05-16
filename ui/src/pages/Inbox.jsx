import React, { useState, useEffect } from 'react';
import { Shield, LayoutDashboard, Inbox as InboxIcon, Activity, AlertTriangle } from 'lucide-react';
import { api } from '../api/client';
import MessageComposer from '../components/MessageComposer';
import AlertsTable from '../components/AlertsTable';
import ReviewModal from '../components/ReviewModal';

const Inbox = () => {
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const fetchData = async () => {
    try {
      const [alertsRes, statsRes] = await Promise.all([
        api.getAlerts({ min_score: 60, limit: 100 }),
        api.getStats()
      ]);
      setAlerts(alertsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error("Data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Poll every 10 seconds for new alerts
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleMessageSent = (result) => {
    // If the new message was flagged, refresh the list
    if (result.risk_score >= 60) {
      fetchData();
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav style={{ 
        height: '64px', borderBottom: '1px solid var(--border)', padding: '0 32px', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: 'var(--bg-card)', position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '32px', height: '32px', borderRadius: '8px', 
            background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Shield size={20} color="#0a0e1a" />
          </div>
          <h1 style={{ fontSize: '20px', margin: 0, fontWeight: '800' }} className="premium-gradient-text">CipherPulse</h1>
        </div>

        <div style={{ display: 'flex', gap: '32px' }}>
          <a href="#" style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>
            <InboxIcon size={18} /> Inbox
          </a>
          <a href="http://localhost:8050" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '14px' }}>
            <LayoutDashboard size={18} /> Analytics <Activity size={12} style={{ marginLeft: '-4px' }} />
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', fontWeight: '600' }}>Compliance Officer</div>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>ID: 0x9212A</div>
          </div>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1e293b', border: '1px solid var(--border)' }}></div>
        </div>
      </nav>

      <main style={{ flex: 1, padding: '32px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        
        {/* Dashboard Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '8px' }}>TOTAL MESSAGES</div>
            <div style={{ fontSize: '24px', fontWeight: '700' }}>{stats?.total_messages || '—'}</div>
          </div>
          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ color: 'var(--accent-amber)', fontSize: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertTriangle size={12} /> ACTIVE ALERTS
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-amber)' }}>{stats?.total_alerts || '—'}</div>
          </div>
          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ color: 'var(--accent-red)', fontSize: '12px', marginBottom: '8px' }}>CRITICAL RISK</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-red)' }}>{stats?.high_risk_alerts || '—'}</div>
          </div>
          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ color: 'var(--accent-green)', fontSize: '12px', marginBottom: '8px' }}>REVIEWED RATE</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-green)' }}>
              {stats ? `${Math.round((stats.reviewed / Math.max(stats.total_alerts, 1)) * 100)}%` : '—'}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
          {/* Left Column: Simulator */}
          <div>
            <MessageComposer onMessageSent={handleMessageSent} />
            <div className="glass-card" style={{ padding: '24px' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Compliance Status</h4>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                System is monitoring 12 active channels across 5 regions. AI model <code style={{ color: 'var(--accent-cyan)' }}>v1-tfidf-lr</code> is active.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>System Health</span>
                  <span style={{ color: 'var(--accent-green)', fontSize: '12px' }}>● Optimal</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Avg Latency</span>
                  <span style={{ fontSize: '12px' }}>42ms</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>DB Status</span>
                  <span style={{ color: 'var(--accent-cyan)', fontSize: '12px' }}>Connected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Alerts */}
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '100px' }}>Loading alerts...</div>
            ) : (
              <AlertsTable alerts={alerts} onReview={setSelectedAlert} />
            )}
          </div>
        </div>
      </main>

      {selectedAlert && (
        <ReviewModal 
          alert={selectedAlert} 
          onClose={() => setSelectedAlert(null)} 
          onUpdate={fetchData}
        />
      )}
    </div>
  );
};

export default Inbox;
