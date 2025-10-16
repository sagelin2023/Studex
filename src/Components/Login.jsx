export default function Login({ onClose, onSwitch }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent font-inter relative">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md border border-gray-200 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-indigo-600 
             transition-all duration-300 text-l p-2 rounded-full hover:rotate-90"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Welcome Back to Studex
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Log in with your <span className="font-medium">@vt.edu</span> email
        </p>

        <form className="flex flex-col gap-5">
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
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-indigo-600 text-white font-semibold rounded-lg py-2 hover:bg-indigo-700 transition"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <span
            onClick={onSwitch}
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            Get Started
          </span>
        </p>
      </div>
    </div>
  );
}
