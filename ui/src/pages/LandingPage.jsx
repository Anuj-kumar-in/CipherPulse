import React from 'react';
import { Shield, Lock, Search, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        {/* Hero Section */}
      <section style={{ padding: '80px 48px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '6px 12px', backgroundColor: '#f3f4f6', borderRadius: '20px', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          NEW: AWS Nitro Enclave Integration Available
        </div>
        <h1 style={{ fontSize: '56px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-1.5px', lineHeight: '1.1', marginBottom: '24px', maxWidth: '900px', margin: '0 auto 24px auto' }}>
          Secure, AI-Powered <br/>Communications Surveillance
        </h1>
        <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 40px auto', lineHeight: '1.5' }}>
          Protect your financial institution from regulatory risks. Detect MNPI sharing, market manipulation, and compliance breaches with zero-trust confidential AI.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <Link to="/inbox" className="btn-primary" style={{ fontSize: '16px', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            Enter Review Dashboard <ArrowRight size={18} />
          </Link>
          <button className="btn-secondary" style={{ fontSize: '16px', padding: '14px 28px' }}>
            Book a Demo
          </button>
        </div>
      </section>

      {/* Trust Banner */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', backgroundColor: '#f9fafb', padding: '40px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Trusted by compliance teams globally
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '64px', opacity: 0.6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'serif' }}>AETNA Bank</span>
            <span style={{ fontSize: '24px', fontWeight: '800' }}>Vanguard Capital</span>
            <span style={{ fontSize: '24px', fontWeight: '800', fontStyle: 'italic' }}>Summit Financial</span>
            <span style={{ fontSize: '24px', fontWeight: '800' }}>Global Securities</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '96px 48px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            Enterprise-Grade Risk Detection
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Our platform combines cutting-edge natural language processing with strict data privacy architectures to surface real risks without false-positive fatigue.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px' }}>
          {/* Feature 1 */}
          <div style={{ padding: '32px', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: '#ffffff' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Search size={24} color="var(--text-primary)" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>Precision AI Detection</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Multi-class ML models specifically trained on financial lexicon to accurately detect insider trading, collusion, and PII leaks.
            </p>
          </div>

          {/* Feature 2 */}
          <div style={{ padding: '32px', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: '#ffffff' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Lock size={24} color="var(--text-primary)" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>Confidential Computing</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Process sensitive communications within hardware-isolated Trusted Execution Environments. Zero trust, zero leakage.
            </p>
          </div>

          {/* Feature 3 */}
          <div style={{ padding: '32px', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: '#ffffff' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <FileText size={24} color="var(--text-primary)" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>Explainable Workflow</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Human-in-the-loop review queues with exact token highlighting and risk explanations for rapid compliance clearing.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 48px', backgroundColor: 'var(--text-primary)', color: '#ffffff', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '24px', letterSpacing: '-0.5px' }}>
            Ready to secure your communications?
          </h2>
          <p style={{ fontSize: '18px', color: '#9ca3af', marginBottom: '40px' }}>
            Join leading institutions leveraging CipherPulse for automated, privacy-first compliance.
          </p>
          <Link to="/inbox" style={{ 
            backgroundColor: '#ffffff', color: 'var(--text-primary)', fontWeight: '700', 
            padding: '16px 32px', borderRadius: '4px', border: 'none', cursor: 'pointer',
            fontSize: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none'
          }}>
            Get Started Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
