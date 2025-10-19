import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
//creates the context: a context stores data for any compenents to use without
//needing to pass props
const AuthContext = createContext();

//loads the current user and passes it to children
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Check the current session on startup
    const getSession = async () => {
      //gets the data from the session
      const { data } = await supabase.auth.getSession();
      //set the user if the data has a user session, null if it doesn't
      setUser(data?.session?.user || null);
      setLoading(false);
    };
    getSession();

    //Listen for login/logout changes
    //data: listener just renames data to listener
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null); //sets the user to the user in the session, if not then the user is null
    });

    // stops listening for changes
    return () => listener.subscription.unsubscribe();
  }, []);
  //passes the user and loading to all the children
  //.Provider just means to provide the data to everything inside it
  //children is a built in react prop, means all the children components in side Auth Provider
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

//helper function for other components to see the user state
export function useAuth() {
  return useContext(AuthContext);
}
