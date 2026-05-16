import React from 'react';
import { Briefcase, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      height: '72px',
      borderBottom: '1px solid var(--border)',
      padding: '0 48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#ffffff',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '4px',
            background: 'var(--text-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Briefcase size={20} color="#ffffff" />
          </div>
          <h1 style={{ fontSize: '24px', margin: 0, fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>CipherPulse</h1>
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500', fontSize: '15px' }}>Platform</Link>
        <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500', fontSize: '15px' }}>Solutions</Link>
        <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500', fontSize: '15px' }}>Resources</Link>
        <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500', fontSize: '15px' }}>Company</Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link to="/inbox" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}>Sign In</Link>
        <Link to="/inbox" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          Get Started <LogIn size={16} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
