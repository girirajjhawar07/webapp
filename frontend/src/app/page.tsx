'use client';

import { useState } from 'react';
import { ScannerPanel } from '@/components/ScannerPanel';
import { VerificationResultCard } from '@/components/VerificationResultCard';
import { api } from '@/lib/api';

export default function HomePage() {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password123');
  const [token, setToken] = useState('');
  const [result, setResult] = useState<any>(null);
  const [scanHistory, setScanHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const login = async (mode: 'login' | 'register') => {
    setLoading(true);
    try {
      const data = mode === 'login' ? await api.login(email, password) : await api.register(email, password);
      setToken(data.token);
    } finally {
      setLoading(false);
    }
  };

  const verify = async (payload: any) => {
    setLoading(true);
    try {
      const data = await api.verify(token, payload);
      setResult(data);
      setScanHistory((prev) => [{ at: new Date().toISOString(), status: data.status, trustScore: data.trustScore }, ...prev].slice(0, 8));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <header className="card p-4">
        <h1 className="text-2xl font-bold">CosmeticTrust</h1>
        <p className="text-sm text-slate-600">Verify skincare & cosmetics authenticity before use.</p>
      </header>

      {!token ? (
        <section className="card p-4">
          <h2 className="text-lg font-semibold">User Authentication</h2>
          <div className="mt-3 grid gap-2">
            <input className="rounded-xl border p-3" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="rounded-xl border p-3" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button disabled={loading} className="rounded-xl bg-calmBlue p-3 text-white" onClick={() => login('login')}>
              Login
            </button>
            <button disabled={loading} className="rounded-xl border p-3" onClick={() => login('register')}>
              Sign up
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-500">Google login endpoint is available via API and can be wired with OAuth client.</p>
        </section>
      ) : (
        <>
          <ScannerPanel onSubmit={verify} />
          <VerificationResultCard result={result} />

          <section className="card p-4">
            <h3 className="font-semibold">Recent Scan History</h3>
            <ul className="mt-2 space-y-2 text-sm">
              {scanHistory.map((item, idx) => (
                <li key={`${item.at}-${idx}`} className="flex items-center justify-between rounded-lg border p-2">
                  <span>{new Date(item.at).toLocaleString()}</span>
                  <span className="font-semibold capitalize">{item.status}</span>
                  <span>Score {item.trustScore}</span>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
