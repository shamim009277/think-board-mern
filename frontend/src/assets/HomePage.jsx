import React from 'react'
import toast from 'react-hot-toast'
import { Toaster } from "react-hot-toast";

export const HomePage = () => {
  return (
    <div>
      <button
        className='ml-2 mt-2 py-1 px-4 bg-blue-500 text-white rounded-sm'
        onClick={() => toast.success('Successfully toasted!')}
      >
        Note
      </button>
      <Toaster />
    </div>
  )
}

export default HomePage