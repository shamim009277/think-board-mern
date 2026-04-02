import express from 'express';
const router = express.Router();

import { getAllNotes, createNote, getNoteById, updateNote, deleteNote } from '../controllers/note.controller.js';

router.get('/', getAllNotes);
router.post('/', createNote);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);


export default router;