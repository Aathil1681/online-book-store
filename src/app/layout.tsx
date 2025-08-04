import "./globals.css";
import { ReactNode } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { ApiProvider } from "@/providers/apiProvider";

export const metadata = {
  title: "Bookmark",
  description: "Discover your next favorite book",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <ApiProvider >       
        <div>{children}</div>        
        </ApiProvider>
      </body>
    </html>
  );
}
