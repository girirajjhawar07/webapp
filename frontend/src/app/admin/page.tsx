'use client';

import { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [brand, setBrand] = useState('DermaGuard');
  const [name, setName] = useState('Niacinamide Repair Gel');
  const [batchNumber, setBatchNumber] = useState('DG26NR0101');
  const [units, setUnits] = useState(10);
  const [result, setResult] = useState<any>(null);

  const generate = async () => {
    const res = await fetch(`${API_BASE}/api/admin/batches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        brand,
        name,
        batchNumber,
        manufacturingDate: new Date().toISOString(),
        expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 2).toISOString(),
        units
      })
    });

    setResult(await res.json());
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Brand Dashboard</h1>
      <div className="card grid gap-2 p-4">
        <input className="rounded-xl border p-3" placeholder="Brand admin JWT token" value={token} onChange={(e) => setToken(e.target.value)} />
        <input className="rounded-xl border p-3" value={brand} onChange={(e) => setBrand(e.target.value)} />
        <input className="rounded-xl border p-3" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="rounded-xl border p-3" value={batchNumber} onChange={(e) => setBatchNumber(e.target.value)} />
        <input className="rounded-xl border p-3" type="number" value={units} onChange={(e) => setUnits(Number(e.target.value))} />
        <button onClick={generate} className="rounded-xl bg-calmBlue p-3 font-semibold text-white">
          Generate Unit QR Codes
        </button>
      </div>
      {result && <pre className="card overflow-auto p-4 text-xs">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
