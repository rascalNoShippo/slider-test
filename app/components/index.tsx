import { useSearchParams } from "next/navigation";
import EmblaCarousel from "./slider/EmblaCarousel";
import { useState } from "react";
import styles from "./App.module.css";

const DEFAULT_SLIDE_COUNT = 2;

const slideClasses = [
  styles.slide1,
  styles.slide2,
  styles.slide3,
  styles.slide4,
  styles.slide5,
  styles.slide6,
];

const App = () => {
  const params = useSearchParams();
  const slideCount = Number(params.get("slideCount") ?? DEFAULT_SLIDE_COUNT);
  const loop = params.get("loop") === "on";

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
      <div>
        Current index: {index}
      </div>
      <EmblaCarousel
        slides={Array.from({ length: slideCount }, (_, i) => (
          <div
            key={i}
            className={`${styles.slide} ${slideClasses[i % slideClasses.length]}`}
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
