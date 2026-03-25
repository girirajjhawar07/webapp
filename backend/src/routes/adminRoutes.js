import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { authRequired, requireRole } from '../middleware/auth.js';
import { productRepo } from '../services/repositories.js';

const router = Router();

router.use(authRequired, requireRole('brandAdmin'));

router.post('/batches', async (req, res) => {
  const { brand, name, batchNumber, manufacturingDate, expiryDate, units = 1 } = req.body;
  const rows = Array.from({ length: units }).map((_, i) => ({
    brand,
    name,
    batchNumber,
    manufacturingDate,
    expiryDate,
    qrCode: `QR-${batchNumber}-${uuidv4().slice(0, 8)}`,
    unitSerial: `${batchNumber}-${String(i + 1).padStart(6, '0')}`,
    sealSignature: `SEAL-${uuidv4().slice(0, 6)}`,
    authenticityStatus: 'genuine'
  }));

  const created = await productRepo.createMany(rows);
  res.status(201).json({ count: created.length, samples: created.slice(0, 5) });
});

router.get('/products/:brand', async (req, res) => {
  const products = await productRepo.listByBrand(req.params.brand);
  res.json(products);
});

export default router;
