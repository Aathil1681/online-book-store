"use client";

import React, { useEffect, useState } from "react";
import BookCard from "./card/BookCard";
import { useApi } from "@/providers/apiProvider";

type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  categoryId: string;
  category?: { name: string };
};

type BookListProps = {
  categoryId: string | null;
  search?: string;
};

export default function BookList({ categoryId, search }: BookListProps) {
  const { apiClient } = useApi();
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
        if (search) params.append("search", search);

        const res = await apiClient.get(`/books?${params.toString()}`);
        const data = res.data;

        if (data.success) {
          setBooks(data.books);
        } else {
          setError("Failed to load books");
        }
      } catch (err) {
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [categoryId, search, apiClient]);

  if (loading)
    return (
      <p className="text-center text-lime-700 font-bold mt-12 text-lg">
        Loading books...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-600 font-bold mt-12 text-lg">{error}</p>
    );

  if (books.length === 0)
    return (
      <p className="text-center text-lime-400 italic mt-12 text-lg">
        No books found.
      </p>
    );

  return (
    <div className="flex justify-center px-4 py-8">
      <div className="w-full max-w-[1280px]">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard
              isFromDatabase={true}
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              price={book.price}
              image={book.image}
              categoryName={book.category?.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
