import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate enterprise authentication
    setTimeout(() => {
      if (email === 'admin@cipherpulse.com' && password === 'password123') {
        localStorage.setItem('cp_token', 'session_auth_0x9212A_secure_tee');
        localStorage.setItem('cp_user', JSON.stringify({
          name: 'Compliance Officer',
          id: '0x9212A',
          role: 'Surveillance Lead',
          email: email
        }));
        navigate('/inbox');
      } else {
        setError('Invalid corporate credentials or unauthorized access key.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#f1f5f9', 
      backgroundImage: 'radial-gradient(circle at top right, rgba(29, 78, 216, 0.04), transparent 40%), radial-gradient(circle at bottom left, rgba(14, 165, 233, 0.04), transparent 40%)',
      fontFamily: "'Inter', sans-serif",
      padding: '24px'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '440px', 
        backgroundColor: '#ffffff', 
        border: '1px solid #e2e8f0', 
        borderRadius: '16px', 
        padding: '40px', 
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04)'
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '10px', 
            background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: '16px',
            boxShadow: '0 4px 12px rgba(29, 78, 216, 0.15)'
          }}>
            <Shield size={24} color="#ffffff" />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>CipherPulse</h2>
          <p style={{ fontSize: '13px', color: '#475569', margin: 0 }}>Confidential Surveillance Suite</p>
        </div>

        {error && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            backgroundColor: '#fef2f2', 
            border: '1px solid #fecaca', 
            borderRadius: '8px', 
            padding: '12px 16px', 
            marginBottom: '24px', 
            color: '#ef4444', 
            fontSize: '13px' 
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Email input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Corporate Email</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '14px', color: '#64748b' }}>
                <User size={18} />
              </span>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cipherpulse.com"
                style={{ 
                  width: '100%', 
                  padding: '14px 16px 14px 44px', 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #cbd5e1', 
                  borderRadius: '8px', 
                  color: '#0f172a', 
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
          </div>

          {/* Password input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Security Passcode</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '14px', color: '#64748b' }}>
                <Lock size={18} />
              </span>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{ 
                  width: '100%', 
                  padding: '14px 16px 14px 44px', 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #cbd5e1', 
                  borderRadius: '8px', 
                  color: '#0f172a', 
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              marginTop: '10px',
              padding: '14px', 
              borderRadius: '8px', 
              background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)', 
              color: '#ffffff', 
              border: 'none', 
              fontWeight: '700', 
              fontSize: '14px',
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px',
              boxShadow: '0 4px 14px rgba(29, 78, 216, 0.2)',
              transition: 'transform 0.2s, opacity 0.2s',
              opacity: loading ? 0.8 : 1
            }}
          >
            {loading ? 'Authenticating Enclave...' : 'Access Dashboard'}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        {/* Credentials hints for demo ease */}
        <div style={{ 
          marginTop: '32px', 
          borderTop: '1px solid #e2e8f0', 
          paddingTop: '20px', 
          fontSize: '12px', 
          color: '#64748b', 
          textAlign: 'center' 
        }}>
          <span style={{ display: 'block', marginBottom: '4px', fontWeight: '600', color: '#475569' }}>Demo Access Credentials:</span>
          <span>Username: <code style={{ color: '#1d4ed8', fontWeight: '700' }}>admin@cipherpulse.com</code></span>
          <span style={{ display: 'block' }}>Password: <code style={{ color: '#1d4ed8', fontWeight: '700' }}>password123</code></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
