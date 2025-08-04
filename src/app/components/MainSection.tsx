import Header from "../layout/Header";

export default function MainSection() {
  return (
    <section className="relative p-4 m-2 inset-shadow-sm">
      <Header />
      <div
        className="p-5 flex flex-col justify-center h-full max-w-7xl mx-auto"
        aria-label="Welcome Section"
      >
        <div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold mt-4 p-3">
            Welcome to Bookmark
          </h1>
          <p className="text-base md:text-lg text-gray-900 max-w-xl font-medium mt-4 p-5 ml-0 md:ml-5 shadow-sm">
            At BookMark, we are redefining the way you discover and enjoy books.
            Whether you&apos;re a lifelong reader or just beginning your journey into the
            world of literature, BookMark is your trusted companion.
          </p>
        </div>

        {/* Browse and Donate Buttons */}
        <div className="mt-12 flex flex-col items-center gap-5 md:flex-row md:justify-start md:gap-6">
          <button
            className="w-full md:w-auto rounded-lg bg-gray-950 px-6 py-3 text-center text-sm md:text-base font-medium tracking-wide text-white shadow-md hover:bg-gray-800 transition"
            onClick={() => {
              window.scrollBy({
                top: window.innerHeight,
                behavior: "smooth",
              });
            }}
          >
            Start Browse
          </button>

          <button className="w-full md:w-auto rounded-full border border-white/25 bg-white/40 px-6 py-3 text-center text-sm md:text-base font-medium tracking-wide text-gray-950 shadow-md ring ring-[#D15052]/5 hover:bg-white/60 transition">
            Donate Books
          </button>
        </div>
      </div>
    </section>
  );
}
