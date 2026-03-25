import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    name: { type: String, required: true },
    batchNumber: { type: String, required: true, index: true },
    manufacturingDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    qrCode: { type: String, required: true, unique: true, index: true },
    authenticityStatus: {
      type: String,
      enum: ['genuine', 'suspicious', 'not_found'],
      default: 'genuine'
    },
    sealSignature: { type: String, required: true },
    unitSerial: { type: String, required: true }
  },
  { timestamps: true }
);

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
