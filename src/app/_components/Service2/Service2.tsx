import {
  motion,
  useAnimate,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import styles from "./Service2.module.css";
import { useEffect, useRef, useState } from "react";
import CardSwap, { Card } from "../../../../Reactbits/CardSwap/CardSwap";

export default function Service2({
  setNavIsBlack,
  backgroundColor,
  setBackgroundColor,
}: {
  setNavIsBlack: (isBlack: boolean) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}) {
  const [width, setWidth] = useState<number | undefined>();
  const [first, setFirst] = useState(true);
  const [stickyColor, setStickyColor] = useState("#000000");
  const [opacity, setOpacity] = useState(0);
  const [scope, animate] = useAnimate();
  const [stackScope, stackAnimate] = useAnimate();
  const [titleScope, titleAnimate] = useAnimate();
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
      setNavIsBlack(false);
      stackAnimate(
        stackScope.current,
        { opacity: 1 },
        { duration: 0, ease: "easeOut" }
      );
      titleAnimate(
        titleScope.current,
        { opacity: 1 },
        { duration: 0, ease: "easeOut" }
      );
      return;
    } else if (first && latest < 0.35) {
      setFirst(false);
      setBackgroundColor("#364fdc");
      setNavIsBlack(true);
      setStickyColor("#80808b");
      stackAnimate(
        stackScope.current,
        { opacity: 0 },
        { duration: 0, ease: "easeOut" }
      );
      titleAnimate(
        titleScope.current,
        { opacity: 0 },
        { duration: 0, ease: "easeOut" }
      );
      return;
    } else if (first && latest >= 0.85) {
      setFirst(false);
      setBackgroundColor("#f5f5f7");
      setStickyColor("#80808b");
      return;
    }
    setOpacity(1 - (latest - 0.6) * 5);
    if (backgroundColor === "#364fdc" && latest >= 0.35 && latest < 0.85) {
      setBackgroundColor("#364fdc");
      setNavIsBlack(false);
      setStickyColor("#f5f5f7");
      stackAnimate(
        stackScope.current,
        { opacity: 1 },
        { duration: 0.3, ease: "easeOut" }
      );
      titleAnimate(
        titleScope.current,
        { opacity: 1 },
        { duration: 0.3, ease: "easeOut" }
      );
    } else if (backgroundColor === "#364fdc" && latest < 0.3 && latest > 0) {
      setBackgroundColor("#364fdc");
      setNavIsBlack(false);
      setStickyColor("#80808b");
      stackAnimate(
        stackScope.current,
        { opacity: 0 },
        { duration: 0.3, ease: "easeOut" }
      );
      titleAnimate(
        titleScope.current,
        { opacity: 0 },
        { duration: 0.3, ease: "easeOut" }
      );
    } else if (backgroundColor === "#364fdc" && latest > 0.85 && latest < 1) {
      setBackgroundColor("#f5f5f7");
      setStickyColor("#80808b");
    } else if (
      backgroundColor === "#f5f5f7" &&
      latest <= 0.85 &&
      latest > 0.35
    ) {
      setBackgroundColor("#364fdc");
      setStickyColor("#f5f5f7");
    }
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
    <div className={styles.service2} ref={scope}>
      <div className={styles.background} ref={ref}>
        <div className={styles.stickyContainer}>
          <div className={styles.sticky}>
            <span style={{ color: stickyColor }}>DISPLAY</span>
          </div>
        </div>
        <div className={styles.stackContainer}>
          <div className={styles.titleContainer} style={{ opacity: opacity }}>
            <div className={styles.title} ref={titleScope}>
              {width && width > 768 ? (
                <div className={styles.titleText}>
                  <span>화면을 통해 현실</span>
                  <span className={styles.sign}>↔</span>
                  <span>그 이상의 세상을</span>
                  <span className={styles.sign}>⤵︎</span>
                  <span>경험하세요.</span>
                </div>
              ) : (
                <div className={styles.titleText}>
                  <span>
                    화면을 통해 현실
                    <br />
                  </span>
                  <span className={styles.sign}>↔︎</span>
                  <span>그 이상의 세상을 경험하세요.</span>
                  <span className={styles.sign}>⤵︎</span>
                </div>
              )}
            </div>
          </div>
          <motion.div
            className={styles.stack}
            ref={stackScope}
            initial={{ opacity: 1 }}
            style={
              width && width > 768
                ? { top: `calc(150% - ${(2 - opacity) * 30}%)` }
                : { top: `calc(90% + ${(2 - opacity) * 10}%)` }
            }
          >
            <div style={{ opacity: opacity }}>
              <CardSwap
                width={width && width > 768 ? "100vw" : "200vw"}
                height={"100vh"}
                cardDistance={60}
                verticalDistance={130}
                delay={3000}
                skewAmount={3}
              >
                <Card customClass={styles.card1}>
                  <p className={styles.cardP}>4K Laser DLP Cube</p>
                </Card>
                <Card customClass={styles.card2}>
                  <p className={styles.cardP}>RGB Laser DLP Cube</p>
                </Card>
                <Card customClass={styles.card3}>
                  <p className={styles.cardP}>Laser DLP Cube</p>
                </Card>
              </CardSwap>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
