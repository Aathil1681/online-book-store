"use client";

import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header
      style={{
        padding: "1rem 2rem",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link href="/" style={{ fontWeight: "bold", fontSize: "1.5rem", color: "#4a90e2", textDecoration: "none" }}>
        BookNest
      </Link>

      <nav>
        <Link href="/" style={{ marginRight: 16 }}>
          Home
        </Link>
        <Link href="/login" style={{ marginRight: 16 }}>
          Login
        </Link>
        <Link href="/register">Register</Link>
      </nav>
    </header>
  );
}
