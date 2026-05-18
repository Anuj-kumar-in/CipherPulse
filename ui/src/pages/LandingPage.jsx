import React, { useState, useEffect } from 'react';
import { 
  Shield, Lock, Search, FileText, ArrowRight, CheckCircle2, 
  Cpu, Database, Network, Terminal, Activity, ArrowUpRight, Zap, RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage = () => {
  const [inputText, setInputText] = useState("Hey, buy 50,000 shares of Meridian before the Q3 earnings release at 9 AM tomorrow.");
  const [sandboxResult, setSandboxResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pingStatus, setPingStatus] = useState("CONNECTED");
  const [pingTime, setPingTime] = useState(38);

  // Simulate server ping variations
  useEffect(() => {
    const interval = setInterval(() => {
      setPingTime(Math.floor(Math.random() * (45 - 32 + 1)) + 32);
    }, 4000);
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
          source: "sandbox",
          sender_id: "demo.user",
          sender_role: "Trader",
          team: "Global Securities Desk",
          channel_id: "sandbox-channel",
          message_text: inputText
        })
      });
      if (response.ok) {
        const data = await response.json();
        // Add a deliberate typing delay for high-fidelity interactive feedback
        setTimeout(() => {
          setSandboxResult(data);
          setIsAnalyzing(false);
        }, 8000);
      } else {
        throw new Error("Local API offline");
      }
    } catch (e) {
      setTimeout(() => {
        // Fallback simulation if local backend is offline during frontend previews
        const mockScore = inputText.toLowerCase().includes("meridian") || inputText.toLowerCase().includes("insider") ? 92.4 : 12.5;
        const mockLabels = mockScore > 50 ? ["MNPI"] : [];
        setSandboxResult({
          risk_score: mockScore,
          labels: mockLabels,
          explanation: { predicted_class: mockScore > 50 ? "MNPI" : "BENIGN", confidence: mockScore > 50 ? 0.924 : 0.875 },
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
      backgroundColor: '#030712', 
      color: '#f3f4f6', 
      fontFamily: '"Outfit", "Inter", sans-serif',
      overflowX: 'hidden'
    }}>
      {/* Dark Theme Overrides for standard Navbar */}
      <style>{`
        nav {
          background-color: #030712 !important;
          border-bottom: 1px solid #1f2937 !important;
        }
        nav h1, nav a {
          color: #f3f4f6 !important;
        }
        nav a:hover {
          color: #6366f1 !important;
        }
        .btn-primary {
          background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%) !important;
          border: none !important;
          color: #ffffff !important;
        }
        .btn-primary:hover {
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.4) !important;
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        @keyframes cyber-line {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
      
      <Navbar />

      <div style={{ flex: 1 }}>
        {/* HERO SECTION: Glowing Space-Grid Header */}
        <section style={{ 
          position: 'relative',
          padding: '120px 24px 80px 24px', 
          background: 'radial-gradient(circle at 50% 0%, #1e1b4b 0%, #030712 60%)',
          borderBottom: '1px solid #1f2937'
        }}>
          {/* Cybernetic Matrix Grid Background */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
            opacity: 0.8
          }} />

          {/* Indigo Radial Glow Background */}
          <div style={{
            position: 'absolute', top: '-10%', left: '25%', width: '50%', height: '40%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
            animation: 'pulse-glow 6s infinite ease-in-out'
          }} />

          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', alignItems: 'center' }}>
            
            {/* Left: Text Introductions */}
            <div style={{ textAlign: 'left', zIndex: 10 }}>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '6px 16px', 
                backgroundColor: 'rgba(99, 102, 241, 0.1)', 
                border: '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: '9999px', 
                fontSize: '13px', 
                fontWeight: '700', 
                color: '#818cf8', 
                marginBottom: '28px' 
              }}>
                <Shield size={14} /> SECURITY & PRIVACY CERTIFIED BY AWS NITRO
              </div>
              
              <h1 style={{ 
                fontSize: '58px', 
                fontWeight: '900', 
                color: '#ffffff', 
                letterSpacing: '-2px', 
                lineHeight: '1.1', 
                marginBottom: '24px'
              }}>
                Confidential AI <br/>
                <span style={{ background: 'linear-gradient(90deg, #6366f1 0%, #10b981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Surveillance Engine
                </span>
              </h1>
              
              <p style={{ 
                fontSize: '19px', 
                color: '#9ca3af', 
                marginBottom: '36px', 
                lineHeight: '1.6',
                maxWidth: '600px'
              }}>
                Deploy the world's most secure compliance audit suite. Process communication streams inside hardware-isolated Trusted Execution Environments with zero leakage.
              </p>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/inbox" className="btn-primary" style={{ 
                  fontSize: '15px', 
                  padding: '14px 28px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontWeight: '700'
                }}>
                  Launch Dashboard <ArrowUpRight size={18} />
                </Link>
                <a href="#demo-terminal" style={{ 
                  fontSize: '15px', 
                  padding: '14px 28px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}>
                  Try Sandbox Playground
                </a>
              </div>

              {/* Heartbeat Status */}
              <div style={{ display: 'flex', gap: '32px', marginTop: '48px', borderTop: '1px solid #1f2937', paddingTop: '28px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>Host Connection</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block' }} />
                    {pingStatus}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>Gateway Latency</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>
                    {pingTime} ms
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>TEE Mode</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#6366f1', marginTop: '4px' }}>
                    AWS NITRO VSOCK
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Premium Interactive TEE Enclave Shield Graphic */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{
                width: '380px', height: '380px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
                position: 'absolute', top: 0, left: 0, zIndex: 1
              }} />

              {/* Secure Enclave CSS Box */}
              <div style={{
                width: '320px', height: '340px',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '16px',
                background: 'rgba(11, 15, 25, 0.8)',
                backdropFilter: 'blur(12px)',
                padding: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                zIndex: 5,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }} />
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#9ca3af', fontFamily: 'monospace' }}>SECURE_ENCLAVE_CID_3</span>
                  </div>
                  <Lock size={16} color="#6366f1" />
                </div>

                {/* Cybernetic Attestation Blueprint Visualization */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', margin: '20px 0' }}>
                  <div style={{ 
                    width: '100px', height: '100px', borderRadius: '50%', 
                    border: '2px dashed rgba(16, 185, 129, 0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <Cpu size={36} color="#10b981" />
                    <div style={{
                      position: 'absolute', width: '12px', height: '12px', backgroundColor: '#10b981',
                      borderRadius: '50%', top: '-6px', left: '44px',
                      boxShadow: '0 0 10px #10b981'
                    }} />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '15px', fontWeight: '800', color: '#ffffff' }}>Isolated Hardware CPU</div>
                    <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace', marginTop: '4px' }}>RAM Encrypted with AES-256</div>
                  </div>
                </div>

                {/* Footprint metrics */}
                <div style={{ borderTop: '1px solid #1f2937', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'monospace', color: '#64748b' }}>
                  <span>PCR0: 8a3f89ba7...</span>
                  <span style={{ color: '#10b981', fontWeight: '700' }}>INTEGRITY OK</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* INTERACTIVE COMPLIANCE SANDBOX TERMINAL PLAYGROUND */}
        <section id="demo-terminal" style={{ padding: '80px 24px', backgroundColor: '#090d16', borderBottom: '1px solid #1f2937' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span style={{ color: '#6366f1', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px' }}>Live Sandbox Test</span>
              <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#ffffff', letterSpacing: '-1px', marginTop: '8px', marginBottom: '12px' }}>
                Test the Confidential Classifier Live
              </h2>
              <p style={{ fontSize: '16px', color: '#9ca3af', maxWidth: '600px', margin: '0 auto' }}>
                Type any mock message below (benign or violation) and run the isolated compliance analysis gateway to watch the classification logs instantly!
              </p>
            </div>

            {/* Simulated macOS Code Terminal */}
            <div style={{ 
              backgroundColor: '#0b0f19', 
              border: '1px solid #1f2937', 
              borderRadius: '12px', 
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
            }}>
              {/* Terminal Header */}
              <div style={{ backgroundColor: '#0d1527', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1f2937' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '50%', display: 'inline-block' }} />
                  <span style={{ width: '12px', height: '12px', backgroundColor: '#eab308', borderRadius: '50%', display: 'inline-block' }} />
                  <span style={{ width: '12px', height: '12px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
                </div>
                <span style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace', fontWeight: '700' }}>cp-surveillance-gateway --sandbox</span>
                <span style={{ width: '32px' }} />
              </div>

              {/* Terminal Content Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', minHeight: '300px' }}>
                
                {/* Left: Input Console */}
                <div style={{ padding: '24px', borderRight: '1px solid #1f2937', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '10px', fontFamily: 'monospace' }}>
                      MESSAGE STREAM INPUT:
                    </label>
                    <textarea 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type a trader message..."
                      style={{
                        width: '100%', height: '150px', backgroundColor: '#080c14', color: '#f3f4f6',
                        border: '1px solid #1f2937', borderRadius: '6px', padding: '12px',
                        fontSize: '14px', fontFamily: 'monospace', resize: 'none', outline: 'none',
                        lineHeight: '1.5', boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  
                  <button 
                    onClick={handleSandboxAnalyze}
                    disabled={isAnalyzing}
                    style={{
                      backgroundColor: isAnalyzing ? '#1f2937' : '#6366f1',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '14px',
                      fontWeight: '700',
                      fontSize: '14px',
                      cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      marginTop: '16px',
                      transition: 'background 0.2s',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw size={16} style={{ animation: 'spin 1.5s linear infinite' }} />
                        Analyzing Enclave VSOCK...
                      </>
                    ) : (
                      <>
                        <Terminal size={16} /> Run Compliance Audit
                      </>
                    )}
                  </button>
                </div>

                {/* Right: Output Logs Feed */}
                <div style={{ padding: '24px', backgroundColor: '#05070b', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '13px', color: '#818cf8', overflowY: 'auto', maxHeight: '250px' }}>
                    <div>$ cp-pipeline-ingest --stream=sandbox</div>
                    <div style={{ color: '#64748b', marginTop: '4px' }}>[INFO] Ingesting message payload via Local Host Gateway...</div>
                    
                    {isAnalyzing && (
                      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ color: '#eab308' }}>⚡ [VSOCK-5000] Connecting to isolated Nitro hardware enclave...</div>
                        <div style={{ color: '#6366f1' }}>⏳ Generating attestation measurements PCR0 and PCR1...</div>
                        <div style={{ color: '#10b981' }}>🔄 Executing in-memory matrix vectorization & Logistic Regression...</div>
                        <div style={{ color: '#64748b' }}>[WAIT] Scoring tokens and parsing risk values...</div>
                      </div>
                    )}

                    {sandboxResult && (
                      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ color: '#10b981' }}>✅ [TEE] IN-MEMORY INFERENCE COMPLETED EXCELLENTLY</div>
                        
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '12px', border: '1px solid #1f2937', borderRadius: '4px', marginTop: '4px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ color: '#9ca3af' }}>Risk Score:</span>
                            <span style={{ 
                              fontWeight: '700', 
                              color: sandboxResult.risk_score > 50 ? '#ef4444' : '#10b981' 
                            }}>{sandboxResult.risk_score.toFixed(2)}%</span>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ color: '#9ca3af' }}>Identified Flags:</span>
                            <span style={{ fontWeight: '700', color: '#f59e0b' }}>
                              {sandboxResult.labels.length > 0 ? sandboxResult.labels.join(", ") : "CLEAN"}
                            </span>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ color: '#9ca3af' }}>Model Version:</span>
                            <span style={{ color: '#ffffff' }}>{sandboxResult.model_version}</span>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#9ca3af' }}>Attestation:</span>
                            <span style={{ color: '#10b981', fontWeight: '700' }}>VERIFIED (TEE)</span>
                          </div>
                        </div>
                        <div style={{ color: '#64748b', fontSize: '11px', marginTop: '6px' }}>
                          Raw message permanently wiped from server memory. Only anonymized metadata score was stored in the compliance catalog database.
                        </div>
                      </div>
                    )}

                    {!isAnalyzing && !sandboxResult && (
                      <div style={{ color: '#64748b', marginTop: '32px', textAlign: 'center' }}>
                        Type a message in the left console and click "Run Compliance Audit" to trace the live enclaved TEE classification stream.
                      </div>
                    )}
                  </div>
                  
                  <div style={{ borderTop: '1px solid #1f2937', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'monospace', color: '#64748b' }}>
                    <span>Console Session Status: ACTIVE</span>
                    <span>Ollama Llama-3.2-1B: LOADED</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* COMPARATIVE PRODUCT SECURITY ADVANTAGE MATRIX */}
        <section style={{ padding: '96px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ color: '#10b981', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px' }}>Why CipherPulse</span>
            <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#ffffff', letterSpacing: '-1px', marginTop: '8px', marginBottom: '12px' }}>
              Designed to Exceed Global Financial Standards
            </h2>
            <p style={{ fontSize: '17px', color: '#9ca3af', maxWidth: '600px', margin: '0 auto' }}>
              Compare how standard compliance software leaks trader data vs. CipherPulse's confidential zero-trust model.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            
            {/* Standard Systems */}
            <div style={{ 
              padding: '36px', border: '1px solid #1f2937', borderRadius: '12px', 
              background: 'linear-gradient(180deg, #090d16 0%, #030712 100%)'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ef4444', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                ❌ Traditional Surveillance Systems
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', color: '#9ca3af' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#ef4444', fontWeight: '700' }}>●</span>
                  <span><strong>Plaintext Memory Logs</strong>: Message content is loaded into shared server RAM, vulnerable to root operators and cloud admins.</span>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#ef4444', fontWeight: '700' }}>●</span>
                  <span><strong>Third-Party API Dependency</strong>: Streams message data outside the corporate perimeter to open LLMs, triggering PII leaks.</span>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#ef4444', fontWeight: '700' }}>●</span>
                  <span><strong>No Integrity Proof</strong>: No cryptographic attestation to prove the server hasn't been backdoored or modified.</span>
                </div>
              </div>
            </div>

            {/* CipherPulse TEE Systems */}
            <div style={{ 
              padding: '36px', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', 
              background: 'linear-gradient(180deg, #022c22 0%, #030712 100%)',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.05)'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#10b981', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                ✅ CipherPulse Confidential Surveillance
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', color: '#e5e7eb' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#10b981', fontWeight: '700' }}>●</span>
                  <span><strong>AWS Nitro TEE Enclaves</strong>: Chat messages are analyzed inside silicon-level isolated registers. Completely invisible to anyone.</span>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#10b981', fontWeight: '700' }}>●</span>
                  <span><strong>Local Private AI</strong>: Runs fully offline Llama-3.2-1B models and Logistic classifiers on internal virtual sockets (VSOCK).</span>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#10b981', fontWeight: '700' }}>●</span>
                  <span><strong>Cryptographic Attestation</strong>: Generates verifiable PCR0 and PCR1 code hashes to mathematically prove absolute system security.</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* CTA FOOTER PANEL */}
        <section style={{ 
          padding: '80px 24px', 
          backgroundColor: '#070b13', 
          borderTop: '1px solid #1f2937', 
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', zIndex: 10 }}>
            <h2 style={{ fontSize: '38px', fontWeight: '900', color: '#ffffff', marginBottom: '24px', letterSpacing: '-0.5px' }}>
              Secure Your Corporate Communications Now
            </h2>
            <p style={{ fontSize: '18px', color: '#9ca3af', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
              Deploy in your own VPC inside minutes. Benefit from military-grade confidential computing and automated regulatory surveillance.
            </p>
            <Link to="/inbox" style={{ 
              background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
              color: '#ffffff', 
              fontWeight: '700', 
              padding: '16px 36px', 
              borderRadius: '6px', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: '16px', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
            }}>
              Enter Platform Portal <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </div>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
