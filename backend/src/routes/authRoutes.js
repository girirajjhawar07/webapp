import { Router } from 'express';
import { googleLogin, login, register } from '../services/authService.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const result = await register(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.post('/google', async (req, res) => {
  try {
    const result = await googleLogin(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
