import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Briefcase, 
  Folder, 
  BarChart2, 
  Sliders, 
  Activity, 
  FileText, 
  LogOut, 
  ShieldCheck, 
  Cpu,
  Database,
  Network
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({ name: 'Compliance Officer', id: '0x9212A' });
  const [isTeeActive, setIsTeeActive] = useState(false);

  useEffect(() => {
    // Retrieve mock session user info
    const cpUser = localStorage.getItem('cp_user');
    if (cpUser) {
      setUser(JSON.parse(cpUser));
    }
    
    // Check if TEE is enabled in localStorage or environment state
    const useTee = localStorage.getItem('settings_use_tee');
    setIsTeeActive(useTee === 'true');
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('cp_token');
    localStorage.removeItem('cp_user');
    navigate('/login');
  };

  const navItems = [
    { name: 'Review Inbox', path: '/inbox', icon: <Folder size={18} /> },
    { name: 'Scored Results', path: '/analysis', icon: <FileText size={18} /> },
    { name: 'Compliance Analytics', path: '/analytics', icon: <BarChart2 size={18} /> },
    { name: 'Blueprint Explorer', path: '/blueprint', icon: <Network size={18} /> },
    { name: 'SQL Analyzer', path: '/sql-analyzer', icon: <Database size={18} /> },
    { name: 'System Metrics', path: '/metrics', icon: <Activity size={18} /> },
    { name: 'Model Settings', path: '/settings', icon: <Sliders size={18} /> },
  ];

  return (
    <div style={{
      width: '260px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      fontFamily: "'Inter', sans-serif",
      color: '#334155',
      flexShrink: 0
    }}>
      {/* Brand Header */}
      <div style={{ 
        height: '64px', 
        padding: '0 24px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ 
          width: '30px', 
          height: '30px', 
          borderRadius: '6px', 
          background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center'
        }}>
          <Briefcase size={16} color="#ffffff" />
        </div>
        <span style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>CipherPulse</span>
      </div>

      {/* TEE Secure Status Indicator */}
      <div style={{ padding: '16px 24px 8px 24px' }}>
        <div style={{
          padding: '10px 14px',
          borderRadius: '8px',
          backgroundColor: isTeeActive ? 'rgba(16, 185, 129, 0.06)' : 'rgba(245, 158, 11, 0.06)',
          border: isTeeActive ? '1px solid rgba(16, 185, 129, 0.15)' : '1px solid rgba(245, 158, 11, 0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          {isTeeActive ? (
            <ShieldCheck size={16} color="#10b981" style={{ flexShrink: 0 }} />
          ) : (
            <Cpu size={16} color="#f59e0b" style={{ flexShrink: 0 }} />
          )}
          <div>
            <div style={{ 
              fontSize: '11px', 
              fontWeight: '700', 
              color: isTeeActive ? '#10b981' : '#f59e0b',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {isTeeActive ? 'Secure TEE Active' : 'TCP Simulator'}
            </div>
            <div style={{ fontSize: '9px', color: '#64748b', marginTop: '2px' }}>
              {isTeeActive ? 'AWS Nitro Enclave Enforced' : 'Local Fallback Mode'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div style={{ flex: 1, padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: isActive ? '#eff6ff' : 'transparent',
                color: isActive ? '#1d4ed8' : '#475569',
                fontWeight: isActive ? '600' : '500',
                fontSize: '14px',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.2s',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                  e.currentTarget.style.color = '#0f172a';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#475569';
                }
              }}
            >
              {item.icon}
              {item.name}
            </button>
          );
        })}
      </div>

      {/* User Session Profile & Logout */}
      <div style={{ 
        padding: '16px 20px', 
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, overflow: 'hidden' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            backgroundColor: '#e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            fontSize: '13px',
            color: '#0f172a',
            flexShrink: 0
          }}>
            CO
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
            <div style={{ fontSize: '10px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Officer: {user.id}</div>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
          title="Sign Out"
        >
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
