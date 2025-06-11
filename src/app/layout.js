import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import {
  FilterProvider,
  ProgressProvider,
  UserContextProvider,
} from "@/contexts";

import { Continent, Footer, Header } from "@/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Geo Explorer",
  description: "Created by Route 66 Team - Northcoders",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased `}
      >
        <UserContextProvider>
          <FilterProvider>
            <ProgressProvider>
              <Header />
              <main className="flex flex-col grow">{children}</main>
              <Footer />
            </ProgressProvider>
          </FilterProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
