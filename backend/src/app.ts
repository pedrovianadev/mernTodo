import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import notesRoutes from './routes/notes';

const app = express();

app.use(express.json());

app.use('/api/notes', notesRoutes);

app.use((req, res, next) => {
	next(Error('Endpoint not found'));
	res.status(404);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
	console.error(error);
	let errorMessage = 'Something went wrong';
	if(error instanceof Error) errorMessage = error.message;
	return res.status(404).json({ error: errorMessage });
});


export default app;