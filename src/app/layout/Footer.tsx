import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";
import { MdLocationOn, MdPhone } from "react-icons/md";
import { SiBookalope } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="mt-12 px-6 py-10 bg-[#f9faf6] border-t border-gray-300 text-gray-600 text-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <div className="flex items-center p-5">
                   <div className="p-2 mr-2 rounded-full bg-black shadow-md dark:border-black/10">
                     <SiBookalope className="size-5 text-white" />
                   </div>
                   <p className="text-2xl font-mono">Bookmark</p>
                 </div>
          <p className="text-sm">
            Your trusted online bookstore. Discover new reads, classics, and knowledge that lasts.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/categories" className="hover:underline">Categories</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Contact</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><MdLocationOn /> Colombo, Sri Lanka</li>
            <li className="flex items-center gap-2"><MdPhone /> +94 71 234 5678</li>
            <li className="flex items-center gap-2"><FaEnvelope /> support@boomark.com</li>
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Follow Us</h4>
          <div className="flex gap-4 text-[#3D550C]">
            <Link href="#" className="hover:text-[#2d3b06]"><FaFacebookF className="size-5"/></Link>
            <Link href="#" className="hover:text-[#2d3b06]"><FaTwitter className="size-5"/></Link>
            <Link href="#" className="hover:text-[#2d3b06]"><FaInstagram className="size-5"/></Link>
            <Link href="#" className="hover:text-[#2d3b06]"><FaLinkedinIn className="size-5"/></Link>
          </div>
          <p className="mt-4 text-sm">Subscribe to our newsletter</p>
          <form className="mt-2 flex">
            <input
              type="email"
              placeholder="Enter email"
              className="px-3 py-1 w-full rounded-l-md border border-gray-300 text-sm"
            />
            <button className="bg-[#3D550C] text-white px-3 py-1 rounded-r-md hover:bg-[#2d3b06] text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center border-t pt-4 border-gray-200 text-xs text-gray-500">
        &copy; {new Date().getFullYear()} <span className="text-[#3D550C] font-semibold">Boomark</span>. All rights reserved. | <a href="/privacy" className="hover:underline">Privacy Policy</a> | <a href="/terms" className="hover:underline">Terms</a>
      </div>
    </footer>
  );
}
