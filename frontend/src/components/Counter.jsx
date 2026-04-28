import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Counter({ value, duration = 3 }) {
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);

  // Update UI on every frame
  useEffect(() => {
    const unsub = mv.on("change", (latest) => {
      setDisplay(Math.floor(latest));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    let controls;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // RESET every time it enters
          mv.set(0);

          controls = animate(mv, value, {
            duration: duration, // 🔥 slower animation
            ease: "easeOut",
          });
        }
      },
      {
        threshold: 0.5, // trigger when 50% visible
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      controls?.stop();
    };
  }, [value]);

  return <span ref={ref}>{display}</span>;
}