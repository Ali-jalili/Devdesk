/** @format */

import useAuth from "@/app/context/useAuth";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Signup() {
  const { handleSignUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const user = await handleSignUp(name, email, password);

    if (!name || !email || !password) {
      setLoading(false);
      return toast.error("Please fill in all fields.");
    }

    try {
      setLoading(true);
      setError("");
      setName("");
      setEmail("");
      setPassword("");

      if (user) {
        toast.success("Account created successfully!");
      }
    } catch {
      toast.error("Failed to create account.");
      setError("Failed to create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            name="name"
            required
          />
        </div>
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

        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}
