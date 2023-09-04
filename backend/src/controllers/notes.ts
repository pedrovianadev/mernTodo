import { RequestHandler } from 'express';
import NoteModel from '../models/note';

export const getNotes: RequestHandler = async (_req, res, next) => {
	try {
		const notes = await NoteModel.find().exec();
		return res.status(200).json(notes);
	} catch (error) {
		next(error);
	}
	
};