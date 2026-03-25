'use client';

const palette = {
  genuine: 'border-trustGreen bg-green-50 text-trustGreen',
  suspicious: 'border-trustYellow bg-amber-50 text-trustYellow',
  expired: 'border-trustRed bg-rose-50 text-trustRed',
  not_found: 'border-trustRed bg-rose-50 text-trustRed'
} as const;

export function VerificationResultCard({ result }: { result: any }) {
  if (!result) return null;

  return (
    <div className={`card mt-4 border-2 p-4 ${palette[result.status as keyof typeof palette] || ''}`}>
      <p className="text-xs font-semibold uppercase tracking-wide">{result.status.replace('_', ' ')}</p>
      <p className="mt-1 text-3xl font-bold">Trust Score: {result.trustScore}</p>
      {result.product && (
        <div className="mt-3 space-y-1 text-sm text-slate-800">
          <p>
            <strong>{result.product.brand}</strong> · {result.product.name}
          </p>
          <p>Batch: {result.product.batchNumber}</p>
          <p>MFG: {new Date(result.product.manufacturingDate).toLocaleDateString()}</p>
          <p>EXP: {new Date(result.product.expiryDate).toLocaleDateString()}</p>
          <p>{result.tamperCheck}</p>
        </div>
      )}
      {result.message && <p className="mt-2 text-sm text-slate-700">{result.message}</p>}
      {!!result.anomalies?.length && (
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
          {result.anomalies.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
