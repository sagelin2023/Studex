import {useState} from 'react'
import {supabase} from '../lib/supabase'
import {useNavigate} from 'react-router-dom'


export default function GetStarted({ onClose, onSwitch }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const [creating, setCreating] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async(e) => {
        e.preventDefault();
        setError(null);
        setCreating(true);
        if (!email.endsWith("@vt.edu")) {
        setError("Only @vt.edu email addresses are allowed.");
        setCreating(false);
        return;
    }
        setCreating(true);
        const {error} = await supabase.auth.signUp({
            email, password, 
            options: {
                data: {name},
            },
        });

        if (error){
            if (error.message.includes("User already registered")) {
                setError("An account with that email already exists. Try logging in.");
            } else {
                setError(error.message);
            }
                setCreating(false);
        }
        else{
            console.log("Account successfully created");
            onClose();
            setCreating(false);
            navigate("/marketplace");
            
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
            <div className="relative">
                <input
                    id="password"
                    type={showPassword ? "text" : "password"}  
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    required
                />

                {/* Toggle button (eye icon) */}
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600"
                >
                    {showPassword ? (
                    // 👁 Eye open icon (you can replace with an SVG or emoji)
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                    </svg>
                    ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.502-4.442m3.87-2.544A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.958 9.958 0 01-4.042 5.338M15 12a3 3 0 00-3-3m0 0a3 3 0 013 3m-3 0a3 3 0 01-3-3m9.192 9.192L4.808 4.808"
                        />
                    </svg>
                    )}
                </button>
                </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-indigo-600 text-white font-semibold rounded-lg py-2 hover:bg-indigo-700 transition hover:cursor-pointer"
          >
            {creating ? "Creating Account..." : "Create Account"}
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
