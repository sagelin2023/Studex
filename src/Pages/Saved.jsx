import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { supabase } from "../lib/supabase";
import ItemCard from "../Components/ItemCard";
import ItemDetails from "../Components/ItemDetails";
import { useNavigate } from "react-router-dom";

const SavedListings = () => {
  const [savedListings, setSavedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  // Optional UI parity with Marketplace
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  const fetchSaved = async () => {
    setLoading(true);

    // 1) Get current user
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();

    if (userErr || !user) {
      console.error("No user / auth error:", userErr);
      setSavedListings([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("saved_listings")
      .select(
        `
        created_at,
        listing:listings (
          *
        )
      `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching saved listings:", error);
      setSavedListings([]);
      setLoading(false);
      return;
    }

    // Flatten to pure listing objects + optional saved timestamp
    const flattened = (data || [])
      .map((row) => {
        if (!row.listing) return null;
        return {
          ...row.listing,
          saved_at: row.created_at,
        };
      })
      .filter(Boolean);

    setSavedListings(flattened);
    setLoading(false);
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  const filteredListings = savedListings.filter((l) => {
    if (!search.trim()) return true;
    const hay = `${l.title ?? ""} ${l.description ?? ""}`.toLowerCase();
    return hay.includes(search.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-100"
            >
              Back
            </button>
            <div>
              <h1 className="text-xl font-semibold">Saved Listings</h1>
              <p className="text-sm text-gray-500">
                {loading
                  ? "Loading..."
                  : `${filteredListings.length} saved item${
                      filteredListings.length === 1 ? "" : "s"
                    }`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search saved..."
                className="pl-9 pr-3 py-2 w-56 md:w-72 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <button
              onClick={() => setShowFilters((v) => !v)}
              className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-100 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="max-w-6xl mx-auto px-4 pb-4">
                <div className="p-3 rounded-2xl border bg-gray-50 text-sm text-gray-600">
                  Filters placeholder (keep parity with Marketplace).
                  <br />
                  If your Marketplace page has category/price/location filters,
                  paste them here and apply them to <code>filteredListings</code>.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-2xl border bg-white animate-pulse"
              />
            ))}
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="p-8 rounded-2xl border bg-white text-center">
            <h2 className="text-lg font-semibold">No saved listings</h2>
            <p className="text-gray-500 mt-1">
              Save items from the Marketplace to see them here.
            </p>
            <button
              onClick={() => navigate("/marketplace")}
              className="mt-4 px-4 py-2 rounded-xl bg-black text-white hover:opacity-90"
            >
              Browse Marketplace
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredListings.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ItemCard
                  item={item}
                  onClick={() => setSelectedItem(item)}
                  // If your ItemCard expects `listing` prop instead of `item`, rename accordingly
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <ItemDetails
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default SavedListings;
