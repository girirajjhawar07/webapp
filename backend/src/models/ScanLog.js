import mongoose from 'mongoose';

const scanLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    timestamp: { type: Date, default: Date.now },
    result: { type: String, enum: ['genuine', 'suspicious', 'not_found', 'expired'] },
    scanInput: {
      qrCode: String,
      barcode: String,
      batchNumber: String,
      sealCode: String
    }
  },
  { timestamps: true }
);

export const ScanLog = mongoose.models.ScanLog || mongoose.model('ScanLog', scanLogSchema);
