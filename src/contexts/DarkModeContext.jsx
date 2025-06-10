"use client";

import { ThemeProvider } from "next-themes";

export function DarkModeContext({ children }) {
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system">
      {children}
    </ThemeProvider>
  );
}
