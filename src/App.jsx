import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import Header from "./Components/Header";
import Landing from "./Pages/Landing";
import Marketplace from "./Pages/Market";
import Profile from "./Pages/Profile";
import Login from "./Components/Login";
import GetStarted from "./Components/GetStarted";
import Messages from "./Pages/Messages";
import Saved from "./Pages/Saved";

function App() {
  //States for the login and getStarted modal
  const [loginState, setLoginState] = useState(false);
  const [getStartedState, setGetStartedState] = useState(false);

  return (
    <Router> {/*Configures the router for the website*/}
      <AuthProvider> {/*Handles the loginState of the user: check AuthContext*/}
        <Header
          setLoginState={setLoginState}
          setGetStartedState={setGetStartedState}
        />
        {/*Routes for each page*/}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />}/>
          <Route path="/saved" element={<Saved />}/>
        </Routes>
        {/*if user clicks login button*/}
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
        {/*if user is in the createAccount stage*/}
        {getStartedState  && (
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
