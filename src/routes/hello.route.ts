// routes/deckRouter.ts
import express from 'express';

const router = express.Router();

router.get('/hello', async (req, res) => {
  return res.status(200).json({ message: 'Hello, world!' });
});

export default router;