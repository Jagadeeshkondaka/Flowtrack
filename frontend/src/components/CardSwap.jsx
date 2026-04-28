import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black 
    [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] 
    ${customClass ?? ""} ${rest.className ?? ""}`}
  />
));
Card.displayName = "Card";

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * 20, // reduced depth (prevents overflow)
  zIndex: total - i,
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap = ({
  width = 500,
  height = 300,
  cardDistance = 40,
  verticalDistance = 40,
  delay = 4000,
  pauseOnHover = true,
  onCardClick,
  skewAmount = 3,
  easing = "linear",
  children,
}) => {
  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    [childArr.length]
  );

  const order = useRef(
    Array.from({ length: childArr.length }, (_, i) => i)
  );

  const intervalRef = useRef();

  useEffect(() => {
    const total = refs.length;

    refs.forEach((r, i) =>
      placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount)
    );

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;

      const tl = gsap.timeline();

      tl.to(elFront, {
        y: "+=300",
        duration: 0.8,
      });

      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);

        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: 0.8,
          },
          "-=0.6"
        );
      });

      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length
      );

      tl.to(elFront, {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        duration: 0.8,
      });

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = setInterval(swap, delay);

    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, skewAmount]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height },
          onClick: () => onCardClick?.(i),
        })
      : child
  );

  return (
    <div
      className="relative flex items-center justify-center perspective-[900px]"
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;