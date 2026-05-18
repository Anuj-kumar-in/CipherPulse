import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { api } from '../api/client';
import { 
  Database, 
  Play, 
  FileText, 
  Clock, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle,
  Copy,
  Terminal
} from 'lucide-react';

const SqlAnalyzer = () => {
  const [query, setQuery] = useState('SELECT r.team, count(*) as alert_count, round(avg(s.risk_score)::numeric, 1) as avg_risk FROM communications_raw r JOIN communications_scored s ON r.id = s.raw_id WHERE s.risk_score >= 60 GROUP BY r.team ORDER BY alert_count DESC;');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const templates = [
    {
      name: "Alerts Count by Team",
      sql: "SELECT r.team, count(*) as alert_count, round(avg(s.risk_score)::numeric, 1) as avg_risk FROM communications_raw r JOIN communications_scored s ON r.id = s.raw_id WHERE s.risk_score >= 60 GROUP BY r.team ORDER BY alert_count DESC;"
    },
    {
      name: "Category Label Concentrations",
      sql: "SELECT label, count(*) as count FROM (SELECT unnest(s.labels) as label FROM communications_scored s) sub GROUP BY label ORDER BY count DESC;"
    },
    {
      name: "System Total Messages Ledger",
      sql: "SELECT source, is_flagged, count(*) as total_count FROM communications_raw GROUP BY source, is_flagged;"
    },
    {
      name: "Top 5 Scored Violations List",
      sql: "SELECT r.sender_id, r.team, s.risk_score, s.labels[1] as primary_flag, substring(r.message_text from 1 for 45) as snippet FROM communications_raw r JOIN communications_scored s ON r.id = s.raw_id ORDER BY s.risk_score DESC LIMIT 5;"
    }
  ];

  const handleRunQuery = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await api.executeSql(query);
      setResults(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'An unexpected error occurred during database query execution.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (sql) => {
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
      <Sidebar />

      <main style={{ flex: 1, padding: '40px', overflowY: 'auto', color: '#1e293b' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 4px 0', letterSpacing: '-0.5px', color: '#0f172a' }}>Remote SQL Query Analyzer</h1>
            <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>Execute secure SELECT queries to aggregate risk stats directly on the database engine</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ 
              width: '10px', 
              height: '10px', 
              borderRadius: '50%', 
              backgroundColor: '#10b981', 
              boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)',
              display: 'inline-block' 
            }} />
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#047857', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Database Live
            </span>
          </div>
        </div>

        {/* Security Warning Notice */}
        <div style={{
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '32px',
          display: 'flex',
          gap: '16px',
          alignItems: 'center'
        }}>
          <Database color="#1d4ed8" size={24} style={{ flexShrink: 0 }} />
          <div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '700', color: '#1e3a8a' }}>🔒 Zero-Trust Remote Processing Architecture</h4>
            <p style={{ fontSize: '13px', color: '#1e40af', margin: 0, lineHeight: '1.5' }}>
              All database commands are evaluated on the central PostgreSQL engine. Only summary rows and columns are transmitted back. **No sensitive raw records are downloaded locally to your workspace, preventing compliance data leakage.**
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '32px', marginBottom: '32px' }}>
          {/* Query Editor Box */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', color: '#0f172a' }}>
                <Terminal size={18} color="#0284c7" /> SQL Workbench Editor
              </h3>
              <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>db: postgresql://cipherpulse</span>
            </div>

            <form onSubmit={handleRunQuery} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <textarea 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Write SELECT queries here..."
                style={{
                  width: '100%',
                  height: '140px',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '13px',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#f8fafc',
                  color: '#0f172a',
                  outline: 'none',
                  resize: 'vertical',
                  lineHeight: '1.6'
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertTriangle size={14} color="#d97706" /> SELECT queries only. Modifying keywords are blocked.
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: '#1d4ed8',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '10px 20px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 1px 2px rgba(29, 78, 216, 0.2)',
                    transition: 'background-color 0.2s'
                  }}
                >
                  <Play size={14} fill="#ffffff" />
                  {loading ? 'Executing Query...' : 'Execute Query'}
                </button>
              </div>
            </form>
          </div>

          {/* Quick Query Templates */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', color: '#0f172a' }}>
              <FileText size={18} color="#8b5cf6" /> Query Templates
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Click template to copy or set directly into the SQL workspace.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {templates.map((tpl, idx) => (
                <div 
                  key={idx}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setQuery(tpl.sql)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#eff6ff';
                    e.currentTarget.style.borderColor = '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{tpl.name}</span>
                    <button 
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '2px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(tpl.sql);
                      }}
                      title="Copy SQL"
                    >
                      <Copy size={12} />
                    </button>
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {tpl.sql}
                  </span>
                </div>
              ))}
            </div>
            {copied && (
              <span style={{ fontSize: '11px', color: '#047857', alignSelf: 'flex-end', fontWeight: '600' }}>✓ SQL Copied to clipboard!</span>
            )}
          </div>
        </div>

        {/* Error Output */}
        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '32px',
            color: '#ef4444',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            ❌ <strong>Error:</strong> {error}
          </div>
        )}

        {/* Query Results Ledger Table */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          minHeight: '200px'
        }}>
          {results ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0' }}>
                <span style={{ color: '#047857', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
                  <CheckCircle size={16} /> Results Fetched ({results.count} Rows)
                </span>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> Run Time: {results.execution_time_seconds} seconds
                </span>
              </div>

              {results.count === 0 ? (
                <div style={{ padding: '60px 0', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                  Query executed successfully, but returned 0 rows.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        {results.columns.map((col) => (
                          <th key={col} style={{ padding: '12px 16px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {results.rows.map((row, rIdx) => (
                        <tr key={rIdx} style={{ borderBottom: '1px solid #e2e8f0', transition: 'background-color 0.15s' }}>
                          {results.columns.map((col) => (
                            <td key={col} style={{ padding: '12px 16px', color: '#0f172a', fontFamily: col.includes('score') || col.includes('count') || col.includes('risk') ? 'monospace' : 'inherit' }}>
                              {row[col] !== null ? String(row[col]) : <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>NULL</span>}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            !loading && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '12px', color: '#64748b' }}>
                <Database size={36} color="#cbd5e1" />
                <span style={{ fontSize: '14px' }}>Submit a query in the workbench to preview remote tables live.</span>
              </div>
            )
          )}

          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '16px', color: '#1d4ed8' }}>
              <div style={{
                width: '32px',
                height: '32px',
                border: '3px solid #eff6ff',
                borderTop: '3px solid #1d4ed8',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <span style={{ fontSize: '14px', fontWeight: '600' }}>Running SQL execution query on Postgres server...</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SqlAnalyzer;
