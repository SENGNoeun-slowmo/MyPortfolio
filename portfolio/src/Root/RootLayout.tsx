// src/layouts/RootLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header"; // your fixed navbar
import CursorTrail from "../animation/TextCursor"; // the trail effect we created

export default function RootLayout() {
  return (
    <>
      {/* Cursor trail as a fixed overlay — covers the whole viewport */}
      <CursorTrail />

      {/* Header (assuming it's fixed top-0) */}
      <Header />

      {/* Main content with offset for fixed header */}
      <main className="pt-12 min-h-screen bg-gray-50">
        {/* pt-12 = 3rem, adjust if your header height changes */}
        <Outlet />
      </main>
    </>
  );
}