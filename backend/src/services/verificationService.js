import { productRepo, scanRepo } from './repositories.js';

const daysBetween = (a, b) => Math.ceil((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));

const calcTrustScore = ({ found, expired, duplicated, sealValid }) => {
  if (!found) return 10;

  let score = 100;
  if (expired) score -= 40;
  if (duplicated) score -= 25;
  if (!sealValid) score -= 20;
  return Math.max(5, score);
};

export const verifyProduct = async ({ userId, qrCode, barcode, batchNumber, sealCode }) => {
  const product = await productRepo.findByScanInput({ qrCode, barcode, batchNumber });
  if (!product) {
    await scanRepo.create({
      userId,
      productId: null,
      result: 'not_found',
      scanInput: { qrCode, barcode, batchNumber, sealCode }
    });

    return {
      status: 'not_found',
      message: 'Product not found in verified brand registry.',
      trustScore: 10,
      color: 'red'
    };
  }

  const now = new Date();
  const expiry = new Date(product.expiryDate);
  const expired = expiry.getTime() < now.getTime();

  const scanCount = await scanRepo.countByProduct(product._id);
  const duplicated = scanCount >= 4;

  const sealValid = !sealCode || sealCode === product.sealSignature;
  const nearExpiry = !expired && daysBetween(now, expiry) <= 45;

  let status = 'genuine';
  if (expired) status = 'expired';
  else if (duplicated || !sealValid || nearExpiry) status = 'suspicious';

  const trustScore = calcTrustScore({ found: true, expired, duplicated, sealValid });

  await scanRepo.create({
    userId,
    productId: product._id,
    result: status,
    scanInput: { qrCode, barcode, batchNumber, sealCode }
  });

  return {
    status,
    color: status === 'genuine' ? 'green' : status === 'suspicious' ? 'yellow' : 'red',
    trustScore,
    tamperCheck: sealValid ? 'Seal appears valid' : 'Seal mismatch detected',
    anomalies: duplicated ? ['High duplicate scan frequency'] : [],
    product: {
      brand: product.brand,
      name: product.name,
      batchNumber: product.batchNumber,
      manufacturingDate: product.manufacturingDate,
      expiryDate: product.expiryDate,
      qrCode: product.qrCode
    }
  };
};
