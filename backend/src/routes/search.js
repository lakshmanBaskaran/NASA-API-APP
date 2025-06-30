import { Router } from 'express';
import searchClient from '../searchClient.js';

const router = Router();

/**
 * GET /api/search
 * Passthrough for NASA Images & Video Library
 * Every query param is forwarded verbatim.
 */
router.get('/', async (req, res, next) => {
  try {
    const { data } = await searchClient.get('/search', { params: req.query });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
