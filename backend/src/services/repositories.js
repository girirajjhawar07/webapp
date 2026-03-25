import { isMemoryStore } from '../config/db.js';
import { createId, memoryStore } from '../data/memoryStore.js';
import { Product } from '../models/Product.js';
import { ScanLog } from '../models/ScanLog.js';
import { User } from '../models/User.js';

export const userRepo = {
  async findByEmail(email) {
    if (isMemoryStore()) return memoryStore.users.find((u) => u.email === email.toLowerCase()) || null;
    return User.findOne({ email: email.toLowerCase() });
  },
  async create(data) {
    if (isMemoryStore()) {
      const user = { _id: createId('u'), scanHistory: [], ...data };
      memoryStore.users.push(user);
      return user;
    }
    return User.create(data);
  },
  async findById(id) {
    if (isMemoryStore()) return memoryStore.users.find((u) => u._id === id) || null;
    return User.findById(id);
  }
};

export const productRepo = {
  async findByScanInput({ qrCode, batchNumber, barcode }) {
    if (isMemoryStore()) {
      return (
        memoryStore.products.find((p) => p.qrCode === qrCode) ||
        memoryStore.products.find((p) => p.batchNumber === batchNumber) ||
        memoryStore.products.find((p) => p.unitSerial === barcode) ||
        null
      );
    }

    return (
      (qrCode && (await Product.findOne({ qrCode }))) ||
      (batchNumber && (await Product.findOne({ batchNumber }))) ||
      (barcode && (await Product.findOne({ unitSerial: barcode }))) ||
      null
    );
  },
  async createMany(rows) {
    if (isMemoryStore()) {
      const created = rows.map((r) => ({ _id: createId('p'), ...r }));
      memoryStore.products.push(...created);
      return created;
    }
    return Product.insertMany(rows);
  },
  async listByBrand(brand) {
    if (isMemoryStore()) return memoryStore.products.filter((p) => p.brand === brand);
    return Product.find({ brand });
  }
};

export const scanRepo = {
  async create(data) {
    if (isMemoryStore()) {
      const scan = { _id: createId('s'), ...data, timestamp: new Date() };
      memoryStore.scanLogs.push(scan);
      return scan;
    }
    return ScanLog.create(data);
  },
  async countByProduct(productId) {
    if (isMemoryStore()) return memoryStore.scanLogs.filter((s) => s.productId === productId).length;
    return ScanLog.countDocuments({ productId });
  },
  async recentByProduct(productId, limit = 20) {
    if (isMemoryStore()) {
      return memoryStore.scanLogs.filter((s) => s.productId === productId).slice(-limit);
    }
    return ScanLog.find({ productId }).sort({ createdAt: -1 }).limit(limit);
  }
};
