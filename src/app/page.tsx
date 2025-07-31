"use client";

import React, { useState } from "react";
import CategoryFilter from "./components/CategoryFilter";
import BookList from "./components/BookList";
import ReviewSection from "./components/ReviewSection";
import NewsletterSignup from "./components/NewsletterSignup";
import MainSection from "./components/MainSection";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <main style={{ padding: "1rem", maxWidth: 1200, margin: "0 auto" }}>
      <MainSection />

      <section style={{ margin: "2rem 0" }}>
        <h2>Browse by Category</h2>
        <CategoryFilter
          selectedCategoryId={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      {/* Optional search input */}
      <section style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Search books by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            fontSize: "1rem",
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        />
      </section>

      <section>
        <h2>Books</h2>
        <BookList categoryId={selectedCategory} search={searchTerm} />
      </section>

      <section style={{ margin: "3rem 0" }}>
        <h2>Recent Reviews</h2>
        <ReviewSection bookId="some-book-id"  />
      </section>

      <section style={{ margin: "3rem 0" }}>
        <NewsletterSignup />
      </section>
    </main>
  );
}