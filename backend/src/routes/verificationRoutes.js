import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { verifyProduct } from '../services/verificationService.js';

const router = Router();

router.post('/', authRequired, async (req, res) => {
  try {
    const result = await verifyProduct({ userId: req.user.sub, ...req.body });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
