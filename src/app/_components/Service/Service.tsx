import { useEffect, useRef, useState } from "react";
import styles from "./Service.module.css";
import {
  useAnimate,
  useMotionValueEvent,
  useScroll,
  motion,
} from "motion/react";
import DecryptedText from "../../../../Reactbits/DecryptedText/DecryptedText";

export default function Service({
  serviceRef,
  setNavIsBlack,
  backgroundColor,
  setBackgroundColor,
}: {
  serviceRef: React.RefObject<HTMLDivElement | null>;
  setNavIsBlack: (isBlack: boolean) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}) {
  const [first, setFirst] = useState(true);
  const [stickyColor, setStickyColor] = useState("#80808b");
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
      setBackgroundColor("#364fdc");
      setStickyColor("#f5f5f7");
      imageAnimate(
        imageScope.current,
        { opacity: 1 },
        { duration: 0, ease: "easeOut" }
      );
      return;
    } else if (first && latest < 0.35) {
      setFirst(false);
      setBackgroundColor("#f5f5f7");
      setNavIsBlack(true);
      setStickyColor("#80808b");
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
      setStickyColor("#f5f5f7");
    }
    if (backgroundColor === "#f5f5f7" && latest >= 0.35 && latest < 0.85) {
      setBackgroundColor("#364fdc");
      setNavIsBlack(false);
      imageAnimate(
        imageScope.current,
        { opacity: 1 },
        { duration: 0.3, ease: "easeOut" }
      );
    } else if (backgroundColor === "#364fdc" && latest < 0.35 && latest > 0) {
      setBackgroundColor("#f5f5f7");
      setNavIsBlack(true);
      setStickyColor("#80808b");
      imageAnimate(
        imageScope.current,
        { opacity: 0 },
        { duration: 0.3, ease: "easeOut" }
      );
    } else if (backgroundColor === "#364fdc" && latest >= 0.85 && latest < 1) {
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
    <div className={styles.service} ref={scope}>
      <div className={styles.background} ref={ref}>
        <div className={styles.stickyContainer} ref={serviceRef}>
          <div className={styles.sticky}>
            <span style={{ color: stickyColor }}>SERVICE</span>
          </div>
        </div>
        <div className={styles.textContainer}>
          <motion.div className={styles.text} style={{ opacity: opacity }}>
            <div className={styles.textTitle}>
              <DecryptedText
                text="DELTA"
                speed={200}
                maxIterations={20}
                characters="ABCD1234!?"
                animateOn="view"
                revealDirection="start"
                useOriginalCharsOnly={true}
                className="revealed"
                parentClassName="all-letters"
                encryptedClassName="encrypted"
              />
            </div>
            <div className={styles.textContent}>
              <span>
                DELTA는 설립 이래로 지속적인 혁신과 새로운 제품 및 기술의
                체계적인 개발에 전념해 왔으며, 이를 통해 기술 혁신 분야의 선도
                기업으로 자리매김해 왔습니다. DELTA는 다양한 용도에 적합한 범용
                시각화 제품을 폭넓게 제공합니다. 뛰어난 성능, 신뢰성, 친환경성을
                완벽하게 조합한 DELTA의 디스플레이 제품은 전 세계 모든 응용
                분야에 이상적인 시각 솔루션을 제공합니다.
              </span>
            </div>
          </motion.div>
        </div>
        <motion.div
          className={styles.imageContainer}
          style={{ opacity: opacity }}
        >
          <motion.div className={styles.image} ref={imageScope}>
            <img
              src="https://res.cloudinary.com/hoyahoya/image/upload/v1750065242/leehyun/3rd-min_fvomv8.png"
              alt=""
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
