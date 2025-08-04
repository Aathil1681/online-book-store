"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { GrCatalogOption } from "react-icons/gr";

type BookCardProps = {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  categoryName?: string;
  isFromDatabase: boolean;
};

export default function BookCard({
  id,
  title,
  author,
  price,
  image,
  categoryName,
  isFromDatabase,
}: BookCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/books/${id}`);
  };

  return (
    <div
      className="flex flex-col justify-between rounded-xl shadow-xl overflow-hidden bg-white/80 
                 cursor-pointer transition-all duration-300 hover:shadow-2xl w-full sm:w-[300px] max-w-xs"
      onClick={handleClick}
    >
      {/* Image */}
      <div className="relative w-full aspect-[3/2] overflow-hidden p-3">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Text content */}
      <div className="px-4 pb-2 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{title}</h3>

        <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
          <IoPerson className="size-4" />
          <p>
            By <em>{author}</em>
          </p>
        </div>

        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
          <GrCatalogOption className="size-4" />
          <p>Category: {categoryName ?? "Unknown"}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 flex items-center justify-between mt-auto">
        <p className="text-lg font-semibold text-amber-600">
          ${price.toFixed(2)}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/books/${id}`);
          }}
          className="flex items-center gap-2 rounded-lg bg-gray-950 px-3 py-2 text-sm text-white shadow hover:bg-gray-800 transition"
        >
          {isFromDatabase ? (
            <>
              <FaEye className="text-base" />
              View Book
            </>
          ) : (
            <>
              <FaShoppingCart className="text-base" />
              Buy Now
            </>
          )}
        </button>
      </div>
    </div>
  );
}
