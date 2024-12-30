import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/compat/app";

import supabase from "../../supabase/supabaseClient";

interface AuthContextType {
  currentUser?: firebase.User | null;
  userLoggedIn: boolean;
  loading: boolean;
}

const defaultAuthCtxValue = {
  userLoggedIn: false,
  loading: false,
};
const AuthContext = React.createContext<AuthContextType>(defaultAuthCtxValue);

export function useAuth() {
  return useContext(AuthContext);
}

const syncUserWithSupabase = async (user: firebase.User) => {
  const { uid, email } = user;
  // extract user_name from email
  const userName = email?.split("@")[0];

  const { data, error } = await supabase
    .from("users")
    .upsert([{ id: uid, email, user_name: userName }], { onConflict: "id" });

  if (error) {
    console.error("Error syncing user with Supabase:", error);
  } else {
    console.log("User synced with Supabase:", data);
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user: any) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
      await syncUserWithSupabase(user);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const value = {
    currentUser,
    userLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
