import React, { useState } from "react"
import { Search, Calendar, MessageCircle, Filter, Star } from "lucide-react"

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", rating: 4.9, reviews: 124, experience: 15, availability: "today" },
    { id: 2, name: "Dr. Michael Chen", rating: 4.8, reviews: 98, experience: 12, availability: "tomorrow" },
    { id: 3, name: "Dr. Emily Rodriguez", rating: 4.7, reviews: 156, experience: 10, availability: "today" },
    { id: 4, name: "Dr. James Wilson", rating: 4.9, reviews: 87, experience: 8, availability: "today" },
    { id: 5, name: "Dr. Aisha Patel", rating: 4.8, reviews: 142, experience: 14, availability: "tomorrow" },
    { id: 6, name: "Dr. Robert Kim", rating: 4.9, reviews: 113, experience: 20, availability: "today" },
  ]

  return (
    <div className="min-h-screen hadow-lg rounded-lg p-6">
      <div className="max-w-8xl mx-auto p-5">
        {/* Header */}
        <header className="bg-gray-50 rounded-xl shadow-lg p-6 mb-8 w-full">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Find a Doctor</h1>
          <p className="text-blue-700 mb-6">Connect with top specialists for consultations and appointments</p>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 text-blue-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or specialty..."
                className="w-full pl-10 pr-4 py-3 border border-blue-600 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative md:w-48 border border-blue-600 rounded-lg">
              <Filter className="absolute left-3 top-3 text-blue-400" size={20} />
              <select className="w-full h-full pl-10 pr-4 py-3 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Pediatrics</option>
                <option>Oncology</option>
                <option>Dermatology</option>
              </select>
            </div>
          </div>
        </header>

        {/* Doctor Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-gray-50 rounded-lg p-6 shadow-lg transition transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-900 rounded-full mr-4"></div>
                <div>
                  <h3 className="text-lg font-bold text-blue-700">{doctor.name}</h3>
                  <div className="flex items-center">
                    <Star className="text-yellow-400" size={16} />
                    <span className="ml-1 font-semibold text-blue-600">{doctor.rating}</span>
                    <span className="text-blue-500 ml-1">({doctor.reviews} reviews)</span>
                  </div>
                  <p className="text-blue-900">{doctor.experience} years experience</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <Calendar size={16} className="text-gray-400 mr-2" />
                <span className="text-blue-900">Available {doctor.availability}</span>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 flex justify-center items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                  <Calendar size={18} />
                  <span>Book</span>
                </button>
                <button className="flex-1 flex justify-center items-center gap-2 border border-blue-500 text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white transition">
                  <MessageCircle size={18} />
                  <span>Chat</span>
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* How It Works */}
        <section className="bg-gray-50 rounded-xl shadow-lg p-8 mb-8 mt-8">
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-10">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-700 p-6 shadow-2xl rounded-full mb-4">
                <Search className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">Find a Doctor</h3>
              <p className="text-blue-950">Search for specialists based on specialty, ratings, and availability.</p>
            </div>

            <div className="flex flex-col items-center text-center">
            <div className="bg-blue-700 p-6 shadow-2xl rounded-full mb-4">
                <Calendar className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">Book an Appointment</h3>
              <p className="text-blue-950">Schedule a virtual consultation at a time that works for you.</p>
            </div>

            <div className="flex flex-col items-center text-center">
            <div className="bg-blue-700 p-6 shadow-2xl rounded-full mb-4">
                <MessageCircle className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-blue-800     mb-2">Get Consultation</h3>
              <p className="text-blue-950">Connect with your doctor via video call or chat for personalized care.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Doctors
