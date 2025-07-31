import React from "react";
import { SiBookalope } from "react-icons/si";
import Image from "next/image";
import LoginForm from "./LoginForm";

const page = () => {
  return (
    <section className="w-full h-dvh flex items-center justify-center bg-lime-50">
      <div className="rounded-3xl w-full">
        <div className="h-dvh w-full mx-auto flex flex-col md:flex-row">
          {/* Left side */}
          <div className=" h-dvh w-full md:w-2/3 flex flex-col object-cover p-5">
            <div className="size-full relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                fill
                src="https://images.pexels.com/photos/2099266/pexels-photo-2099266.jpeg"
                alt="banner"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="relative w-full md:w-1/3 p-5">
            <div className="flex items-center absolute left-2 gap-2 ">
              <div className="p-2 rounded-full bg-white/50 shadow-md dark:border-white/10">
                <SiBookalope className="size-4 text-black " />
              </div>
              <p className="text-xl font-mono">Bookmark</p>
            </div>
            <div className="mt-20 md:mt-30">
              <LoginForm />
            </div>
            <div className="absolute bottom-5 left-1">
              <p className="text-xs pl-5 text-gray-500">
                Copyright @ 2025 Bookmark
              </p>
            </div>
            <div className="absolute bottom-5 right-3">
              <p className="text-xs text-gray-500">Privacy Policy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
