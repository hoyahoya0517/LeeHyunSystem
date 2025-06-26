import { useEffect, useRef, useState } from "react";
import styles from "./About.module.css";
import {
  useAnimate,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

export default function About({
  aboutRef,
  setNavIsBlack,
  backgroundColor,
  setBackgroundColor,
}: {
  aboutRef: React.RefObject<HTMLDivElement | null>;
  setNavIsBlack: (isBlack: boolean) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}) {
  const [first, setFirst] = useState(true);
  const [stickyColor, setStickyColor] = useState("#000000");
  const [opacity, setOpacity] = useState(0);
  const [scope, animate] = useAnimate();
  const [imageScope, imageAnimate] = useAnimate();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (first && latest >= 0.35 && latest < 0.85) {
      setFirst(false);
      setOpacity(1 - (latest - 0.6) * 5);
      setBackgroundColor("#f5f5f7");
      setStickyColor("#000000");
      setNavIsBlack(true);
      imageAnimate(
        imageScope.current,
        { opacity: 1 },
        { duration: 0, ease: "easeOut" }
      );
      return;
    } else if (first && latest < 0.35) {
      setFirst(false);
      setStickyColor("#000000");
      setNavIsBlack(false);
      imageAnimate(
        imageScope.current,
        { opacity: 0 },
        { duration: 0, ease: "easeOut" }
      );
      return;
    } else if (first && latest >= 0.85) {
      setFirst(false);
      setStickyColor("#80808b");
      return;
    }
    setOpacity(1 - (latest - 0.6) * 5);
    if (latest >= 0.35 && latest < 0.85) {
      setStickyColor("#000000");
    }
    if (backgroundColor === "#000000" && latest >= 0.35 && latest < 0.85) {
      setBackgroundColor("#f5f5f7");
      setNavIsBlack(true);
      imageAnimate(
        imageScope.current,
        { opacity: 1 },
        { duration: 0.3, ease: "easeOut" }
      );
    } else if (backgroundColor === "#f5f5f7" && latest < 0.35 && latest > 0) {
      setBackgroundColor("#000000");
      setNavIsBlack(false);
      imageAnimate(
        imageScope.current,
        { opacity: 0 },
        { duration: 0.3, ease: "easeOut" }
      );
    } else if (backgroundColor === "#f5f5f7" && latest >= 0.85 && latest < 1) {
      setStickyColor("#80808b");
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
    <div className={styles.about} ref={scope}>
      <div className={styles.background} ref={ref}>
        <div className={styles.stickyContainer} ref={aboutRef}>
          <div className={styles.sticky}>
            <span style={{ color: stickyColor }}>ABOUT</span>
          </div>
        </div>
        <motion.div
          className={styles.imageContainer}
          style={{ opacity: opacity }}
        >
          <motion.div className={styles.image} ref={imageScope}>
            <img
              src="https://res.cloudinary.com/hoyahoya/image/upload/v1750011524/leehyun/con-min_t7bauw.png"
              alt=""
            />
          </motion.div>
        </motion.div>
        <div className={styles.textContainer}>
          <motion.div className={styles.text} style={{ opacity: opacity }}>
            <PointerHighlight
              rectangleClassName="bg-[#b4d7fe]"
              containerClassName="inline-block mx-1"
            >
              <span className="relative z-10">
                기술과 세상을 <br />
                연결합니다.
              </span>
            </PointerHighlight>
            <span>
              ㈜이현시스템은 2011년에 설립한 상황실 구축 전문 업체입니다. 기술과
              세상을 연결한다는 이념으로 고객의 가치 향상을 목표로 하고
              있습니다. DELTA Electronics DLP CUBE 솔루션 국내 총판으로 상황실
              솔루션 및 기타 솔루션을 제공하는 전문회사이며, 상황/관제 시스템
              관련 유지보수 업무를 담당하고 있습니다.
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
