"use client";

import Header from "./components/Header";
import Footer from "./components/Footer";
import EmblaCarousel from "./components/slider/EmblaCarousel";

import "@/css/base.css";
import "@/css/sandbox.css";
import "@/css/embla.css";
import { useSearchParams } from "next/navigation";
import { CSSProperties } from "react";

const DEFAULT_SLIDE_COUNT = 2;

const styles: CSSProperties[] = [
  {
    backgroundColor: "#64afff",
    color: "#eee",
  },
  {
    backgroundColor: "#ff4b40",
    color: "#eee",
  },
  {
    backgroundColor: "#b6ff40",
    color: "#111",
  },
  {
    backgroundColor: "#40f2f2",
    color: "#111",
  },
  {
    backgroundColor: "#ff409c",
    color: "#eee",
  },
  {
    backgroundColor: "#6474ff",
    color: "#eee",
  },
];

export default function Home() {
  const params = useSearchParams();
  const slideCount = Number(params.get("slideCount") ?? DEFAULT_SLIDE_COUNT);
  const loop = params.get("loop") === "true";

  return (
    <>
      <Header />
      <div>
        <p># of slides: {slideCount}</p>
        <p>Loop: {loop ? "Enabled" : "Disabled"}</p>
      </div>
      <EmblaCarousel
        slides={Array.from({ length: slideCount }, (_, index) => (
          <div
            key={index}
            style={{
              ...styles[index % styles.length],
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
        options={{ loop }}
      />
      <Footer />
    </>
  );
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
