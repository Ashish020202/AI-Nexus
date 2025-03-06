import React from 'react'
import { ChevronDown } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div>
         {/* Navbar */}
         <nav className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12">
          <div className="flex items-center">
            <div className="mr-8">
              
              <span className="ml-2 text-xl font-semibold">Unified.Ai</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <div className="flex items-center">
                <button onClick={()=>navigate('/Textgeneration')}>Text Generation</button>
                <ChevronDown className="ml-1 h-4 w-4" />
              </div>
              <div className="flex items-center">
                <button onClick={()=>navigate('/ImageGeneation')}>Image Generation</button>
                <ChevronDown className="ml-1 h-4 w-4" />
              </div>
              <button onClick={()=>navigate('/Musicgeneration')}>Music Generation</button>
              
              <button onClick={()=>navigate('/Videogeneration')}>Video Generation</button>
            </div>
          </div>
          
          <button className="rounded-full bg-zinc-800 px-6 py-2 hover:bg-zinc-700 transition-colors">
            Launch App
          </button>
        </nav>
    </div>
  )
}

export default Navbar
