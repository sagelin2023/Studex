import React from "react";
import { motion } from "framer-motion"; //import for animations
import { Search, Filter, PlusCircle, Bell, User } from "lucide-react"; //icons
import ryan from "../assets/ryan.png";
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
const Marketplace = () => {
    const navigate = useNavigate(); //navigate variable
  return (
    <main className="min-h-screen bg-gray-50 font-inter text-gray-800">
     {/*Market place hero section*/}
      <section className="px-8 py-10 text-center">
        <motion.h2
          className="text-4xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          Marketplace
        </motion.h2>
        <p className="text-gray-600 mb-6">
          Browse listings from verified Virginia Tech students
        </p>

        <div className="flex justify-center gap-3 max-w-2xl mx-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search textbooks, furniture, electronics..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            <Filter size={18} />
            Filters
          </button>
        </div>
      </section>
        {/*Listings section*/}
      <section className="px-8 pb-16 max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6 text-gray-900">Recent Listings</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/*For each listing, creates a card for it*/}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <img
                src={ryan}
                alt="Item"
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h4 className="text-lg font-semibold text-gray-900">Item Title #{i + 1}</h4>
                <p className="text-gray-600 text-sm mt-1">Category · Condition</p>
                <p className="text-indigo-600 font-bold mt-3">$25</p>
              </div>
            </motion.div>
          ))}
        {/*post listing button for smaller devices*/}
        </div>
        <button className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition hover:cursor-pointer sm:hidden">
          <PlusCircle size={32} />
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-200">
        © {new Date().getFullYear()} Studex — All Rights Reserved.
      </footer>
    </main>
  );
};

export default Marketplace;
