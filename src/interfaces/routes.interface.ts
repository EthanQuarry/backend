import { Router } from 'express';

export interface Routes {
  path?: string;
  router: Router;
}

export interface StudySet {
    name: string;
    description: string;
}

export interface DatabaseStudySet extends StudySet {
    id: string;
    flashcards: Flashcard[];
}


export interface Flashcard {
    term: string;
    definition: string;
}

export interface DatabaseFlashcard extends Flashcard {
    id: string;
    deckId: string;
}