import React, { useState, useEffect } from 'react';
import { Briefcase, BarChart2, Folder, Activity, AlertCircle, FileText, Flag, CheckCircle } from 'lucide-react';
import { api } from '../api/client';
import MessageComposer from '../components/MessageComposer';
import AlertsTable from '../components/AlertsTable';
import ReviewModal from '../components/ReviewModal';
import Sidebar from '../components/Sidebar';

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
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
      <Sidebar />

      <main style={{ flex: 1, padding: '40px', overflowY: 'auto', color: '#1e293b' }}>
        {/* Header bar */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 4px 0', letterSpacing: '-0.5px', color: '#0f172a' }}>Review Inbox</h1>
            <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>Review real-time compliance violations, filter active alerts, and run manual audits</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>Compliance Officer</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>ID: 0x9212A</div>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#0f172a' }}>CO</span>
            </div>
          </div>
        </div>

        {/* Dashboard Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ color: '#475569', fontSize: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}><FileText size={14}/> Total Surveyed</div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>{stats?.total_messages || '—'}</div>
          </div>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', borderLeft: '4px solid #f59e0b', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ color: '#b45309', fontSize: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <AlertCircle size={14} /> Alerts Found
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>{stats?.total_alerts || '—'}</div>
          </div>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', borderLeft: '4px solid #ef4444', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ color: '#b91c1c', fontSize: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
               <Flag size={14} /> High Risk Violations
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>{stats?.high_risk_alerts || '—'}</div>
          </div>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', borderLeft: '4px solid #10b981', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ color: '#047857', fontSize: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
               <CheckCircle size={14} /> Clearance Rate
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>
              {stats ? `${Math.round((stats.reviewed / Math.max(stats.total_alerts, 1)) * 100)}%` : '—'}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
          {/* Left Column: Simulator */}
          <div>
            <MessageComposer onMessageSent={handleMessageSent} />
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', marginTop: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Compliance Monitor Status</h4>
              <div style={{ fontSize: '13px', color: '#475569', marginBottom: '20px', lineHeight: '1.5' }}>
                System is actively scanning enterprise communications across 12 channels. ML scoring is performed securely inside enclaves.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#475569' }}>Surveillance Engine:</span>
                  <span style={{ color: '#10b981', fontWeight: '600' }}>● Optimal Active</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#475569' }}>Avg Inference Latency:</span>
                  <span style={{ fontWeight: '600', color: '#0f172a' }}>42ms</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#475569' }}>Pipeline Status:</span>
                  <span style={{ color: '#0284c7', fontWeight: '600' }}>Connected to Database</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Alerts */}
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '100px', color: '#64748b' }}>Retrieving pending alerts...</div>
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
