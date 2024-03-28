import express from 'express';
import db from '@/config/db';

const router = express.Router();

router.post('/flashcards/get', async (req, res) => {
  try {
    const { id } = req.body;

    const flashcard = await db.flashCard.findMany({
        where: {
          deckId: id,
        }
    });

    res.status(201).json(flashcard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the flashcard.' });
  }
});

export default router;