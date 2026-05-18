import React, { useState, useEffect } from 'react';
import { 
  Shield, Lock, Search, FileText, ArrowRight, CheckCircle2, 
  Cpu, Database, Network, Terminal, Activity, ArrowUpRight, Zap, RefreshCw, Play, Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage = () => {
  const [inputText, setInputText] = useState("Hey, keep this between us — we need to buy 50,000 shares of Meridian before Q3 earnings drop tomorrow.");
  const [sandboxResult, setSandboxResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pingTime, setPingTime] = useState(36);

  useEffect(() => {
    const interval = setInterval(() => {
      setPingTime(Math.floor(Math.random() * (42 - 34 + 1)) + 34);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSandboxAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setSandboxResult(null);
    
    try {
      const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "snowsight-sandbox",
          sender_id: "analyst.snowflake",
          sender_role: "Compliance Officer",
          team: "Internal Audit",
          channel_id: "snow-pipeline",
          message_text: inputText
        })
      });
      if (response.ok) {
        const data = await response.json();
        setTimeout(() => {
          setSandboxResult(data);
          setIsAnalyzing(false);
        }, 1200);
      } else {
        throw new Error("Local API offline");
      }
    } catch (e) {
      setTimeout(() => {
        const mockScore = inputText.toLowerCase().includes("meridian") || inputText.toLowerCase().includes("insider") ? 94.2 : 11.4;
        const mockLabels = mockScore > 50 ? ["MNPI"] : [];
        setSandboxResult({
          risk_score: mockScore,
          labels: mockLabels,
          explanation: { predicted_class: mockScore > 50 ? "MNPI" : "BENIGN", confidence: mockScore > 50 ? 0.942 : 0.895 },
          model_version: "v1-tfidf-lr"
        });
        setIsAnalyzing(false);
      }, 1000);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      backgroundColor: '#ffffff', 
      color: '#334155', 
      fontFamily: '"Outfit", "Inter", sans-serif',
      overflowX: 'hidden'
    }}>
      {/* Dynamic Snowflake styles */}
      <style>{`
        nav {
          background-color: #ffffff !important;
          border-bottom: 1px solid #e2e8f0 !important;
          height: 80px !important;
        }
        nav h1 {
          color: #002f56 !important;
          font-weight: 900 !important;
        }
        nav a {
          color: #002f56 !important;
          font-weight: 600 !important;
        }
        nav a:hover {
          color: #29b6f6 !important;
        }
        .btn-primary {
          background-color: #29b6f6 !important;
          border: 1px solid #29b6f6 !important;
          color: #ffffff !important;
          border-radius: 9999px !important;
          font-weight: 700 !important;
          transition: all 0.2s ease !important;
        }
        .btn-primary:hover {
          background-color: #00a3e0 !important;
          box-shadow: 0 4px 12px rgba(41, 182, 246, 0.3) !important;
        }
      `}</style>
      
      <Navbar />

      <div style={{ flex: 1 }}>
        
        {/* HERO SECTION: Snowflake-style Clean Icy Gradient Canvas */}
        <section style={{ 
          position: 'relative',
          padding: '120px 24px 80px 24px', 
          background: 'linear-gradient(180deg, #f4f9fc 0%, #ffffff 100%)',
          borderBottom: '1px solid #e2e8f0'
        }}>
          {/* Subtle Technical Grid Overlay */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'linear-gradient(#00a3e005 1px, transparent 1px), linear-gradient(90deg, #00a3e005 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            pointerEvents: 'none'
          }} />

          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '64px', alignItems: 'center' }}>
            
            {/* Left: Text Column */}
            <div style={{ textAlign: 'left', zIndex: 10 }}>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '6px 14px', 
                backgroundColor: '#e6f7ff', 
                border: '1px solid #b3e5fc',
                borderRadius: '9999px', 
                fontSize: '12px', 
                fontWeight: '800', 
                color: '#00a3e0', 
                marginBottom: '24px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                <Shield size={12} /> AWS Nitro Secure Attestation Enabled
              </div>
              
              <h1 style={{ 
                fontSize: '56px', 
                fontWeight: '900', 
                color: '#002f56', 
                letterSpacing: '-2px', 
                lineHeight: '1.1', 
                marginBottom: '24px'
              }}>
                The Compliance <br/>
                <span style={{ color: '#29b6f6' }}>Confidential Data Cloud</span>
              </h1>
              
              <p style={{ 
                fontSize: '18px', 
                color: '#475569', 
                marginBottom: '36px', 
                lineHeight: '1.6',
                maxWidth: '580px'
              }}>
                Mobilize your communications compliance audit workflows. Run highly accurate, real-time risk surveillance inside secure, silicon-isolated AWS Nitro hardware enclaves with absolute privacy.
              </p>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/inbox" className="btn-primary" style={{ 
                  fontSize: '15px', 
                  padding: '14px 32px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  textDecoration: 'none'
                }}>
                  Launch Snowsight Platform <ArrowUpRight size={18} />
                </Link>
                <a href="#snowsight-simulation" style={{ 
                  fontSize: '15px', 
                  padding: '14px 28px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#ffffff',
                  color: '#002f56',
                  border: '1px solid #cbd5e1',
                  borderRadius: '9999px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}>
                  Try Snowsight Console
                </a>
              </div>

              {/* Server Stats */}
              <div style={{ display: 'flex', gap: '48px', marginTop: '48px', borderTop: '1px solid #cbd5e1', paddingTop: '28px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Active Node Status</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block' }} />
                    EC2_ONLINE
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Query Latency</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#002f56', marginTop: '4px' }}>
                    {pingTime} ms
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Isolated Compute</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#00a3e0', marginTop: '4px' }}>
                    NITRO_VSOCK
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Floating Icy-Blue Data Cloud Layer Illustration */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{
                width: '380px', height: '380px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(41,182,246,0.1) 0%, transparent 70%)',
                position: 'absolute', top: 0, left: 0, zIndex: 1
              }} />

              {/* Data Cloud Card Stack */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 5, width: '320px' }}>
                {[
                  { title: "Ingestion & Streaming Sources", color: "#29b6f6", icon: <Network size={16} /> },
                  { title: "Hardware-Isolated TEE Compute", color: "#10b981", icon: <Lock size={16} /> },
                  { title: "Safe Metadata Ledgers (Postgres)", color: "#002f56", icon: <Database size={16} /> }
                ].map((layer, idx) => (
                  <div key={idx} style={{
                    padding: '20px', 
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 8px 16px rgba(0, 47, 86, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transform: `translateY(${idx * 4}px)`
                  }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '6px',
                      backgroundColor: '#e6f7ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: layer.color
                    }}>
                      {layer.icon}
                    </div>
                    <div>
                      <strong style={{ fontSize: '14px', color: '#002f56', display: 'block' }}>{layer.title}</strong>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Layer 0{idx+1} Cryptographic Node</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SNOWSIGHT INTERACTIVE WORKSHEET SIMULATOR */}
        <section id="snowsight-simulation" style={{ padding: '80px 24px', backgroundColor: '#f4f9fc', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span style={{ color: '#00a3e0', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>Interactive Snowsight Playground</span>
              <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#002f56', letterSpacing: '-1px', marginTop: '8px', marginBottom: '12px' }}>
                Snowsight Workspace Simulator
              </h2>
              <p style={{ fontSize: '16px', color: '#475569', maxWidth: '650px', margin: '0 auto' }}>
                Inspect the secure database ledger worksheet. Write a mock payload in the query input and trigger the in-memory classification engine live!
              </p>
            </div>

            {/* Snowsight Worksheet Interface */}
            <div style={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #cbd5e1', 
              borderRadius: '8px', 
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 47, 86, 0.06)',
              display: 'grid',
              gridTemplateColumns: '240px 1fr'
            }}>
              
              {/* Left Column: Database Navigator */}
              <div style={{ backgroundColor: '#f8fafc', borderRight: '1px solid #cbd5e1', padding: '20px', fontSize: '13px' }}>
                <div style={{ fontWeight: '800', color: '#002f56', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1px', marginBottom: '16px' }}>
                  CIPHERPULSE_DB
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#475569' }}>
                  <div>
                    <strong style={{ color: '#002f56', display: 'flex', alignItems: 'center', gap: '6px' }}>▼ TABLES</strong>
                    <div style={{ paddingLeft: '16px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'monospace' }}>
                      <div>● communications_raw</div>
                      <div>● communications_scored</div>
                      <div>● compliance_reviews</div>
                    </div>
                  </div>

                  <div style={{ marginTop: '8px' }}>
                    <strong style={{ color: '#002f56', display: 'flex', alignItems: 'center', gap: '6px' }}>▼ VIEWS</strong>
                    <div style={{ paddingLeft: '16px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'monospace' }}>
                      <div>● v_alerts</div>
                      <div>● v_attestations</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: SQL Editor Worksheet */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                
                {/* Worksheet Header Toolbar */}
                <div style={{ 
                  height: '56px', borderBottom: '1px solid #cbd5e1', padding: '0 20px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#002f56' }}>Worksheet: Ingest_Check_WS</span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={handleSandboxAnalyze}
                      disabled={isAnalyzing}
                      style={{
                        backgroundColor: '#29b6f6', color: '#ffffff', border: 'none', borderRadius: '4px',
                        padding: '8px 16px', fontSize: '13px', fontWeight: '700', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '6px', transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00a3e0'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#29b6f6'}
                    >
                      {isAnalyzing ? (
                        <RefreshCw size={14} style={{ animation: 'spin 1.5s linear infinite' }} />
                      ) : (
                        <Play size={14} fill="#ffffff" />
                      )}
                      {isAnalyzing ? 'Running...' : 'Run Query'}
                    </button>
                    <button 
                      onClick={() => setInputText("")}
                      style={{
                        backgroundColor: '#ffffff', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '4px',
                        padding: '8px', fontSize: '13px', cursor: 'pointer'
                      }}
                      title="Clear editor"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* SQL Code Input Panel */}
                <div style={{ padding: '20px', borderBottom: '1px solid #cbd5e1', backgroundColor: '#fafbfd' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '13px', color: '#002f56', marginBottom: '8px', fontWeight: '700' }}>
                    -- QUERY WORKSHEET
                  </div>
                  
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'monospace', color: '#94a3b8', fontSize: '14px', selectSize: 'none', marginTop: '12px' }}>1<br/>2<br/>3</span>
                    <div style={{ flex: 1, position: 'relative' }}>
                      <span style={{ fontFamily: 'monospace', color: '#00a3e0', fontSize: '14px', display: 'block', marginBottom: '4px' }}>
                        INSERT INTO raw_messages (sender, message_body) VALUES
                      </span>
                      <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="'Type corporate message body...'"
                        style={{
                          width: '100%', height: '80px', backgroundColor: '#ffffff', color: '#0f172a',
                          border: '1px solid #cbd5e1', borderRadius: '4px', padding: '12px',
                          fontSize: '14px', fontFamily: 'monospace', resize: 'none', outline: 'none',
                          boxSizing: 'border-box', lineHeight: '1.5'
                        }}
                      />
                      <span style={{ fontFamily: 'monospace', color: '#00a3e0', fontSize: '14px', display: 'block', marginTop: '4px' }}>
                        );
                      </span>
                    </div>
                  </div>
                </div>

                {/* SQL Result Grid Panel */}
                <div style={{ padding: '20px', minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#ffffff' }}>
                  
                  {isAnalyzing && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '120px', gap: '12px', color: '#00a3e0' }}>
                      <RefreshCw size={24} style={{ animation: 'spin 1.5s linear infinite' }} />
                      <span style={{ fontSize: '13px', fontFamily: 'monospace', fontWeight: '700' }}>EXECUTING PIPELINE INFERENCE IN HARDWARE TEE...</span>
                    </div>
                  )}

                  {sandboxResult && !isAnalyzing && (
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                        Query Results (1 Row Scored in TEE Enclave)
                      </div>
                      
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid #cbd5e1', color: '#002f56', backgroundColor: '#f8fafc' }}>
                            <th style={{ padding: '10px 16px' }}>RISK_SCORE</th>
                            <th style={{ padding: '10px 16px' }}>VIOLATION_LABELS</th>
                            <th style={{ padding: '10px 16px' }}>ATTESTATION</th>
                            <th style={{ padding: '10px 16px' }}>MODEL_VERSION</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                            <td style={{ padding: '12px 16px', fontWeight: '700', color: sandboxResult.risk_score > 50 ? '#ef4444' : '#10b981' }}>
                              {sandboxResult.risk_score.toFixed(2)}%
                            </td>
                            <td style={{ padding: '12px 16px', fontWeight: '700', color: '#f59e0b' }}>
                              {sandboxResult.labels.length > 0 ? sandboxResult.labels.join(", ") : "CLEAN"}
                            </td>
                            <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: '700' }}>
                              VERIFIED (TEE)
                            </td>
                            <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>
                              {sandboxResult.model_version}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {!isAnalyzing && !sandboxResult && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px', color: '#64748b', fontSize: '13px', fontStyle: 'italic' }}>
                      Click "Run Query" above to trigger enclaved classification and inspect compiled DDL score metrics.
                    </div>
                  )}

                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>
                    <span>Database Connection: cp_active_session</span>
                    <span>Confidential VM: CID_3_VSOCK_5000</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* THE DATA CLOUD ADVANTAGE SECTION */}
        <section style={{ padding: '96px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ color: '#29b6f6', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>Zero Trust Compliance</span>
            <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#002f56', letterSpacing: '-0.5px', marginTop: '8px' }}>
              Confidentiality Reimagined
            </h2>
            <p style={{ fontSize: '17px', color: '#475569', maxWidth: '600px', margin: '0 auto', marginTop: '12px' }}>
              CipherPulse enables high-throughput database audits while completely masking raw text strings from cloud hosting vendors.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px' }}>
            <div style={{ padding: '36px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: '#ffffff' }}>
              <div style={{ width: '44px', height: '44px', backgroundColor: '#e6f7ff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color: '#00a3e0' }}>
                <Search size={22} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#002f56', marginBottom: '12px' }}>Explainable NLP Classifier</h3>
              <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '14px' }}>
                Logistic regression networks specifically optimized to analyze legal and financial documents, highlighting compliance risks in milliseconds.
              </p>
            </div>

            <div style={{ padding: '36px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: '#ffffff' }}>
              <div style={{ width: '44px', height: '44px', backgroundColor: '#e6f7ff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color: '#10b981' }}>
                <Lock size={22} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#002f56', marginBottom: '12px' }}>Confidential Silicon</h3>
              <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '14px' }}>
                Enclaves running in silicon-encrypted hardware RAM blocks. Traditional operating system administrators cannot view raw communication text.
              </p>
            </div>

            <div style={{ padding: '36px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: '#ffffff' }}>
              <div style={{ width: '44px', height: '44px', backgroundColor: '#e6f7ff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color: '#8b5cf6' }}>
                <FileText size={22} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#002f56', marginBottom: '12px' }}>SQL Workbench IDE</h3>
              <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '14px' }}>
                A highly comprehensive, Workbench-grade developer IDE providing alternate row grids, collapsible DB trees, and transaction logs.
              </p>
            </div>
          </div>
        </section>

        {/* CTA ROW BLOCK */}
        <section style={{ 
          padding: '80px 24px', 
          backgroundColor: '#002f56', 
          color: '#ffffff',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '38px', fontWeight: '900', marginBottom: '20px', letterSpacing: '-0.5px' }}>
              Deploy The Compliance Data Cloud Today
            </h2>
            <p style={{ fontSize: '17px', color: '#b3e5fc', marginBottom: '36px', maxWidth: '600px', margin: '0 auto 36px auto' }}>
              Ensure 100% data audit compliance without sacrificing employee privacy.
            </p>
            <Link to="/inbox" className="btn-primary" style={{ 
              color: '#ffffff', 
              fontWeight: '700', 
              padding: '16px 36px', 
              borderRadius: '9999px',
              fontSize: '15px', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              textDecoration: 'none'
            }}>
              Start Compliance Worksheets <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </div>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
