import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String },
    provider: { type: String, enum: ['email', 'google'], default: 'email' },
    role: { type: String, enum: ['consumer', 'brandAdmin'], default: 'consumer' },
    scanHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ScanLog' }]
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
