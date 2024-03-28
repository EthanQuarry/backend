import express from 'express';
import { NODE_ENV, PORT } from '@config';
import { logger } from '@utils/logger';
import cors from 'cors';
import deckRouter from '@/routes/decks.route';
import helloRoute from '@/routes/hello.route';
import flashcardRouter from '@/routes/flashcard.route';



export const createApp = () => {
    const app = express();
    const env = NODE_ENV || 'development';
    const port = PORT || 3000;

    app.use(cors());
    app.use(express.json());
    app.use('/api', deckRouter);
    app.use('/api', flashcardRouter);
    app.use('/api', helloRoute);

    const listen = () => {
        app.listen(port, () => {
            logger.info(`=================================`);
            logger.info(`======= ENV: ${env} =======`);
            logger.info(`🚀 App listening on the port ${port}`);
            logger.info(`=================================`);
        });
    };

    return { app, listen };
};