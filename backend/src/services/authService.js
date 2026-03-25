import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userRepo } from './repositories.js';

const secret = () => process.env.JWT_SECRET || 'dev-secret';

export const createToken = (user) =>
  jwt.sign({ sub: user._id, email: user.email, role: user.role }, secret(), { expiresIn: '7d' });

export const register = async ({ email, password, role = 'consumer' }) => {
  const exists = await userRepo.findByEmail(email);
  if (exists) throw new Error('Email already exists');

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await userRepo.create({ email: email.toLowerCase(), passwordHash, provider: 'email', role });
  return { user, token: createToken(user) };
};

export const login = async ({ email, password }) => {
  const user = await userRepo.findByEmail(email);
  if (!user || !user.passwordHash) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error('Invalid credentials');

  return { user, token: createToken(user) };
};

export const googleLogin = async ({ email }) => {
  let user = await userRepo.findByEmail(email);
  if (!user) {
    user = await userRepo.create({ email: email.toLowerCase(), provider: 'google', role: 'consumer' });
  }
  return { user, token: createToken(user) };
};
