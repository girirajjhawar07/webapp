const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export type VerifyPayload = {
  qrCode?: string;
  barcode?: string;
  batchNumber?: string;
  sealCode?: string;
};

export const api = {
  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },
  async register(email: string, password: string) {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Register failed');
    return res.json();
  },
  async verify(token: string, payload: VerifyPayload) {
    const res = await fetch(`${API_BASE}/api/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Verification failed');
    return res.json();
  }
};
