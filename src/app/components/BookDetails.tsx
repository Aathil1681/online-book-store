"use client";

import React, { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
}

interface Review {
  id: string;
  comment: string;
  rating: number;
  createdAt: string;
  user: User;
}

interface Category {
  id: string;
  name: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  category: Category;
  reviews: Review[];
}

interface BookDetailsProps {
  bookId: string;
}

export default function BookDetails({ bookId }: BookDetailsProps) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // For adding new review
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      try {
        const res = await fetch(`/api/books/${bookId}`);
        const data = await res.json();
        if (data.success) {
          setBook(data.book);
        } else {
          setError(data.message || "Failed to load book");
        }
      } catch {
        setError("Failed to load book");
      }
      setLoading(false);
    }
    fetchBook();
  }, [bookId]);

  async function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setReviewError(null);

    // Here, you should get userId from auth context/session
    const userId = "some-user-id"; // Replace with actual logic

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          bookId,
          comment,
          rating,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Refresh book data to show new review
        setBook((prev) => prev ? { ...prev, reviews: [data.review, ...prev.reviews] } : null);
        setComment("");
        setRating(5);
      } else {
        setReviewError(data.message || "Failed to submit review");
      }
    } catch {
      setReviewError("Failed to submit review");
    }
    setSubmitting(false);
  }

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div style={{ maxWidth: 700, margin: "auto" }}>
      <h1>{book.title}</h1>
      <p>
        <strong>Author:</strong> {book.author} <br />
        <strong>Category:</strong> {book.category.name} <br />
        <strong>Price:</strong> ${book.price.toFixed(2)}
      </p>
      <img src={book.image} alt={book.title} style={{ maxWidth: "100%", borderRadius: 8 }} />

      <section style={{ marginTop: 40 }}>
        <h2>Reviews ({book.reviews.length})</h2>
        {book.reviews.length === 0 && <p>No reviews yet.</p>}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {book.reviews.map((r) => (
            <li key={r.id} style={{ marginBottom: 20, borderBottom: "1px solid #ccc", paddingBottom: 10 }}>
              <p><strong>{r.user.name}</strong> rated {r.rating}/5</p>
              <p>{r.comment}</p>
              <small>{new Date(r.createdAt).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>

        {/* Add Review Form */}
        <form onSubmit={handleReviewSubmit} style={{ marginTop: 30 }}>
          <h3>Add Your Review</h3>
          <textarea
            required
            placeholder="Write your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            style={{ width: "100%", padding: 8 }}
          />
          <label>
            Rating:{" "}
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          {reviewError && <p style={{ color: "red" }}>{reviewError}</p>}
          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </section>
    </div>
  );
}

/*
Fetches book data by ID from /api/books/[id]

Shows book info, category, and reviews

Includes a simple form to add a review (if logged in)
*/ 