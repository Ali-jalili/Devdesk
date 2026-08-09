/** @format */

import useAuth from "@/app/context/useAuth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { handleSignIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill in all fields.");
    }
    try {
      setLoading(true);

      const user = await handleSignIn(email, password);

      if (user) {
        toast.success("Logged in successfully!");

        setEmail("");
        setPassword("");
        navigate("/app/dashboard");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? <FaSpinner /> : "Log In"}
        </button>
      </form>
    </div>
  );
}
