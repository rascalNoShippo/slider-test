import { useSearchParams } from "next/navigation";
import EmblaCarousel from "./slider/EmblaCarousel";
import { CSSProperties, useState } from "react";

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
  const loop = params.get("loop") === "on";

  const [index, setIndex] = useState(0);

  return (
    <>
      <form
        method="GET"
        style={{
          display: "grid",
          gap: "10px",
          backgroundColor: "#eee",
          width: 300,
        }}
      >
        Configuration:
        <label>
          # of slides:
          <input
            type="number"
            name="slideCount"
            defaultValue={slideCount}
            className="border border-gray-300 rounded-md p-2"
          />
        </label>
        <label>
          Loop:
          <input
            type="checkbox"
            name="loop"
            defaultChecked={loop}
            className="border border-gray-300 rounded-md p-2"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600 active:bg-blue-700"
        >
          Reload
        </button>
      </form>
      <div>
        Current index: {index}
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
        onIndexChange={(index) => {
          setIndex(index);
        }}
      />
    </>
  );
};

export default App;
