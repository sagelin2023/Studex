import React, { useState, useEffect, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Search, Filter, PlusCircle, X } from "lucide-react";
import { supabase } from "../lib/supabase";
import ItemCard from "../Components/ItemCard";
import ItemDetails from "../Components/ItemDetails";
import { useNavigate } from "react-router-dom";

const Marketplace = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [savedItems, setSavedItems] = useState([]);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    condition: "",
    minPrice: "",
    maxPrice: ""
  });
  
  const navigate = useNavigate();

  // convert savedItems array to Set for faster lookups
  const savedSet = useMemo(() => new Set(savedItems), [savedItems]);

  // debounce: wait 300ms after user stops typing before searching
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    // cleanup: cancel timer if user keeps typing
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // load listings and saved items when page loads
  useEffect(() => {
    const fetchData = async () => {
      // get current user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // if logged in, get their saved items
      if (user) {
        const { data } = await supabase
          .from('saved_items')
          .select('listing_id')
          .eq('user_id', user.id);
        
        if (data) {
          setSavedItems(data.map(item => item.listing_id));
        }
      }

      // get all listings
      const { data: listingsData, error } = await supabase
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching listings:", error);
      } else {
        setListings(listingsData || []);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  // save or unsave an item
  const handleSaveToggle = async (itemId) => {
    if (!user) {
      alert('Please log in to save items');
      return;
    }

    const isSaved = savedSet.has(itemId);
    
    if (isSaved) {
      // remove from database
      const { error } = await supabase
        .from('saved_items')
        .delete()
        .eq('user_id', user.id)
        .eq('listing_id', itemId);
      
      if (!error) {
        // remove from local state
        setSavedItems(prev => prev.filter(id => id !== itemId));
      }
    } else {
      // add to database
      const { error } = await supabase
        .from('saved_items')
        .insert({ user_id: user.id, listing_id: itemId });
      
      if (!error) {
        // add to local state
        setSavedItems(prev => [...prev, itemId]);
      }
    }
  };

  // filter listings based on search and filters
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      // check if matches search query
      const matchesSearch = debouncedSearch === "" || 
        item.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        item.description?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        item.category?.toLowerCase().includes(debouncedSearch.toLowerCase());

      // check if matches category filter
      const matchesCategory = filters.category === "" || item.category === filters.category;
      
      // check if matches condition filter
      const matchesCondition = filters.condition === "" || item.condition === filters.condition;
      
      // check if matches price filters
      const itemPrice = parseFloat(item.price);
      const matchesMinPrice = filters.minPrice === "" || itemPrice >= parseFloat(filters.minPrice);
      const matchesMaxPrice = filters.maxPrice === "" || itemPrice <= parseFloat(filters.maxPrice);

      // must match ALL conditions
      return matchesSearch && matchesCategory && matchesCondition && matchesMinPrice && matchesMaxPrice;
    });
  }, [listings, debouncedSearch, filters]);

  // fixed list of categories
  const categories = ["Furniture", "Textbook", "Electronics", "Tickets", "Other"];

  // fixed list of conditions
  const conditions = ["New", "Like New", "Fair", "Used"];

  // reset all filters
  const clearFilters = () => {
    setFilters({
      category: "",
      condition: "",
      minPrice: "",
      maxPrice: ""
    });
  };

  // check if any filters are active
  const hasActiveFilters = filters.category || filters.condition || filters.minPrice || filters.maxPrice;

  return (
    <main className="flex flex-col min-h-screen bg-gray-50 font-inter text-gray-800">
      <div className="flex-grow">
        <section className="px-8 py-10 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Marketplace
          </h2>
          <p className="text-gray-600 mb-6">
            Browse listings from verified Virginia Tech students
          </p>

          <div className="flex justify-center gap-3 max-w-2xl mx-auto">
            {/* search bar */}
            <div className="relative flex-grow">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search textbooks, furniture, electronics..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>
            
            {/* filter button */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer relative"
            >
              <Filter size={18} />
              Filters
              
            </button>
          </div>

          {/* filter panel (only shows if showFilters is true) */}
          {showFilters && (
            <div className="mt-4 max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                  >
                    <X size={16} />
                    Clear all
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* category dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* condition dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condition
                  </label>
                  <select
                    value={filters.condition}
                    onChange={(e) => setFilters({...filters, condition: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  >
                    <option value="">All Conditions</option>
                    {conditions.map(cond => (
                      <option key={cond} value={cond}>{cond}</option>
                    ))}
                  </select>
                </div>

                {/* min price input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Price ($)
                  </label>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>

                {/* max price input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Price ($)
                  </label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                    placeholder="Any"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* listings grid */}
        <section className="px-8 pb-16 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              {debouncedSearch || hasActiveFilters ? `${filteredListings.length} Results` : 'Recent Listings'}
            </h3>
          </div>
          
          {loading ? (
            <p className="text-center text-gray-500">Loading listings...</p>
          ) : filteredListings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-2">No listings found</p>
              {(debouncedSearch || hasActiveFilters) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    clearFilters();
                  }}
                  className="text-indigo-600 hover:text-indigo-700 text-sm cursor-pointer"
                >
                  Clear search and filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredListings.map((item) => (
                <ItemCard 
                  key={item.id} 
                  {...item}
                  isSaved={savedSet.has(item.id)}
                  onSaveToggle={() => handleSaveToggle(item.id)}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </div>
          )}

          {/* floating + button (mobile only) */}
          <button 
            onClick={() => navigate("/post-listing")} 
            className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition cursor-pointer sm:hidden"
          >
            <PlusCircle size={32} />
          </button>
        </section>

        {/* item details modal */}
        <AnimatePresence>
          {selectedItem && (
            <ItemDetails
              item={selectedItem}
              isSaved={savedSet.has(selectedItem.id)}
              onSaveToggle={() => handleSaveToggle(selectedItem.id)}
              onClose={() => setSelectedItem(null)}
            />
          )}
        </AnimatePresence>
      </div>

      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-200 mt-auto">
        © {new Date().getFullYear()} Studex — All Rights Reserved.
      </footer>
    </main>
  );
};

export default Marketplace;