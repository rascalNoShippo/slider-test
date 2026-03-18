import { useSearchParams } from "next/navigation";
import EmblaCarousel from "./slider/EmblaCarousel";
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

const App = () => {
  const params = useSearchParams();
  const slideCount = Number(params.get("slideCount") ?? DEFAULT_SLIDE_COUNT);
  const loop = params.get("loop") === "true";

  return (
    <>
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
      />{" "}
    </>
  );
};

export default App;
