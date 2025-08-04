"use client";

import React, { useState } from "react";
import BookCard from "./card/BookCard";


  const staticBooks = [
  {
    id: "1",
    title: "The Origin of Spicies",
    author: "Charles Darwin",
    price: 12.99,
    image: "https://cdn.shopify.com/s/files/1/0070/1884/0133/t/8/assets/pf-71b40b91--Books.jpg?v=1620061288",
    categoryName: "Science",
  },
  {
    id: "2",
    title: "The Great Gatsby",
    author: "F. Scott Fitzergeraid",
    price: 9.99,
    image: "https://cdn.shopify.com/s/files/1/0070/1884/0133/t/8/assets/pf-b40b918a--Books2.jpg?v=1620061349",
    categoryName: "Novel",
  },
  {
    id: "3",
    title: "The Catcher in the Rye",
    author: "J.D Salinger",
    price: 23.83,
    image: "https://cdn.shopify.com/s/files/1/0070/1884/0133/t/8/assets/pf-0b918a84--Books3.jpg?v=1620061361",
    categoryName: "Historical",
  },
   {
    id: "4",
    title: "1984",
    author: "George Orwell",
    price: 14.5,
    image: "https://cdn.shopify.com/s/files/1/0070/1884/0133/t/8/assets/pf-918a8430--Books4.jpg?v=1620061368",
    categoryName: "Historical",
  },
   {
    id: "5",
    title: "Lord of The Rings",
    author: "J.R.R Tolkien",
    price: 32.25,
    image: "https://cdn.shopify.com/s/files/1/0070/1884/0133/t/8/assets/pf-8a8430b5--Books5.jpg?v=1620061376",
    categoryName: "Fictional",
  },
  {
    id: "6",
    title: "War and Peace",
    author: "Leo tolstoy",
    price: 45.12,
    image: "https://cdn.shopify.com/s/files/1/0070/1884/0133/t/8/assets/pf-30b57dac--Books7.jpg?v=1620061394",
    categoryName: "War",
  },
  {
    id: "7",
    title: "Harry Potter",
    author: "J.K Rowling",
    price: 89.55,
    image: "https://cdn.shopify.com/s/files/1/0070/1884/0133/t/8/assets/pf-b57dac15--Books8.jpg?v=1620061403",
    categoryName: "Fictional",
  },
  {
    id: "8",
    title: "The Diary",
    author: "Anna Frank",
    price: 21.60,
    image: "https://cdn.shopify.com/s/files/1/0070/1884/0133/t/8/assets/pf-db002894--Books14.jpg?v=1620061446",
    categoryName: "Autobiography",
  },
  
  // Add more sample books here
];

export default function BookCollection() {
  const [searchQuery, setSearchQuery] = useState("");

 const filteredList=staticBooks.filter((book)=>
  book.title.toLowerCase().includes(searchQuery.toLowerCase())||
  book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
  book.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    // Search option for static data(no db)

<div className="">
    <div className="w-full max-w-md mx-auto mt-4">
      <input
        type="search"
        placeholder="Search books by author, title, or category..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-white/80 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 shadow-sm transition duration-200 placeholder-gray-400"
        />
      </div>

    <div className="mt-5 grid gap-6 px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {filteredList.map((book) => (
         
        <BookCard isFromDatabase={false}
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          price={book.price}
          image={book.image}
          categoryName={book.categoryName}         
        />       
      ))}
    </div>

    </div>

  );
}
