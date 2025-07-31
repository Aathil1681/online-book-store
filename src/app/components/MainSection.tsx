export default function MainSection() {
  return (
    <section
      style={{
        backgroundColor: "#4a90e2",
        color: "white",
        padding: "4rem 2rem",
        textAlign: "center",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        Welcome to BookNest
      </h1>
      <p style={{ fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto" }}>
        Discover your next favorite book. Browse thousands of titles, explore
        categories, and get inspired.
      </p>
      <button
        style={{
          marginTop: "2rem",
          padding: "1rem 2rem",
          fontSize: "1.1rem",
          backgroundColor: "white",
          color: "#4a90e2",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
        onClick={() => {
          // Scroll to book list or categories section
          const el = document.querySelector("section + section");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Browse Books
      </button>
    </section>
  );
}
/*
Displays a big welcoming headline and subtitle

Has a nice colored background with white text

Includes a “Browse Books” button that scrolls down to the next section (like categories/books)
*/