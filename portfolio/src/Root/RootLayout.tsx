import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function RootLayout() {
  return (
    <>
      <Header />

      {/* Offset for fixed navbar (h-12 = 3rem) */}
      <main className="pt-12">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
