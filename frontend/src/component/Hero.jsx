import React from 'react';

export const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-700 text-white h-screen flex items-center">
      <div className="container mx-auto px-6 py-20 md:py-0">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              AI-Powered Disease Detection
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Early detection, accurate diagnosis, and personalized treatment plans powered by cutting-edge artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-indigo-900 px-8 py-3 rounded-lg font-bold text-lg hover:bg-indigo-100 transition duration-300">
                Get Started
              </button>
              <button className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white hover:bg-opacity-10 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-5/12">
            <img 
              src="/api/placeholder/600/500" 
              alt="AI Medical Analysis" 
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};