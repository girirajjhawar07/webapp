import 'dotenv/config';
import mongoose from 'mongoose';
import { Product } from '../models/Product.js';

const run = async () => {
  if (!process.env.MONGODB_URI) {
    console.log('Set MONGODB_URI to seed MongoDB.');
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI);

  await Product.deleteMany({});
  await Product.insertMany([
    {
      brand: 'DermaGuard',
      name: 'Vitamin C Brightening Serum',
      batchNumber: 'DG24VC0912',
      manufacturingDate: new Date('2025-09-01'),
      expiryDate: new Date('2027-09-01'),
      qrCode: 'QR-DG-VC-00001',
      authenticityStatus: 'genuine',
      sealSignature: 'SEAL-DG-77X',
      unitSerial: 'DGVC-00001'
    }
  ]);

  console.log('Seed complete.');
  await mongoose.disconnect();
};

run().catch(console.error);
