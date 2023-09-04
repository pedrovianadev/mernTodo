import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import NoteModel from './models/note';

const app = express();

app.get('/', async (_req, res, next) => {
	try {
		// This throw error is just for handling with an error
		// throw Error('Oops!');
		const notes = await NoteModel.find().exec();
		return res.status(200).json(notes);
	} catch (error) {
		next(error);
	}
	
});

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