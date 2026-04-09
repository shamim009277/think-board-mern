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

// export const createNote = async (req, res) => {
//     try {
//         const note = await Note.create(req.body);
//         res.status(201).json({ status: true, message: 'create a new note successfully', data: note });
//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };

export const createNote = async (req, res) => {
    try {
        const note = await Note.create(req.body);
        res.status(201).json({
            success: true,
            message: "Note created successfully",
            data: note
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { title, description } = req.body;
        let errors = {};

        // ✅ validation
        if (!title || title.trim() === "") {
            errors.title = "Title is required";
        }

        if (!description || description.trim() === "") {
            errors.description = "Description is required";
        } else if (description.length < 10) {
            errors.description = "Description must be at least 10 characters";
        }

        // ❌ validation error হলে return
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors
            });
        }

        // ✅ update (mongoose validation enable)
        const note = await Note.findByIdAndUpdate(
            req.params.id,
            { title, description },
            {
                new: true,
                runValidators: true
            }
        );

        // ❌ not found
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            data: note
        });
    } catch (error) {
        // ✅ mongoose validation error
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors
            });
        }
        // ❌ server error
        res.status(500).json({
            success: false,
            message: error.message
        });
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