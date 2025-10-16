import React, { useState } from 'react';
import Login from "../Components/Login.jsx";
import GetStarted from "../Components/GetStarted.jsx";

const Landing = () => {
  const [loginState, setLoginState] = useState(false);
  const [getStartedState, setGetStartedState] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-800 font-inter relative">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-200 bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl font-extrabold text-indigo-600 tracking-tight">
          Studex
        </h1>
        <div className="flex items-center gap-6 text-sm font-medium">
          <a href="#" className="hover:text-indigo-600 transition">Home</a>
          <a href="#" className="hover:text-indigo-600 transition">Listings</a>
          <a href="#" className="hover:text-indigo-600 transition">About</a>
          <a
            href="#"
            className="hover:text-indigo-600 transition"
            onClick={() => setLoginState(true)}
          >
            Login
          </a>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition"
            onClick={() => setGetStartedState(true)}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-20">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-4">
          Buy, Sell, and Connect <br />
          <span className="text-indigo-600">Across Campus</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mb-10">
          A safe, simple, and modern marketplace built for Virginia Tech
          students. Whether you’re selling textbooks or finding furniture,
          Studex keeps it all in the Hokie family.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition">
            Browse Listings
          </button>
          <button className="px-6 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition">
            Post an Item
          </button>
        </div>
      </section>

      {/* Feature Section */}
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

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Studex — All Rights Reserved.
      </footer>

      {/* Modal Backdrop */}
      {loginState && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
          <Login onClose={() => setLoginState(false)} onSwitch={() => {
        setGetStartedState(true);
        setLoginState(false);
      }}/>
        </div>
      )}
      {getStartedState && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
          <GetStarted onClose={() => setGetStartedState(false)} onSwitch={() => {
        setLoginState(true);
        setGetStartedState(false);
      }} />
        </div>
      )}
    </main>
  );
};

export default Landing;
