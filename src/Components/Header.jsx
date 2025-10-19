import { useState, useRef, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, User } from "lucide-react";
import { supabase } from "../lib/supabase";

const Header = ({ setLoginState, setGetStartedState }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMarketplace = location.pathname === "/marketplace";
  const isProfile = location.pathname === "/profile";

  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current &&!profileRef.current.contains(e.target) &&
        notifRef.current && !notifRef.current.contains(e.target)) {
        setMenuOpen(false);
        setNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
    navigate("/");
  };

  if (loading) return null;

  return (
    <>
      {user ? (
        <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-200 bg-white/70 backdrop-blur-md sticky top-0 z-50">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-extrabold text-indigo-600 cursor-pointer"
          >
            Studex
          </h1>

          <div className="flex items-center gap-6 text-sm font-medium">
            {isProfile && (
              <a
                href="#"
                className="hover:text-indigo-600 transition"
                onClick={() => navigate("/marketplace")}
              >
                Market
              </a>
            )}

            {isMarketplace && (
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition hover:cursor-pointer max-sm:hidden"
                onClick={() => navigate("/post-listing")}
              >
                Post Listing
              </button>
            )}

            <div className="relative" ref={notifRef}>
              <Bell
                className="hover:text-indigo-600 hover:cursor-pointer transition-colors"
                onClick={() => {
                  setNotificationOpen((prev) => !prev);
                  setMenuOpen(false); 
                }}
              />
              {notificationOpen && (
                <div className="absolute right-0 w-62 mt-2 bg-white shadow-lg rounded-xl border border-gray-200 py-2 animate-fade-in">
                  <p className="italic text-center px-4 py-2 text-gray-600">
                    No new messages or offers yet.
                  </p>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <User
                className="hover:text-indigo-600 hover:cursor-pointer transition-colors"
                onClick={() => {
                  setMenuOpen((prev) => !prev);
                  setNotificationOpen(false); 
                }}
              />
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-xl border border-gray-200 py-2 animate-fade-in">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/profile");
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/messages");
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    Messages
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/saved");
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    Saved
                  </button>

                  <div className="border-t border-gray-100 my-1" />

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      ) : (
        <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-200 bg-white/70 backdrop-blur-md sticky top-0 z-50">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-extrabold text-indigo-600 tracking-tight cursor-pointer"
          >
            Studex
          </h1>
          <div className="flex items-center gap-6 text-sm font-medium">
            <a
              href="#"
              className="hover:text-indigo-600 transition"
              onClick={() => setLoginState(true)}
            >
              Login
            </a>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition hover:cursor-pointer"
              onClick={() => setGetStartedState(true)}
            >
              Get Started
            </button>
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
