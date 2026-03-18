import { ReactNode, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";

type PropType = {
  slides: ReactNode[];
  options?: EmblaOptionsType;
};

const EmblaCarousel = ({ slides, options }: PropType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const [repeatTimes, setRepeatTimes] = useState(1);

  useEffect(() => {
    if (!emblaApi || !options?.loop) return;

    const totalSlideLength = emblaApi
      .slideNodes()
      .reduce((acc, node) => acc + node.clientWidth, 0);

    if (totalSlideLength === 0) return;

    const repeatTimes = Math.ceil(
      (emblaApi.rootNode().clientWidth * 2) / totalSlideLength
    );

    queueMicrotask(() => setRepeatTimes(repeatTimes));
  }, [emblaApi, options?.loop]);

  const { selectedIndex, dotIndices, onDotButtonClick } = useDotButton(
    emblaApi,
    repeatTimes
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {repeatArray(slides, repeatTimes).map((element, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">{element}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {dotIndices.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;

const repeatArray = <T extends Array<unknown>>(
  array: T,
  times: number = 1
): T[number][] => {
  if (times < 0 || !Number.isInteger(times)) {
    throw new Error("Times must be a positive integer or zero");
  }

  return Array.from({ length: times }, () => array).flat();
};
