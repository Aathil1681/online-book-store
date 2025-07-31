import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "1rem 2rem",
        borderTop: "1px solid #ddd",
        textAlign: "center",
        marginTop: "3rem",
        color: "#888",
        fontSize: "0.9rem",
      }}
    >
      &copy; {new Date().getFullYear()} BookNest. All rights reserved.
    </footer>
  );
}
