"use client";

import React, { useState } from "react";
import BookList from "./components/BookList";
import MainSection from "./components/MainSection";
import Footer from "./layout/Footer";
import AddBookButton from "./components/add-book/AddBookButton";
import BookCollection from "./components/BookCollection";
import Card from "./components/card/ContributorCard";
import { FaArrowDown } from "react-icons/fa6";
import AboutUs from "./components/AboutUs";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <section
      className="w-full bg-[url('/images/bg.jpg')] bg-cover bg-center bg-fixed p-6 sm:p-10 overflow-x-auto"
    >
      <div className="bg-white/75 backdrop-blur-xs flex flex-col items-center justify-center">
        {/* Home Section */}
        <div id="home" className="w-full max-w-7xl">
          <MainSection />
        </div>

        {/* Contributors Section */}
        <section
          id="contributors"
          className="flex flex-col items-center px-4 py-10 min-h-screen w-full max-w-7xl"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-center text-black">
            Our Contributors
          </h1>
          <div className="w-full">
            <Card />
          </div>
        </section>

        {/* Browse Button */}
        <div className="flex justify-center items-center mt-6 w-full max-w-7xl">
          <button
            onClick={() => {
              window.scrollBy({
                top: window.innerHeight * 1,
                behavior: "smooth",
              });
            }}
            className="flex gap-2 rounded-full border border-white/25 bg-white/40 px-4 py-3 text-center text-sm font-medium tracking-wide text-gray-950 shadow-md ring ring-[#D15052]/5 md:text-base"
          >
            Browse Products
            <FaArrowDown className="mt-0.5 text-black w-5 h-5" />
          </button>
        </div>

        {/* Book Collection (Static) */}
        <div
          id="browse"
          className="mt-10 w-full max-w-7xl flex justify-center p-5"
        >
          <BookCollection />
        </div>

        {/* Add Book Section */}
        <div
          id="add"
          className="my-8 w-full max-w-7xl flex flex-col items-center"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Add your books here..
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-4xl px-4">
            <input
              type="search"
              placeholder="Search your books by title, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-white/80 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 shadow-sm transition duration-200 placeholder-gray-400"
            />
            <AddBookButton />
          </div>
        </div>

        {/* Book List with filters */}
        <div className="flex justify-center w-full max-w-7xl p-5">
          <BookList categoryId={selectedCategory} search={searchTerm} />
        </div>

        {/* About Us */}
        <div id="about" className="w-full max-w-7xl px-4">
          <AboutUs />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </section>
  );
}
