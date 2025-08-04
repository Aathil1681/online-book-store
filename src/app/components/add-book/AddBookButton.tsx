
"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function AddBookButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("user_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      router.push("components/add-book");
    } else {
      router.push("/login");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded"
    >
      Add Book
    </button>
  );
}
