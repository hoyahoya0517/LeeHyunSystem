import { useEffect, useRef, useState } from "react";
import styles from "./Main.module.css";
import Logo from "/public/svg/logo.svg";
import {
  motion,
  useAnimate,
  useMotionValueEvent,
  useScroll,
} from "motion/react";

export default function Main({
  backgroundColor,
  setBackgroundColor,
}: {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}) {
  const [width, setWidth] = useState<number | undefined>();
  const [first, setFirst] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const [scope, animate] = useAnimate();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (first && latest >= 0.35 && latest < 0.85) {
      setFirst(false);
      setOpacity(1 - (latest - 0.6) * 5);
      setBackgroundColor("#000000");
      return;
    }
    setOpacity(1 - (latest - 0.6) * 5);
  });
  useEffect(() => {
    animate(
      scope.current,
      { backgroundColor: backgroundColor },
      { duration: 0.3, ease: "easeOut" }
    );
  }, [backgroundColor]);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <motion.div className={styles.main} ref={scope}>
      <motion.div
        ref={ref}
        className={styles.background}
        style={{ opacity: opacity }}
      >
        <img
          src="https://res.cloudinary.com/hoyahoya/image/upload/v1749929215/leehyun/44-min_atsczg.png"
          alt="background"
        />
      </motion.div>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className={styles.logo}
      >
        <Logo />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className={styles.comment}
      >
        {width && width > 768 ? (
          <motion.span style={{ opacity: opacity }}>
            새로운 세상을 만드는 기술
          </motion.span>
        ) : (
          <motion.span style={{ opacity: opacity }}>
            새로운 세상을
            <br />
            만드는 기술
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
