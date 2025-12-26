import React from 'react';
import { motion } from 'framer-motion';
import ryan from '../assets/ryan.png';
import { Clock, Heart } from "lucide-react";

export default function ItemCard({
  title, price, category, condition, image_url, created_at, isSaved, 
  onSaveToggle, onClick}) 
  {
  const handleSaveClick = (e) => {
    e.stopPropagation();
    onSaveToggle?.();
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden relative"
    >
      <img 
        src={image_url ? image_url : ryan} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      
      <button
        onClick={handleSaveClick}
        className="absolute bottom-4 right-3 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition z-10 cursor-pointer"
        aria-label={isSaved ? "Unsave item" : "Save item"}
      >
        <Heart
          size={18}
          className={isSaved ? "fill-red-500 text-red-500" : "text-gray-700" }
        />
      </button>

      <div className="p-5">
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
        <p className="text-gray-600 text-sm mt-1">{category} · {condition}</p>
        <p className="text-indigo-600 font-bold mt-3">${price}</p>
        <p className="text-xs text-gray-400 mt-2 flex items-center">
          <Clock className="mr-1" size={13} />
          Posted {new Date(created_at).toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  );
}