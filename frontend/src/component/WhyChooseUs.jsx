import React from 'react';
import { CheckCircle } from 'lucide-react';

export const WhyChooseUs = () => {
  const reasons = [
    {
      title: "High Accuracy",
      description: "Our AI models achieve 97% accuracy in disease detection, exceeding traditional diagnostic methods."
    },
    {
      title: "Fast Results",
      description: "Get diagnostic insights within minutes instead of waiting days for traditional lab results."
    },
    {
      title: "Non-Invasive",
      description: "Many of our diagnostic tools require no invasive procedures, using only imaging or existing data."
    },
    {
      title: "Cost-Effective",
      description: "Reduce healthcare costs by enabling early detection and prevention of serious conditions."
    },
    {
      title: "Expert Validation",
      description: "All AI results are validated by experienced medical professionals for reliability."
    },
    {
      title: "Privacy Focused",
      description: "Your health data is encrypted and secured with the highest privacy standards."
    }
  ];

  return (
    <section className="py-20 bg-indigo-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img 
              src="/api/placeholder/600/500" 
              alt="Medical professionals using AI" 
              className="rounded-lg shadow-xl"
            />
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Why Choose Us</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our AI disease detection platform offers numerous advantages over traditional diagnostic methods.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <div key={index} className="flex">
                  <div className="text-indigo-600 mr-3">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{reason.title}</h3>
                    <p className="text-gray-600">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-10 bg-indigo-700 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-indigo-800 transition duration-300">
              Learn More About Our Technology
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};