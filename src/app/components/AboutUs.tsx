import React from "react";
import { FaBookOpen, FaHandshake, FaRocket } from "react-icons/fa";

export default function AboutUs() {
  return (
    <section className="px-6 py-16 text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            About Boomark
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Boomark is more than a bookstore — it's a community for readers, learners, and dreamers. Our mission is to connect people with the stories, knowledge, and imagination that books offer.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <FaBookOpen
              className="mx-auto text-5xl text-black mb-4 drop-shadow-[0_0_8px_rgba(0,0,0,0.4)]"
              style={{ textShadow: "0 0 6px rgba(0,0,0,0.4)" }}
            />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Curated Selection
            </h3>
            <p className="text-sm text-gray-600">
              From timeless classics to emerging authors — we offer a thoughtfully curated catalog to satisfy every reader.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <FaHandshake
              className="mx-auto text-5xl text-black mb-4 drop-shadow-[0_0_8px_rgba(0,0,0,0.4)]"
              style={{ textShadow: "0 0 6px rgba(0,0,0,0.4)" }}
            />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Trusted Community
            </h3>
            <p className="text-sm text-gray-600">
              We believe in building lasting relationships with our readers, authors, and partners — based on trust and service.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <FaRocket
              className="mx-auto text-5xl text-black mb-4 drop-shadow-[0_0_8px_rgba(0,0,0,0.4)]"
              style={{ textShadow: "0 0 6px rgba(0,0,0,0.4)" }}
            />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Innovation-Driven
            </h3>
            <p className="text-sm text-gray-600">
              We embrace technology to enhance how people discover, buy, and enjoy books — anytime, anywhere.
            </p>
          </div>
        </div>

        {/* CTA or Vision */}
        <div className="mt-16 text-center">
          <h3 className="text-xl md:text-2xl font-semibold text-black mb-2">
            Our Vision
          </h3>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            To be the most reader-focused online bookstore — where imagination meets inspiration, and every book finds its reader.
          </p>
        </div>
      </div>
    </section>
  );
}
