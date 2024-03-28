import express from 'express';
import db from '@/config/db';

const router = express.Router();

router.post('/flashcards', async (req, res) => {
  try {
    const { question, answer, deckId } = req.body;

    const flashcard = await db.flashCard.create({
      data: {
        question,
        answer,
        deck: {
          connect: { id: deckId },
        },
      },
    });

    res.status(201).json(flashcard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the flashcard.' });
  }
});

export default router;