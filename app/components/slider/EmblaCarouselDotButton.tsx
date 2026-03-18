import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { EmblaCarouselType } from "embla-carousel";

type UseDotButtonType = {
  selectedIndex: number;
  dotIndices: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
  repeatTimes: number
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const slidesCount = (emblaApi?.slideNodes().length ?? 0) / repeatTimes;

  const dotIndices = useMemo(() => {
    return Array.from({ length: slidesCount }, (_, i) => i);
  }, [slidesCount]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;

      if (repeatTimes === 1) {
        emblaApi.goTo(index);
        return;
      }

      // リピートされている場合は複製を含めて最も近い（スクロール量が少ない）スナップへ移動
      const totalSnaps = emblaApi.snapList().length;
      const currentSnap = emblaApi.selectedSnap();

      let nearestSnap = index;
      let minDistance = totalSnaps;

      for (let k = 0; k < repeatTimes; k++) {
        const targetSnap = index + k * slidesCount;
        const backward = (currentSnap - targetSnap + totalSnaps) % totalSnaps;
        const forward = (targetSnap - currentSnap + totalSnaps) % totalSnaps;
        const dist = Math.min(backward, forward);
        const preferForward = forward <= backward; // 同距離の場合は右（次のスライド）へ
        if (dist < minDistance || (dist === minDistance && preferForward)) {
          minDistance = dist;
          nearestSnap = targetSnap;
        }
      }

      emblaApi.goTo(nearestSnap);
    },
    [emblaApi, repeatTimes, slidesCount]
  );

  const onSelect = useCallback(
    (emblaApi: EmblaCarouselType) => {
      const snap = emblaApi.selectedSnap();
      setSelectedIndex(
        repeatTimes > 1 && slidesCount > 0 ? snap % slidesCount : snap
      );
    },
    [repeatTimes, slidesCount]
  );

  useEffect(() => {
    if (!emblaApi) return;

    queueMicrotask(() => onSelect(emblaApi));
    emblaApi.on("reinit", onSelect).on("select", onSelect);

    return () => {
      emblaApi.off("reinit", onSelect).off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return {
    selectedIndex,
    dotIndices,
    onDotButtonClick,
  };
};

type PropType = ComponentPropsWithRef<"button">;

export const DotButton = (props: PropType) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};
