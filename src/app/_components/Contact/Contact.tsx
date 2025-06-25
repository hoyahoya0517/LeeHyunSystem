import { useEffect, useRef, useState } from "react";
import styles from "./Contact.module.css";
import {
  useAnimate,
  useMotionValueEvent,
  useScroll,
  motion,
} from "framer-motion";
import Logo from "/public/svg/logo.svg";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

export default function Contact({
  contactRef,
  setNavIsBlack,
  backgroundColor,
  setBackgroundColor,
}: {
  contactRef: React.RefObject<HTMLDivElement | null>;
  setNavIsBlack: (isBlack: boolean) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}) {
  const [first, setFirst] = useState(true);
  const [scope, animate] = useAnimate();
  const [sliderScope, animateSlider] = useAnimate();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log(2, latest);
    if (first && latest >= 0.35 && latest < 0.85) {
      setFirst(false);
      setBackgroundColor("#364fdc");
      setNavIsBlack(false);
      animateSlider(
        sliderScope.current,
        { opacity: 1 },
        { duration: 0.3, ease: "easeOut" }
      );
      return;
    } else if (first && latest < 0.35) {
      setFirst(false);
      setBackgroundColor("#f5f5f7");
      setNavIsBlack(true);
      return;
    } else if (first && latest >= 0.85) {
      setFirst(false);
      setBackgroundColor("#364fdc");
      return;
    }
    if (backgroundColor === "#f5f5f7" && latest >= 0.35 && latest < 0.85) {
      setBackgroundColor("#364fdc");
      setNavIsBlack(false);
      animateSlider(
        sliderScope.current,
        { opacity: 1 },
        { duration: 0.3, ease: "easeOut" }
      );
    } else if (backgroundColor === "#364fdc" && latest < 0.35 && latest > 0) {
      setBackgroundColor("#f5f5f7");
      setNavIsBlack(true);
      animateSlider(
        sliderScope.current,
        { opacity: 0 },
        { duration: 0.3, ease: "easeOut" }
      );
    } else if (backgroundColor === "#364fdc" && latest > 0.85 && latest < 1) {
      setBackgroundColor("#364fdc");
    } else if (
      backgroundColor === "#364fdc" &&
      latest <= 0.85 &&
      latest > 0.35
    ) {
      setBackgroundColor("#364fdc");
    }
  });
  useEffect(() => {
    animate(
      scope.current,
      { backgroundColor: backgroundColor },
      { duration: 0.3, ease: "easeOut" }
    );
  }, [backgroundColor]);
  return (
    <div className={styles.contact} ref={scope}>
      <div className={styles.background} ref={ref}>
        <div className={styles.main} ref={contactRef}>
          <motion.div
            className={styles.sliderContainer}
            ref={sliderScope}
            initial={{ opacity: 0 }}
          >
            <InfiniteSlider gap={24} className={styles.slider} speed={70}>
              <div className={styles.logo}>
                <Logo />
              </div>
              <div className={styles.logo}>
                <Logo />
              </div>
              <div className={styles.logo}>
                <Logo />
              </div>
              <div className={styles.logo}>
                <Logo />
              </div>
              <div className={styles.logo}>
                <Logo />
              </div>
              <div className={styles.logo}>
                <Logo />
              </div>
              <div className={styles.logo}>
                <Logo />
              </div>
              <div className={styles.logo}>
                <Logo />
              </div>
              <div className={styles.logo}>
                <Logo />
              </div>
            </InfiniteSlider>
          </motion.div>
        </div>
        <div className={styles.newWorld}>
          <span>
            새로운 세상을
            <br />
            경험해보세요.
          </span>
        </div>
        <div className={styles.way}>
          <span>CONTACT</span>
          <div className={styles.info}>
            <span>서울시 송파구 가락동77-4 305</span>
            <span>02-2222-2222</span>
          </div>
        </div>
      </div>
    </div>
  );
}
