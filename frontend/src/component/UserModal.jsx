import React, { useState } from 'react';

export const UserModal = ({ onSelectRole }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Select Your Role</h2>
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => onSelectRole('doctor')} 
            className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            I am a Doctor
          </button>
          <button 
            onClick={() => onSelectRole('user')} 
            className="py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700">
            I am a Patient
          </button>
        </div>
      </div>
    </div>
  );
};