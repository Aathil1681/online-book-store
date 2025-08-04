"use client";

import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { cookieKeys } from "@/config/cookies.config";
import { TbLogin, TbLogout } from "react-icons/tb";
import { SiBookalope } from "react-icons/si";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = Cookie.get(cookieKeys.USER_TOKEN);
    setIsLoggedIn(!!token);
  }, []);

  function handleLogout() {
    if (window.confirm("Are you sure you want to logout?")) {
      Cookie.remove(cookieKeys.USER_TOKEN);
      setIsLoggedIn(false);
      router.refresh();
      setMenuOpen(false);
    }
  }

  function goToLogin() {
    router.push("/login");
    setMenuOpen(false);
  }

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  // Close menu on navigation link click
  function handleNavClick(path?: string) {
    setMenuOpen(false);
    if (path) router.push(path);
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => {
            router.push("/");
            setMenuOpen(false);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && router.push("/")}
        >
          <div className="p-2 rounded-full bg-black shadow-md">
            <SiBookalope className="text-white text-xl" aria-hidden="true" />
          </div>
          <p className="text-xl font-mono font-bold select-none">Boomark</p>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-lg font-medium text-gray-700">
          <a href="#home" className="hover:text-black transition" tabIndex={0}>
            Home
          </a>
          <a
            href="#contributors"
            className="hover:text-black transition"
            tabIndex={0}
          >
            Contributors
          </a>
          <a href="#browse" className="hover:text-black transition" tabIndex={0}>
            Browse
          </a>
          <a href="#add" className="hover:text-black transition" tabIndex={0}>
            Add Book
          </a>
          <a href="#about" className="hover:text-black transition" tabIndex={0}>
            About Us
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
          type="button"
        >
          {menuOpen ? (
            <HiOutlineX className="h-6 w-6" aria-hidden="true" />
          ) : (
            <HiOutlineMenu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>

        {/* Auth Buttons - desktop */}
        <div className="hidden md:flex">
          {!isLoggedIn ? (
            <button
              onClick={goToLogin}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-md flex items-center transition focus:outline-none focus:ring-2 focus:ring-green-400"
              aria-label="Login"
              type="button"
            >
              <TbLogin className="mr-2" aria-hidden="true" />
              <span className="hidden sm:inline">Login</span>
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-md flex items-center transition focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Logout"
              type="button"
            >
              <TbLogout className="mr-2" aria-hidden="true" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white shadow-md border-t border-gray-200">
          <ul className="flex flex-col px-4 py-4 space-y-3 text-gray-700 font-medium">
            <li>
              <a
                href="#home"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-black transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#contributors"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-black transition"
              >
                Contributors
              </a>
            </li>
            <li>
              <a
                href="#browse"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-black transition"
              >
                Browse
              </a>
            </li>
            <li>
              <a
                href="#add"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-black transition"
              >
                Add Book
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-black transition"
              >
                About Us
              </a>
            </li>

            {/* Auth Buttons - mobile */}
            <li>
              {!isLoggedIn ? (
                <button
                  onClick={goToLogin}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-md flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-green-400"
                  aria-label="Login"
                  type="button"
                >
                  <TbLogin className="mr-2" aria-hidden="true" />
                  Login
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-md flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-red-400"
                  aria-label="Logout"
                  type="button"
                >
                  <TbLogout className="mr-2" aria-hidden="true" />
                  Logout
                </button>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
