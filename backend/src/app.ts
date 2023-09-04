import 'dotenv/config';
import express from 'express';
import NoteModel from './models/note';

const app = express();

app.get('/', async (_req, res) => {
	const notes = await NoteModel.find().exec();
	return res.status(200).json(notes);
});


export default app;