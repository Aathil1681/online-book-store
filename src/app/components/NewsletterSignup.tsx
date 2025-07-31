"use client";

import React, { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Failed to subscribe.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong.");
    }
  };

  return (
    <div style={{ marginTop: 50, padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Subscribe to Our Newsletter</h2>
      <p>Get the latest updates and book releases straight to your inbox!</p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {status === "error" && <p style={{ color: "red" }}>{errorMsg}</p>}
        {status === "success" && <p style={{ color: "green" }}>Thanks for subscribing!</p>}
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
}
//It allows users to subscribe with their email address and shows a success message upon submission.

