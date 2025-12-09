import { useState, useEffect } from 'react'

interface Analytics {
  totalClaims: number
  pendingClaims: number
  approvedClaims: number
  deniedClaims: number
  activeRules: number
}

interface Claim {
  id: string
  memberId: string
  providerId: string
  amount: number
  status: string
  createdAt: string
}

function App() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [claims, setClaims] = useState<Claim[]>([])

  useEffect(() => {
    fetch('/api/analytics').then(r => r.json()).then(setAnalytics).catch(() => {})
    fetch('/api/claims').then(r => r.json()).then(setClaims).catch(() => {})
  }, [])

  const addSampleClaim = async () => {
    const claim = {
      memberId: `MEM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      providerId: `PRV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      amount: Math.floor(Math.random() * 5000) + 100,
      type: '837P',
      diagnosis: 'J06.9'
    }
    const res = await fetch('/api/claims', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(claim)
    })
    const newClaim = await res.json()
    setClaims([...claims, newClaim])
    fetch('/api/analytics').then(r => r.json()).then(setAnalytics)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🏥 Clover Health Platform</h1>
        <p>Medicare Advantage Claims Processing & Payment Integrity</p>
      </header>

      <main className="main">
        <div className="stats">
          <div className="stat-card">
            <h3>Total Claims</h3>
            <div className="value">{analytics?.totalClaims || 0}</div>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <div className="value">{analytics?.pendingClaims || 0}</div>
          </div>
          <div className="stat-card">
            <h3>Approved</h3>
            <div className="value">{analytics?.approvedClaims || 0}</div>
          </div>
          <div className="stat-card">
            <h3>Active Rules</h3>
            <div className="value">{analytics?.activeRules || 0}</div>
          </div>
        </div>

        <div className="section">
          <h2>Products</h2>
          <div className="products">
            <div className="product-card">
              <h3>Claims Processing System</h3>
              <p>Comprehensive claims adjudication replacing HealthEdge HRP</p>
              <ul className="features">
                <li>EDI 837i/837p Processing</li>
                <li>Real-time Eligibility</li>
                <li>Provider Network Management</li>
                <li>Automated Pricing</li>
              </ul>
            </div>
            <div className="product-card">
              <h3>Payment Integrity Platform</h3>
              <p>AI-powered prepay fraud detection system</p>
              <ul className="features">
                <li>LLM-Based Assessment</li>
                <li>ML Pattern Detection</li>
                <li>Fraud Flagging System</li>
                <li>Provider Communications</li>
              </ul>
            </div>
            <div className="product-card">
              <h3>Claims Edit Engine</h3>
              <p>Rules-based validation (post-HealthEdge, pre-payment)</p>
              <ul className="features">
                <li>Deterministic Rules Engine</li>
                <li>Rule Maintenance UI</li>
                <li>LLM Evaluation (Phase 2)</li>
                <li>Sub-20s Response Time</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>Recent Claims</h2>
            <button className="btn" onClick={addSampleClaim}>+ Add Sample Claim</button>
          </div>
          {claims.length === 0 ? (
            <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
              No claims yet. Click "Add Sample Claim" to create one.
            </p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Claim ID</th>
                  <th>Member</th>
                  <th>Provider</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {claims.slice(-10).reverse().map(claim => (
                  <tr key={claim.id}>
                    <td>{claim.id.slice(0, 8)}...</td>
                    <td>{claim.memberId}</td>
                    <td>{claim.providerId}</td>
                    <td>${claim.amount?.toLocaleString()}</td>
                    <td><span className={`status ${claim.status}`}>{claim.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
