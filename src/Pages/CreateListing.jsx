import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import { useAuth } from "../Context/AuthContext";


const CreateListing = () => {
  const { user } = useAuth(); //gets the user data
  const navigate = useNavigate();
  //listing details
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  //image details
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  //posting states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; //grabs the first file
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file)); //shows a preview of the image
    }
  };

  // Upload image to Supabase Storage and return public URL
  const uploadImage = async (file) => {
    const fileName = `${Date.now()}_${file.name}`; //creates the filename, date prevents image upload collision
    const { error } = await supabase.storage
      .from("listing-images")
      .upload(fileName, file);
    if (error) {
        throw error;
    }
    const {
      data: { publicUrl },
    } = supabase.storage.from("listing-images").getPublicUrl(fileName); //gets the url from the supabase storage

    return publicUrl;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); //erases any previous errors
    setLoading(true); //loading is true 

    try {
    
      let image_url = null;
      if (imageFile) {
        image_url = await uploadImage(imageFile); //if there is an image, then the image gets put into image_url
      }
      //inserts all the listing data, gets an error if there is one
      const { error: insertError } = await supabase.from("listings").insert([
        {
          title,
          description,
          price,
          category,
          condition,
          image_url,
          user_id: user.id,
          created_at: new Date(),
        },
      ]);

      if (insertError) {
        throw insertError;
      }
      setTimeout(() => navigate("/marketplace"), 1200); //waits before going to the marketplace page
    } catch (err) {
      console.error("Insert error:", err.message);
      setError(err.message || "Failed to create listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center min-h-[calc(100vh-64px)] bg-gray-50 py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-900">
          Post a New Listing
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              placeholder="Ex: iClicker, dorm lamp, Hokie hoodie..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              placeholder="Brief description of your item..."
            />
          </div>

          {/* Price + Category */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                placeholder="15"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="Textbooks">Textbooks</option>
                <option value="Furniture">Furniture</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Tickets">Tickets</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condition
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            >
              <option value="">Select...</option>
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Used">Used</option>
              <option value="Fair">Fair</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-full h-48 object-cover rounded-lg border"
              />
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Listing"}
          </button>
        </form>
      </motion.div>
    </main>
  );
};

export default CreateListing;
