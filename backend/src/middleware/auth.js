import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const requireRole = (role) => (req, res, next) => {
  if (req.user?.role !== role) return res.status(403).json({ message: 'Forbidden' });
  return next();
};
