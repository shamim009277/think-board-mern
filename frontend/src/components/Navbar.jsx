import React from 'react'
import { List,Plus } from 'lucide-react';
export const Navbar = () => {
  return (
    <div className="navbar bg-gray-950 text-white mb-8 rounded-lg flex items-center justify-between">
      <div className="flex">
        <a className="btn btn-ghost text-xl"> <List/> ThinkBoard</a>
      </div>
      <div className="flex-none">
        <a href="/create" className="btn btn-primary text-sm">
          <Plus className='mr-1' />
          Create Note
        </a>
      </div>
    </div>
  )
}

export default Navbar
