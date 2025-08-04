import React from "react";
import { SiBookalope } from "react-icons/si";
import Image from "next/image";
import RegisterForm from "./RegisterForm";

const page = () => {
  return (
    <section className="w-full h-dvh flex items-center justify-center">
      <div className="rounded-3xl w-full">
        <div className="h-dvh w-full mx-auto flex flex-col md:flex-row">
          {/* Left side */}
          <div className="h-dvh w-full md:w-2/3 flex flex-col object-cover p-1">
            <div className="size-full relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                fill
                src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg"
                alt="banner"
              />
            </div>
          </div>

          {/* Right side (Scrollable) */}
          <div className="relative w-full md:w-1/3  overflow-y-auto h-dvh">
            {/* Sticky top logo */}
            <div className="flex items-center sticky pl-4 top-0 left-2 gap-2 bg-white z-10 pb-5 pt-5 mt-5">
              <div className="p-2 rounded-full bg-white/50 shadow-md dark:border-white/10">
                <SiBookalope className="size-4 text-black" />
              </div>
              <p className="text-xl font-mono">Bookmark</p>
            </div>

            {/* Form Content */}
            <div className="mt-10">
              <RegisterForm />
            </div>

            {/* Sticky Footer */}
            <div className="sticky bottom-0 left-0 w-full bg-white pt-10">
              <div className="flex justify-between text-xs text-gray-500 px-3 pb-3">
                <p>© 2025 Bookmark</p>
                <p>Privacy Policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
