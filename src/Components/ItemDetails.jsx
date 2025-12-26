import { motion } from "framer-motion";
import { Heart, MessageCircle, X } from "lucide-react";
import ryan from "../assets/ryan.png";

export default function ItemDetails({
  item,
  onClose,
  isSaved,
  onSaveToggle,
  imageAspectClass = "aspect-[4/3]",
}) {
  if (!item) return null;

  const handleMessage = () => {
    if (item?.seller_email) {
      const subject = encodeURIComponent(`Interested in: ${item.title}`);
      const body = encodeURIComponent(
        `Hey! I'm interested in your listing "${item.title}". Is it still available?`
      );
      window.location.href = `mailto:${item.seller_email}?subject=${subject}&body=${body}`;
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
    >
      <motion.button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-label="Close modal"
      />

      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 14, scale: 0.98, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 14, scale: 0.98, opacity: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 260 }}
        className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh]"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_420px]">
          <div className="relative bg-black">
            <div className={`w-full ${imageAspectClass} relative`}>
              <img
                src={item.image_url ? item.image_url : ryan}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
          </div>

          <aside className="border-t md:border-t-0 md:border-l border-gray-200 bg-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 rounded-full bg-white/90 hover:bg-white shadow p-2 cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
            
            <div className="h-full max-h-[92vh] overflow-y-auto p-6 md:p-7">
              <div className="h-12"></div>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.condition} • {item.category}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-2xl font-bold text-indigo-600">
                    ${item.price}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-semibold text-gray-900">Description</h3>
                <p className="mt-2 text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {item.description || "No description provided."}
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={handleMessage}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                >
                  <MessageCircle className="h-5 w-5" />
                  Message seller
                </button>

                <button
                  onClick={onSaveToggle}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold border border-gray-300 text-gray-900 hover:bg-gray-50"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isSaved ? "fill-red-500 text-red-500" : "text-gray-800"
                    }`}
                  />
                  {isSaved ? "Saved" : "Save"}
                </button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-gray-200 p-3">
                  <p className="text-gray-500">Condition</p>
                  <p className="font-semibold text-gray-900">{item.condition}</p>
                </div>
                <div className="rounded-2xl border border-gray-200 p-3">
                  <p className="text-gray-500">Category</p>
                  <p className="font-semibold text-gray-900">{item.category}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </motion.div>
    </motion.div>
  );
}