"use client";

import Header from "./components/Header";
import Footer from "./components/Footer";
import EmblaCarousel from "./components/slider/EmblaCarousel";
import type { EmblaOptionsType } from "embla-carousel";

import "@/css/base.css";
import "@/css/sandbox.css";
import "@/css/embla.css";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 2;
const SLIDES = Array.from({ length: SLIDE_COUNT }, () => createRandomColor());

export default function Home() {
  return (
    <>
      <Header />
      <EmblaCarousel
        slides={SLIDES.map((color, index) => (
          <div
            key={index}
            style={{
              backgroundColor: color,
              color: calcTextColor(color),
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {index + 1}
          </div>
        ))}
        options={OPTIONS}
      />
      <Footer />
    </>
  );
}

function createRandomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}

function calcLuminance(color: string) {
  const [r, g, b] = [
    color.slice(1, 3),
    color.slice(3, 5),
    color.slice(5, 7),
  ].map((hex) => parseInt(hex, 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function calcTextColor(color: string) {
  return calcLuminance(color) < 0.6 ? "#eee" : "#111";
}
