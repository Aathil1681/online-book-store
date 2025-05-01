"use client";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import { CountContext, CountProvider } from "@/context/useCountContext";

import React, { useState } from "react";

const page = () => {
  return (
    <section className="bg-pink-50">
      <CountProvider>
        <div className="ml-150 p-5 text-xl">
          <Navbar />
        </div>
        <div className="mt-5 w-full grid grid-cols-5 gap-5  rounded-xl p-10 ">
          <Card /> <Card /> <Card /> <Card /> <Card />
        </div>
      </CountProvider>
    </section>
  );
};

export default page;
