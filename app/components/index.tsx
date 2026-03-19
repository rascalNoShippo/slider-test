import { useSearchParams } from "next/navigation";
import EmblaCarousel from "./slider/EmblaCarousel";
import { useEffect, useState } from "react";
import styles from "./App.module.css";

const DEFAULT_SLIDE_COUNT = 2;
const PLACEHOLDER_COLOR = "transparent";

const App = () => {
  const params = useSearchParams();
  const slideCount = Number(params.get("slideCount") ?? DEFAULT_SLIDE_COUNT);
  const loop = params.get("loop") === "on";

  const [colors, setColors] = useState<string[] | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setColors(Array.from({ length: slideCount }, () => randomColor()));
    });
  }, [slideCount]);

  const [index, setIndex] = useState(0);

  return (
    <>
      <form method="GET" className={styles.form}>
        Configuration:
        <label>
          # of slides:
          <input
            type="number"
            name="slideCount"
            defaultValue={slideCount}
            className={styles.input}
          />
        </label>
        <label>
          Loop:
          <input
            type="checkbox"
            name="loop"
            defaultChecked={loop}
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.submitButton}>
          Reload
        </button>
      </form>
      <div className={styles.currentSlide}>Current slide: {index + 1}</div>
      <EmblaCarousel
        slides={Array.from({ length: slideCount }, (_, i) => (
          <div
            key={i}
            style={{ backgroundColor: colors?.[i] ?? PLACEHOLDER_COLOR }}
            className={styles.slide}
            data-index={i}
            data-color={colors?.[i] ?? PLACEHOLDER_COLOR}
          >
            {i + 1}
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
const randomColor = () => {
  const [r, g, b] = Array.from({ length: 3 }, () =>
    Math.floor(Math.random() * 256)
  );
  return `rgb(${r}, ${g}, ${b})`;
};
