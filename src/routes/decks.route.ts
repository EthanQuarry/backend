// routes/deckRouter.ts
import express from 'express';
import db from '@/config/db';

const router = express.Router();

router.post('/decks', async (req, res) => {
  try {
    const { name, description } = req.body;

    const deck = await db.deck.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).json(deck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the deck.' });
  }
});

export default router;