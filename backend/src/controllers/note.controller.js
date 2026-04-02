import Note from '../models/noteModel.js';

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        
        if (!notes || notes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No notes found",
            });
        }
        return res.status(200).json({
            success: true,
            count: notes.length,
            data: notes,
        });

    } catch (error) {
        console.error("Get Notes Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ status: false, message: 'Note not found' });
        }

        res.status(200).json({ status: true, message: 'get note by id successfully', data: note });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const createNote = async (req, res) => {
    try {
        const note = await Note.create(req.body);
        res.status(201).json({ status: true, message: 'create a new note successfully', data: note });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!note) {
            return res.status(404).json({ status: false, message: 'Note not found' });
        }

        res.status(200).json({ status: true, message: 'update a specific note successfully', data: note });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);

        if (!note) {
            return res.status(404).json({ status: false, message: 'Note not found' });
        }
        res.status(200).json({ status: true, message: 'delete a specific note successfully', data: note });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};