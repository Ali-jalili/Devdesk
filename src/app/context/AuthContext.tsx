/** @format */
import supabase from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

import { createContext, useEffect, useState } from "react";

const AuthContext = createContext<
  | {
      user: User | null;
      isLoading: boolean;
      handleSignUp: (
        name: string,
        email: string,
        password: string,
      ) => Promise<User | null>;
      handleLogin: (email: string, password: string) => Promise<User | null>;
      handlelogout: () => Promise<void>;
    }
  | undefined
>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      },
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      }
      setIsLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSignUp(name: string, email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw error;
    return data.user;
  }

  async function handleLogin(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    setUser(data.user);

    return data.user;
  }
  async function handlelogout() {
    await supabase.auth.signOut();
  }
  return (
    <AuthContext.Provider
      value={{ user, isLoading, handleSignUp, handleLogin, handlelogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export { AuthProvider, AuthContext };
