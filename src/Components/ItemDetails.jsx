import { motion } from "framer-motion";

export default function ItemDetails({ item, onClose }) {
  if (!item) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background overlay */}
      <motion.div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal content */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="relative bg-white rounded-2xl shadow-lg w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 max-h-[90vh] overflow-y-auto"
      >
        <img
          src={item.image_url}
          alt={item.title}
          className="w-full h-80 object-cover rounded-t-2xl"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
          <p className="text-indigo-600 font-semibold text-lg mt-2">
            ${item.price}
          </p>
          <p className="text-sm text-gray-500">
            {item.condition} · {item.category}
          </p>
          <p className="mt-4 text-gray-700">{item.description}</p>
          <p className="text-xs text-gray-400 mt-4">
            Posted {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
