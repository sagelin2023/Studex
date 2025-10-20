import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // import for animations
import { Search, Filter, PlusCircle } from "lucide-react"; // icons
import { supabase } from "../lib/supabase";
import ItemCard from "../Components/ItemCard";
import ItemDetails from "../Components/ItemDetails";

const Marketplace = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching listings:", error);
      } else {
        setListings(data || []);
      }

      setLoading(false);
    };

    fetchListings();
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-gray-50 font-inter text-gray-800">
      {/* Main content */}
      <div className="flex-grow">
        {/* Marketplace Hero Section */}
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
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
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

        {/* Listings Section */}
        <section className="px-8 pb-16 max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900">
            Recent Listings
          </h3>
          {loading ? (
            <p className="text-center text-gray-500">Loading listings...</p>
          ) : listings.length === 0 ? (
            <p className="text-center text-gray-500">No listings yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((item) => (
                <div key={item.id} onClick={() => setSelectedItem(item)}>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <ItemCard {...item} />
                  </motion.div>
                </div>
              ))}
            </div>
          )}

          {/* Post Listing Button (Mobile) */}
          <button className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition hover:cursor-pointer sm:hidden">
            <PlusCircle size={32} />
          </button>
        </section>

        <AnimatePresence>
          {selectedItem && (
            <ItemDetails
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Footer - always sticks to bottom */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-200 mt-auto">
        © {new Date().getFullYear()} Studex — All Rights Reserved.
      </footer>
    </main>
  );
};

export default Marketplace;
