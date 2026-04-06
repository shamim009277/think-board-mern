import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Swal from "sweetalert2";
import { Navbar } from '../components/Navbar';
import { Trash, SquarePen } from 'lucide-react';
import axios from 'axios';

export const HomePage = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/notes');
            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }
            const data = await response.json();
            setNotes(data.data || []);
        } catch (error) {
            setError(error.message);
            toast.error("Failed to load notes");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5000/api/notes/${id}`);
                    toast.success("Deleted successfully");
                    setNotes(notes.filter((note) => note._id !== id));
                } catch (error) {
                    toast.error("Delete failed");
                }
            }
        });
    };

    return (
        <div className='max-w-7xl mx-auto p-8 min-h-screen'>
            <Navbar />
            <div className="bg-gray-800 rounded-md py-8 px-4 mb-8">
                {/* LOADING STATE */}
                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <span className=" text-purple-500 loading loading-ring loading-xs"></span>
                        <span className=" text-purple-500 loading loading-ring loading-sm"></span>
                        <span className=" text-purple-500 loading loading-ring loading-md"></span>
                        <span className=" text-purple-500 loading loading-ring loading-lg"></span>
                        <span className=" text-purple-500 loading loading-ring loading-xl"></span>
                    </div>
                ) : error ? (
                    /* ERROR STATE */
                    <div className="text-center text-red-500">
                        {error}
                    </div>
                ) : notes.length === 0 ? (
                    /* EMPTY STATE */
                    <div className="text-center text-gray-400">
                        No notes found
                    </div>
                ) : (
                    /* NOTES GRID */
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {notes.map((note) => (
                            <div key={note._id} className='bg-gray-700 min-h-32 p-4 rounded-md hover:bg-gray-600 transition duration-300'>
                                <h2 className="text-xl font-bold mb-2 text-orange-500">
                                    {note.title}
                                </h2>

                                <p className="text-gray-300 leading-5 text-sm">
                                    {note.description.length > 100
                                        ? note.description.substring(0, 100) + '...'
                                        : note.description}
                                </p>

                                <div className='flex items-center justify-between mt-10'>
                                    <p className="text-xs text-gray-400">
                                        {note.createdAt
                                            ? new Date(note.createdAt).toLocaleDateString()
                                            : 'No date'}
                                    </p>

                                    <div className='flex items-center gap-3'>
                                        <button className="text-blue-400 hover:text-blue-300" onClick={() => toast.success("Edit clicked")}>
                                            <SquarePen className='w-4 h-4' />
                                        </button>

                                        <button
                                            className="text-red-500 hover:text-red-400"
                                            onClick={() => handleDelete(note._id)}
                                        >
                                            <Trash className='w-4 h-4' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Toaster position="top-right" />
        </div>
    );
};

export default HomePage;