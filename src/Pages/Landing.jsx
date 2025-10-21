import React, { useState } from 'react';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom'
import { useAuth } from "../Context/AuthContext";
const Landing = () => {

  const navigate = useNavigate();
  const { user } = useAuth(); //gets the user state from the AuthContext
  const fullName = user?.user_metadata?.name || "";
  const firstName = fullName.split(" ")[0] || "";//gets the first name
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-800 font-inter relative">
    

      {/* Hero Section */}
      <section className=" flex flex-col items-center text-center px-6 py-20">
        <motion.h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        >
          Buy, Sell, and Connect <br />
          <span className="text-indigo-600">Across Campus</span>
        </motion.h2>
        <motion.p className="text-lg text-gray-600 max-w-2xl mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}>
          A safe, simple, and modern marketplace built for Virginia Tech
          students. Whether you’re selling textbooks or finding furniture,
          Studex keeps it all in the Hokie family.
        </motion.p>
        <motion.div className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1}}
        transition={{ duration: 0.6, delay: 0.6}}
        >
          <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition hover:cursor-pointer" onClick = {() => navigate("/marketplace")}>
            Browse Listings
          </button>
        </motion.div>
      </section>

      <section className="px-8 py-16 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Why choose Studex?
        </h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-semibold mb-3 text-indigo-600">
              Student Verified
            </h4>
            <p className="text-gray-600">
              Every user signs up with a verified <span className="font-semibold">@vt.edu</span> email. Stay safe and trade with real Hokies.
            </p>
          </div>

          <div className="p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-semibold mb-3 text-indigo-600">
              Fast & Simple
            </h4>
            <p className="text-gray-600">
              No clutter. No confusion. Just post your listing, add photos, and reach buyers within minutes.
            </p>
          </div>

          <div className="p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-semibold mb-3 text-indigo-600">
              Built for VT
            </h4>
            <p className="text-gray-600">
              Designed by students for students — inspired by Virginia Tech’s
              spirit of community and innovation.
            </p>
          </div>
        </div>
      </section>
      {/*if the user exists*/}
      {user ? (
      <section className="py-20 text-center bg-indigo-600 text-white">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Welcome back, {firstName}!
        </h3>
        <p className="text-indigo-100 mb-8">
          You’re already part of Studex — manage your listings or check your profile below.
        </p>
        <div className="flex justify-center gap-4">
        
          <button
            className="px-8 py-3 bg-transparent border border-white text-white font-semibold rounded-full hover:cursor-pointer hover:bg-white/10 transition"
            onClick={() => navigate("/profile")}
          >
            View Profile
          </button>
        </div>
      </section>
    ) : (
      <section className="py-20 text-center bg-indigo-600 text-white">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Join hundreds of Hokies using Studex
        </h3>
        <p className="text-indigo-100 mb-8">
          Sign up today and simplify your student marketplace experience.
        </p>
        <button
          className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition"
          onClick={() => setGetStartedState(true)}
        >
          Get Started Now
        </button>
      </section>
    )}

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Studex — All Rights Reserved.
      </footer>
    </main>
  );
};

export default Landing;
