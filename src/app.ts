import express from 'express';
import { NODE_ENV, PORT } from '@config';
import { Routes } from '@interfaces/routes.interface';
import { logger } from '@utils/logger';
import dotenv from 'dotenv';
import deckRouter from '@/routes/decks.route';
import helloRoute from '@/routes/hello.route';
import flashcardRouter from '@/routes/flashcard.route';

dotenv.config({ path: './backend/.env' });

// Function to initialize routes
const initializeRoutes = (app: express.Application, routes: Routes[]) => {
    routes.forEach(route => {
        app.use('/', route.router);
    });
};

// Function to create and configure the Express app
export const createApp = () => {
    const app = express();
    const env = NODE_ENV || 'development';
    const port = PORT || 3000;

    // Middleware
    app.use(express.json());

    // Routes
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