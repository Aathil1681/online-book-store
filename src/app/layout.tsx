import "./globals.css";
import { ReactNode } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

export const metadata = {
  title: "Bookmark",
  description: "Discover your next favorite book",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <main style={{ flexGrow: 1, padding: "1rem" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
