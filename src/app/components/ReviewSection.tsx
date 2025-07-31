"use client";

import React, { useEffect, useState } from "react";

type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
};

type ReviewSectionProps = {
  bookId: string;
};

export default function ReviewSection({ bookId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?bookId=${bookId}`);
      const data = await res.json();
      if (data.success) setReviews(data.reviews);
      else setError("Failed to fetch reviews.");
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, bookId }),
      });

      const data = await res.json();
      if (data.success) {
        setForm({ name: "", rating: 5, comment: "" });
        fetchReviews(); // Refresh the list
      } else {
        setError(data.message || "Failed to submit review.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ marginTop: 40 }}>
      <h2>Reviews</h2>

      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {reviews.map((review) => (
            <li key={review.id} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
              <strong>{review.name}</strong> – <em>{review.rating}⭐</em>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}

      <h3 style={{ marginTop: 30 }}>Add a Review</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <select
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 && "s"}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Write your review"
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
/*
Fetches all reviews for a specific book (via bookId)

Displays each reviewer's name, rating (1–5), and comment

Includes a form to submit a new review (name, rating, comment)

Automatically updates after submitting
*/