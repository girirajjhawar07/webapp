import { nanoid } from 'nanoid';

const now = new Date();
const month = 1000 * 60 * 60 * 24 * 30;

export const memoryStore = {
  users: [
    {
      _id: 'u_demo_brand',
      email: 'brand@dermaguard.com',
      passwordHash: '',
      provider: 'email',
      role: 'brandAdmin',
      scanHistory: []
    }
  ],
  products: [
    {
      _id: 'p_001',
      brand: 'DermaGuard',
      name: 'Vitamin C Brightening Serum',
      batchNumber: 'DG24VC0912',
      manufacturingDate: new Date(now.getTime() - month * 6),
      expiryDate: new Date(now.getTime() + month * 12),
      qrCode: 'QR-DG-VC-00001',
      authenticityStatus: 'genuine',
      sealSignature: 'SEAL-DG-77X',
      unitSerial: 'DGVC-00001'
    },
    {
      _id: 'p_002',
      brand: 'PureHydra',
      name: 'Ceramide Barrier Cream',
      batchNumber: 'PH23CB1102',
      manufacturingDate: new Date(now.getTime() - month * 15),
      expiryDate: new Date(now.getTime() + month * 1),
      qrCode: 'QR-PH-CB-01010',
      authenticityStatus: 'genuine',
      sealSignature: 'SEAL-PH-19B',
      unitSerial: 'PHCB-01010'
    }
  ],
  scanLogs: []
};

export const createId = (prefix = 'id') => `${prefix}_${nanoid(10)}`;
