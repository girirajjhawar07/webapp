'use client';

import { useState } from 'react';

type Props = {
  onSubmit: (data: { qrCode?: string; barcode?: string; batchNumber?: string; sealCode?: string }) => Promise<void>;
};

const parseBatchFromText = (text: string) => {
  const match = text.match(/[A-Z]{2,}\d{2}[A-Z]{2}\d{4}/i);
  return match?.[0]?.toUpperCase();
};

export function ScannerPanel({ onSubmit }: Props) {
  const [qrCode, setQrCode] = useState('QR-DG-VC-00001');
  const [barcode, setBarcode] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [sealCode, setSealCode] = useState('SEAL-DG-77X');
  const [ocrText, setOcrText] = useState('');

  return (
    <div className="card p-4">
      <h2 className="text-lg font-semibold">Scan → Verify → Result</h2>
      <p className="mt-1 text-sm text-slate-600">Use camera scanner, barcode, or batch code entry.</p>

      <div className="mt-4 grid gap-2">
        <input className="rounded-xl border p-3" value={qrCode} onChange={(e) => setQrCode(e.target.value)} placeholder="QR code" />
        <input className="rounded-xl border p-3" value={barcode} onChange={(e) => setBarcode(e.target.value)} placeholder="Barcode / unit serial" />
        <input className="rounded-xl border p-3" value={batchNumber} onChange={(e) => setBatchNumber(e.target.value)} placeholder="Batch number" />
        <input className="rounded-xl border p-3" value={sealCode} onChange={(e) => setSealCode(e.target.value)} placeholder="Seal signature" />
      </div>

      <div className="mt-3 rounded-xl border bg-slate-50 p-3 text-sm">
        <p className="font-medium">OCR helper (simulated)</p>
        <textarea
          className="mt-2 w-full rounded-lg border p-2"
          rows={2}
          value={ocrText}
          placeholder="Paste label text (e.g., Lot DG24VC0912...)"
          onChange={(e) => {
            setOcrText(e.target.value);
            const parsed = parseBatchFromText(e.target.value);
            if (parsed) setBatchNumber(parsed);
          }}
        />
      </div>

      <button
        className="mt-4 w-full rounded-xl bg-calmBlue px-4 py-3 font-semibold text-white"
        onClick={() => onSubmit({ qrCode, barcode, batchNumber, sealCode })}
      >
        Verify Product
      </button>
    </div>
  );
}
