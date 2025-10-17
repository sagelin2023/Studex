import {useState} from 'react'
import {supabase} from '../lib/supabase'


export default function GetStarted({ onClose, onSwitch }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(null);

    const handleSignUp = async(e) => {
        e.preventDefault();
        setError(null);
        if (!email.endsWith("@vt.edu")) {
        setError("Only @vt.edu email addresses are allowed.");
        return;
    }

        const {error} = await supabase.auth.signUp({
            email, password, 
            options: {
                data: {name},
            },
        });

        if (error){
            setError(error.message);
        }
        else{
            console.log("Account successfully created");
            onClose();
        }
    }
  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent font-inter relative">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md border border-gray-200 relative max-sm:mx-5">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-indigo-600 
             transition-all duration-300 text-l p-2 rounded-full hover:rotate-90 hover:cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Join Studex
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Create your free account using your{" "}
          <span className="font-medium">@vt.edu</span> email
        </p>

        <form onSubmit = {handleSignUp} className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value = {name}
              onChange = {(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value = {email}
              onChange = {(e) => setEmail(e.target.value)}
              placeholder="xxx@vt.edu"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value = {password}
              onChange = {(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-indigo-600 text-white font-semibold rounded-lg py-2 hover:bg-indigo-700 transition hover:cursor-pointer"
          >
            Create Account
          </button>
        </form>
        {error && <p className="text-red-600 text-sm mt-3 text-center">{error}</p>}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={onSwitch}
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}
