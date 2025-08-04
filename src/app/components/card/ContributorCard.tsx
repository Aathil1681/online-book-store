"use client";

import Image from "next/image";
import React from "react";
import { IoIosAdd } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { LiaRetweetSolid } from "react-icons/lia";

const Card = () => {
  type ContributorsData = {
    image: string;
    name: string;
    job: string;
    likes: string;
    shares: string;
  };

  const data: ContributorsData[] = [
    {
      image:
        "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg",
      name: "Joen Doe",
      job: "Entrepreneur & Startup Enthusiast",
      likes: "158",
      shares: "225",
    },
    {
      image:
        "https://images.pexels.com/photos/7582414/pexels-photo-7582414.jpeg",
      name: "Ayesha Sonam",
      job: "Marketing Strategist at BrandLoop",
      likes: "192",
      shares: "310",
    },
    {
      image:
        "https://images.pexels.com/photos/5311577/pexels-photo-5311577.jpeg",
      name: "Liam Chen",
      job: "AI Researcher & Public Speaker",
      likes: "243",
      shares: "134",
    },
    {
      image:
        "https://images.pexels.com/photos/6919987/pexels-photo-6919987.jpeg",
      name: "Sophia Ramos",
      job: "Product Designer at PixelNest",
      likes: "311",
      shares: "287",
    },
  ];

  return (
    <div className="grid gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-10">
      {data.map((item, index) => (
        <section
          key={item.name + index}
          className="flex flex-col justify-center items-center"
        >
          <div className="rounded-3xl shadow-xl overflow-hidden bg-white w-full max-w-xs">
            {/* Image */}
            <div className="relative w-full aspect-[3/2]">
              <Image
                src={item.image}
                alt={`${item.name} profile`}
                fill
                className="object-cover"
              />
            </div>

            {/* Text content */}
            <div className="p-4 text-center">
              <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.job}</p>
            </div>

            {/* Likes and Shares */}
            <div className="flex justify-between items-center px-6 pb-2">
              <div className="flex items-center gap-1 text-gray-800">
                <CiHeart className="size-5" />
                <p className="text-xs">{item.likes}</p>
              </div>
              <div className="flex items-center gap-1 text-gray-800">
                <LiaRetweetSolid className="size-5" />
                <p className="text-xs">{item.shares}</p>
              </div>
            </div>

            {/* Follow Button */}
            <div className="px-4 pb-4">
              <button className="flex items-center justify-center gap-2 w-full rounded-xl bg-gray-950 px-4 py-2 text-sm font-medium tracking-wide text-white shadow-md hover:bg-gray-800 transition">
                Follow
                <IoIosAdd className="size-5" />
              </button>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Card;
