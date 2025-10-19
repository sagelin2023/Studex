import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import Header from "./Components/Header";
import Landing from "./Pages/Landing";
import Marketplace from "./Pages/Market";
import Profile from "./Pages/Profile";
import Login from "./Components/Login";
import GetStarted from "./Components/GetStarted";

function App() {
  const [loginState, setLoginState] = useState(false);
  const [getStartedState, setGetStartedState] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <Header
          setLoginState={setLoginState}
          setGetStartedState={setGetStartedState}
        />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        {loginState && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
            <Login
              onClose={() => setLoginState(false)}
              onSwitch={() => {
                setLoginState(false);
                setGetStartedState(true);
              }}
            />
          </div>
        )}

        {getStartedState && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
            <GetStarted
              onClose={() => setGetStartedState(false)}
              onSwitch={() => {
                setGetStartedState(false);
                setLoginState(true);
              }}
            />
          </div>
        )}
      </AuthProvider>
    </Router>
  );
}

export default App;
