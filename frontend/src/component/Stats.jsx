import React, { useState, useEffect } from 'react';

export const Stats = () => {
  // Animation for counters
  const [counts, setCounts] = useState({
    patients: 0,
    diseases: 0,
    accuracy: 0,
    hospitals: 0
  });
  
  const targets = {
    patients: 50000,
    diseases: 120,
    accuracy: 97,
    hospitals: 250
  };
  
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const frameRate = 20; // updates per second
    const totalFrames = duration / (1000 / frameRate);
    let frame = 0;
    
    const timer = setInterval(() => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      
      setCounts({
        patients: Math.floor(progress * targets.patients),
        diseases: Math.floor(progress * targets.diseases),
        accuracy: Math.floor(progress * targets.accuracy),
        hospitals: Math.floor(progress * targets.hospitals)
      });
      
      if (frame === totalFrames) {
        clearInterval(timer);
      }
    }, 1000 / frameRate);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Real results from our AI-powered disease detection platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <StatCard 
            value={counts.patients.toLocaleString()} 
            label="Patients Helped" 
            icon="/api/placeholder/64/64"
          />
          <StatCard 
            value={counts.diseases} 
            label="Diseases Detected" 
            icon="/api/placeholder/64/64"
          />
          <StatCard 
            value={`${counts.accuracy}%`} 
            label="Diagnostic Accuracy" 
            icon="/api/placeholder/64/64"
          />
          <StatCard 
            value={counts.hospitals} 
            label="Partner Hospitals" 
            icon="/api/placeholder/64/64"
          />
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ value, label, icon }) => {
  return (
    <div className="bg-white bg-opacity-10 rounded-xl p-8 backdrop-blur-sm hover:bg-opacity-15 transition-all duration-300">
      <div className="mx-auto w-16 h-16 mb-4">
        <img src={icon} alt={label} className="w-full h-full object-contain" />
      </div>
      <div className="text-4xl md:text-5xl font-bold mb-2">{value}</div>
      <div className="text-xl text-indigo-100">{label}</div>
    </div>
  );
};