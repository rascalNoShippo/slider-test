"use client";

import Header from "./components/Header";
import Footer from "./components/Footer";
import App from "./components";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
      <Footer />
    </>
  );
}
