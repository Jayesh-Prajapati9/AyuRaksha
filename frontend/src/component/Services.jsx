import React from 'react';
import { Brain, Microscope, Activity, FileText, Clock, UserCheck } from 'lucide-react';

export const Services = () => {
  const services = [
    {
      icon: <Brain size={48} />,
      title: "AI Diagnostics",
      description: "Advanced neural networks analyze medical data to detect diseases with high accuracy."
    },
    {
      icon: <Microscope size={48} />,
      title: "Lab Result Analysis",
      description: "Automated analysis of laboratory results to identify abnormalities and potential health issues."
    },
    {
      icon: <Activity size={48} />,
      title: "Health Monitoring",
      description: "Continuous monitoring of vital signs and health metrics to detect early warning signs."
    },
    {
      icon: <FileText size={48} />,
      title: "Medical Reports",
      description: "Comprehensive medical reports with detailed insights and treatment recommendations."
    },
    {
      icon: <Clock size={48} />,
      title: "24/7 Availability",
      description: "Our AI system is available around the clock to process and analyze health data."
    },
    {
      icon: <UserCheck size={48} />,
      title: "Personalized Care",
      description: "Tailored health recommendations based on individual medical history and genetic profile."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What We Provide</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform offers a range of services to help detect, monitor, and manage health conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-indigo-600 mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};