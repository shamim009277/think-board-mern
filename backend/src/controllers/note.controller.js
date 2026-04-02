export const getAllNotes = (req, res) => {
  res.status(200).json({ message: 'get all notes' });
};

export const getNoteById = (req, res) => {
    res.status(200).json({ message: 'get a specific note' });
};

export const createNote = (req, res) => {
    res.status(201).json({ message: 'create a new note successfully' });
};

export const updateNote = (req, res) => {
    res.status(200).json({ message: 'update a specific note successfully' });
};

export const deleteNote = (req, res) => {
    res.status(200).json({ message: 'delete a specific note successfully' });
};