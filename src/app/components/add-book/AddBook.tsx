"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/providers/apiProvider";
import { useRouter } from "next/navigation";
import { BookInput, bookSchema } from "@/schemas/bookSchema";

export default function AddBookPage() {
  const { apiClient } = useApi();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookInput>({
    resolver: zodResolver(bookSchema),
  });

  const onSubmit = async (data: BookInput) => {
    try {
      await apiClient.post("/books", data);
      router.push("/"); // Redirect to home or books page
    } catch (err) {
      console.error("Error adding book", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 ">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Add a New Book</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
        <div>
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            className="w-full border border-gray-700 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Author"
            {...register("author")}
            className="w-full border border-gray-700 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition"
          />
          {errors.author && (
            <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            {...register("price", { valueAsNumber: true })}
            className="w-full border border-gray-700 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Image URL"
            {...register("image")}
            className="w-full border border-gray-700 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition"
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Category ID"
            {...register("categoryId")}
            className="w-full border border-gray-700 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition"
          />
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black hover:bg-gray-900 text-white font-semibold px-4 py-3 rounded-md transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
