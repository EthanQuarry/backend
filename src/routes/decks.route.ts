// routes/deckRouter.ts
import express from 'express';
import db from '@/config/db';

const router = express.Router();

router.get('/decks', async (req, res) => {
  try {
    const decks = await db.deck.findMany();

    res.status(200).json(decks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching decks.' });
  }
})

router.post('/decks/create', async (req, res) => {
  console.log(req.body)
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

router.post('/decks/get', async (req, res) => {
  try {
    const { id } = req.body;

    const deck = await db.deck.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(deck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the deck.' });
  }
})

router.post('/decks/update', async (req, res) => {
  try {
     const { id, flashcards } = req.body;

    if (id && flashcards) {
      const upsertFlashCards = await Promise.all(flashcards.map(flashcard =>
        db.flashCard.upsert({
          where: { term: flashcard.term }, 
          update: {
            term: flashcard.term,
            definition: flashcard.definition,
            deckId: id,
          },
          create: {
            term: flashcard.term,
            definition: flashcard.definition,
            deckId: id,
          },
        })
      ));
    }

     const allFlashcards = await db.flashCard.findMany({
      where: {
        deckId: id,
      }
     })

 
     res.status(200).json(allFlashcards);
  } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'An error occurred while updating the flashcards.' });
  }
 });

export default router;