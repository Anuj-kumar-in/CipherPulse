import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Sliders, Shield, Save, RotateCcw, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const Settings = () => {
  const [interval, setIntervalVal] = useState(30);
  const [batchSize, setBatchSize] = useState(100);
  const [riskThreshold, setRiskThreshold] = useState(60);
  const [useTee, setUseTee] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // Load initial values from localStorage or default
    setIntervalVal(parseInt(localStorage.getItem('settings_processing_interval') || '30'));
    setBatchSize(parseInt(localStorage.getItem('settings_batch_size') || '100'));
    setRiskThreshold(parseInt(localStorage.getItem('settings_risk_threshold') || '60'));
    setUseTee(localStorage.getItem('settings_use_tee') === 'true');
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('settings_processing_interval', interval.toString());
    localStorage.setItem('settings_batch_size', batchSize.toString());
    localStorage.setItem('settings_risk_threshold', riskThreshold.toString());
    localStorage.setItem('settings_use_tee', useTee ? 'true' : 'false');
    
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    setIntervalVal(30);
    setBatchSize(100);
    setRiskThreshold(60);
    setUseTee(false);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
      <Sidebar />
      
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto', color: '#1e293b' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 4px 0', letterSpacing: '-0.5px', color: '#0f172a' }}>Model & Run Settings</h1>
            <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>Configure compliance scoring variables and secure execution profiles</p>
          </div>
        </div>

        {saveSuccess && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: '8px',
            padding: '16px 20px',
            marginBottom: '24px',
            color: '#047857',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            <CheckCircle size={20} />
            <span>Optimal variables saved and successfully updated across the CipherPulse platform.</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          {/* Settings Form Card */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              
              {/* Variable 1: Processing Interval */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>Batch Ingestion Interval</label>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#0284c7', backgroundColor: '#f0f9ff', padding: '2px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                    {interval} Seconds
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 4px 0' }}>Specifies the frequency in seconds at which the ETL pipeline processes incoming compliance feeds.</p>
                <input 
                  type="range" 
                  min="5" 
                  max="300" 
                  step="5"
                  value={interval}
                  onChange={(e) => setIntervalVal(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: '#0284c7',
                    cursor: 'pointer',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: '#f1f5f9'
                  }}
                />
              </div>

              {/* Variable 2: Batch Size */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>Processing Batch Size</label>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#0284c7', backgroundColor: '#f0f9ff', padding: '2px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                    {batchSize} Messages
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 4px 0' }}>Max limit of communication records retrieved and classified during each scheduled run.</p>
                <input 
                  type="range" 
                  min="10" 
                  max="1000" 
                  step="10"
                  value={batchSize}
                  onChange={(e) => setThemeBatch(e)}
                  style={{
                    width: '100%',
                    accentColor: '#0284c7',
                    cursor: 'pointer',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: '#f1f5f9'
                  }}
                />
              </div>

              {/* Variable 3: Risk Threshold */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>Risk Alert Threshold</label>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#8b5cf6', backgroundColor: '#f3e8ff', padding: '2px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                    {riskThreshold} / 100
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 4px 0' }}>Determines the sensitivity cutoff. Messages with score &ge; {riskThreshold} are treated as compliance alerts.</p>
                <input 
                  type="range" 
                  min="10" 
                  max="95" 
                  step="5"
                  value={riskThreshold}
                  onChange={(e) => setRiskThreshold(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: '#8b5cf6',
                    cursor: 'pointer',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: '#f1f5f9'
                  }}
                />
              </div>

              {/* Variable 4: TEE Secure Enclave Toggle */}
              <div style={{ 
                borderTop: '1px solid #e2e8f0', 
                paddingTop: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ paddingRight: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 4px 0' }}>
                    <Shield size={18} color="#0284c7" />
                    <label style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a', cursor: 'pointer' }} htmlFor="tee-toggle">
                      Secure TEE Enclave Routing
                    </label>
                  </div>
                  <p style={{ fontSize: '13px', color: '#475569', margin: 0 }}>
                    When enabled, raw message content is directed solely inside a cryptographically verified AWS Nitro Enclave (VSOCK socket connection). Disables raw storage outside the TEE.
                  </p>
                </div>
                
                {/* Custom Toggle Switch */}
                <input 
                  type="checkbox" 
                  id="tee-toggle"
                  checked={useTee}
                  onChange={(e) => setUseTee(e.target.checked)}
                  style={{
                    width: '52px',
                    height: '26px',
                    backgroundColor: useTee ? '#10b981' : '#cbd5e1',
                    borderRadius: '13px',
                    position: 'relative',
                    appearance: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    flexShrink: 0
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '16px', 
                borderTop: '1px solid #e2e8f0', 
                paddingTop: '24px', 
                justifyContent: 'flex-end' 
              }}>
                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    padding: '12px 20px',
                    color: '#475569',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}
                >
                  <RotateCcw size={16} /> Reset Default
                </button>
                <button
                  type="submit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'linear-gradient(135deg, #0284c7, #8b5cf6)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(2, 132, 199, 0.2)',
                    transition: 'all 0.2s'
                  }}
                >
                  <Save size={16} /> Save Settings
                </button>
              </div>

            </form>
          </div>

          {/* Quick Info & Warnings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Warning Card */}
            <div style={{
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '12px',
              padding: '24px',
              color: '#b45309'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309', marginBottom: '12px' }}>
                <AlertTriangle size={18} />
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700' }}>Compliance Advisory</h4>
              </div>
              <p style={{ fontSize: '13px', lineHeight: '1.6', margin: 0, color: '#b45309' }}>
                Lowering the <strong>Risk Alert Threshold</strong> below 50 will trigger an exponential rise in scored alerts, resulting in potential compliance auditor fatigue. Increasing <strong>Batch Size</strong> beyond 500 records might result in socket latency during busy trading periods.
              </p>
            </div>

            {/* Info Card */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0284c7', marginBottom: '12px' }}>
                <Info size={18} />
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>TEE Architecture</h4>
              </div>
              <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#475569', margin: 0 }}>
                CipherPulse encrypts data payloads with a key bound cryptographically to the enclave's measurement. When <strong>TEE Enclave Routing</strong> is toggled active, the backend relies on hardware attestation before processing any compliance stream.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  function setThemeBatch(e) {
    setBatchSize(parseInt(e.target.value));
  }
};

export default Settings;
