import React from 'react';
import { ArrowRight } from 'lucide-react';
import videologo from '../assets/AI-Video-of-alien-in-Las-vegas.gif'
import Navbar from './Navbar';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Hero section with navbar */}
      <div className="relative">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
        
      <Navbar />

        <div className="w-full bg-black rounded-3xl p-10 overflow-hidden relative">
      {/* Container for the entire hero section */}
      <div className="flex flex-col md:flex-row items-center">
        {/* Left side text content */}
        <div className="w-full md:w-1/2 px-8 py-16 md:py-24 md:pl-16 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
            Explore Our Dedicated AI Unified All In One Platform
          </h1>
          
          <div>
            <a 
              href="#create-account" 
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-400 text-white font-medium rounded-full hover:opacity-90 transition-opacity"
            >
              Create an Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            {/* <p className="text-gray-400 mt-4 text-sm">No credit card needed</p> */}
          </div>
        </div>
        
        {/* Right side image */}
        <div className="w-full md:w-1/2 h-full">
          <img 
            src={videologo}
            alt="AI generated alien character" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Subtle gradient overlay (optional - for better text visibility) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent pointer-events-none md:block hidden"></div>
    </div>






        
        {/* Hero text */}
        <div className="px-6 md:px-12 py-8 text-center">
          <h6 className="text-sm md:text-base opacity-80 max-w-4xl mx-auto">
            With our dedicated AI video generator, you can create high-quality 4-second video clips and animations in moments - all from a single image or text prompt, with no need to produce or edit longer films.
          </h6>
        </div>
      </div>
      
      {/* Feature cards grid - SMALLER CARDS */}
      <div className="px-6 md:px-12 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Card 1 - SMALLER */}
        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
          <div className="rounded-full bg-purple-600/20 h-10 w-10 flex items-center justify-center mb-3">
            <svg className="h-5 w-5 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" fillOpacity="0.5" />
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Bring Your Images to Life</h2>
          <p className="text-gray-400 text-sm">
            Turn AI generations from your Personal Feed and uploaded images into high-quality AI video in seconds, breathing new life into your creations.
          </p>
        </div>
        
        {/* Card 2 - SMALLER */}
        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
          <div className="rounded-full bg-purple-600/20 h-10 w-10 flex items-center justify-center mb-3">
            <svg className="h-5 w-5 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="12" height="16" rx="2" fillOpacity="0.5" />
              <rect x="9" y="8" width="6" height="8" rx="1" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Explore a New Mode of Storytelling</h2>
          <p className="text-gray-400 text-sm">
            Use AI video to craft compelling narratives for branded or personal projects. Combine AI generated video with other content media craft dynamic and engaging stories.
          </p>
        </div>
        
        {/* Card 3 - SMALLER */}
        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
          <div className="rounded-full bg-purple-600/20 h-10 w-10 flex items-center justify-center mb-3">
            <svg className="h-5 w-5 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
              <rect x="4" y="4" width="16" height="16" rx="2" fillOpacity="0.5" />
              <path d="M8 12h8M12 8v8" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Accelerate Your Video Production Process</h2>
          <p className="text-gray-400 text-sm">
            Quickly generate AI videos from a selection of image styles and aesthetics, perfectly aligning with your video project needs.
          </p>
        </div>
        
        {/* Card 4 - SMALLER */}
        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
          <div className="rounded-full bg-purple-600/20 h-10 w-10 flex items-center justify-center mb-3">
            <svg className="h-5 w-5 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fillOpacity="0.5" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Create Animated Storyboards and Trailers</h2>
          <p className="text-gray-400 text-sm">
            Use our AI video tools to guide your tram through pre-production - create sizzle reels, pre-viz, storyboards and concept art.
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;