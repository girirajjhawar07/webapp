import mongoose from 'mongoose';

let usingMemoryStore = false;

export const connectDb = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    usingMemoryStore = true;
    console.warn('MONGODB_URI not provided. Using in-memory demo store.');
    return;
  }

  await mongoose.connect(uri);
  usingMemoryStore = false;
  console.log('MongoDB connected');
};

export const isMemoryStore = () => usingMemoryStore;
