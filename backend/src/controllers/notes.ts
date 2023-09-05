import { RequestHandler } from 'express';
import NoteModel from '../models/note';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export const getNotes: RequestHandler = async (_req, res, next) => {
	try {
		const notes = await NoteModel.find().exec();
		return res.status(200).json(notes);
	} catch (error) {
		next(error);
	}
	
};

export const getNote: RequestHandler = async (req, res, next) => {
	const noteId = req.params.noteId;

	try {
		if (!mongoose.isValidObjectId(noteId)) {
			throw createHttpError(400, 'Invalid note id');
		}

		const note = await NoteModel.findById(noteId).exec();

		if (!note) {
			throw createHttpError(404, 'Note not found');
		}

		return res.status(200).json(note);
	} catch (error) {
		next(error);
	}
};

interface CreateNoteBody {
	title: string,
	text?: string,
}

export const createNotes: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
	const title = req.body.title;
	const text = req.body.text;
    
	try {
		if (!title) {
			throw createHttpError(400, 'Note mus have a title');
		}

		const newNote = await NoteModel.create({
			title: title,
			text: text,
		});

		return res.status(201).json(newNote);
	} catch (error) {
		next(error);
	}
};