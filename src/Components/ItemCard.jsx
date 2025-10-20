import React from 'react'
import {motion} from 'framer-motion'

export default function ItemCard({title, price, category, condition, image_url, created_at})
{
  return (
        <motion.div whileHover={{ scale: 1.02 }}
        className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
        >
            <img src={image_url} alt= {title} className="w-full h-48 object-cover"/>
                <div className="p-5">
                    <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{category} · {condition}</p>
                    <p className="text-indigo-600 font-bold mt-3">${price}</p>
                    <p className="text-xs text-gray-400 mt-2">
                        Posted {new Date(created_at).toLocaleDateString()}
                    </p>
                </div>
        </motion.div>
    )
}
  

