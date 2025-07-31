import React, { useEffect, useState } from "react";

type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  featured: boolean;
  categoryId: string;
  category?: { name: string };
};

type BookListProps = {
  categoryId: string | null;
  search?: string;
  featuredOnly?: boolean;
};

export default function BookList({
  categoryId,
  search,
  featuredOnly,
}: BookListProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();

        if (categoryId) params.append("category", categoryId);
        if (featuredOnly) params.append("featured", "true");
        if (search) params.append("search", search);

        const res = await fetch(`/api/books?${params.toString()}`);
        const data = await res.json();

        if (data.success) {
          setBooks(data.books);
        } else {
          setError("Failed to load books");
        }
      } catch {
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [categoryId, featuredOnly, search]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;
  if (books.length === 0) return <p>No books found.</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16 }}>
      {books.map((book) => (
        <div key={book.id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 6 }}>
          <img src={book.image} alt={book.title} style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 4 }} />
          <h3>{book.title}</h3>
          <p>By {book.author}</p>
          <p>Category: {book.category?.name ?? "Unknown"}</p>
          <p>Price: ${book.price.toFixed(2)}</p>
          {book.featured && <span style={{ color: "green", fontWeight: "bold" }}>Featured</span>}
        </div>
      ))}
    </div>
  );
}

/* fetches books from your /api/books endpoint and supports filtering 
by category (and other filters if needed).
*/ 