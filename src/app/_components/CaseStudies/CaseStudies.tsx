import { useEffect, useRef, useState } from "react";
import styles from "./CaseStudies.module.css";
import {
  useAnimate,
  useMotionValueEvent,
  useScroll,
  motion,
  AnimatePresence,
} from "framer-motion";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function CaseStudies({
  caseStudiesRef,
  setNavIsBlack,
  backgroundColor,
  setBackgroundColor,
}: {
  caseStudiesRef: React.RefObject<HTMLDivElement | null>;
  setNavIsBlack: (isBlack: boolean) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}) {
  const [width, setWidth] = useState<number | undefined>();
  const [isPage, setIsPage] = useState(false);
  const [index, setIndex] = useState(1);
  const [first, setFirst] = useState(true);
  const [stickyColor, setStickyColor] = useState("#80808b");
  const [opacity, setOpacity] = useState(0);
  const [scope, animate] = useAnimate();
  const [slideScope, slideAnimate] = useAnimate();
  const [mainSlideScope, mainSlideAnimate] = useAnimate();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rightHandle = () => {
    if (index === 5) return;
    const tmp = index;
    setIndex(tmp + 1);
    mainSlideAnimate(
      mainSlideScope.current,
      { x: `${-tmp * (width && width > 768 ? 500 : 350)}px` },
      { duration: 0.5, ease: "easeOut" }
    );
  };
  const leftHandle = () => {
    if (index === 1) return;
    const tmp = index;
    setIndex(tmp - 1);
    mainSlideAnimate(
      mainSlideScope.current,
      { x: `${-(tmp - 2) * (width && width > 768 ? 500 : 350)}px` },
      { duration: 0.5, ease: "easeOut" }
    );
  };
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (first && latest >= 0.35 && latest < 0.85) {
      setFirst(false);
      setOpacity(1 - (latest - 0.6) * 5);
      setBackgroundColor("#f5f5f7");
      setStickyColor("#000000");
      setNavIsBlack(true);
      slideAnimate(
        slideScope.current,
        { opacity: 1 },
        { duration: 0, ease: "easeOut" }
      );
      if (latest >= 0.65 && latest < 0.85) {
        setIsPage(false);
      } else if (latest < 0.65 && latest > 0.35) {
        setIsPage(true);
      }
    } else if (first && latest < 0.35) {
      setFirst(false);
      setBackgroundColor("#364fdc");
      setNavIsBlack(false);
      setStickyColor("#80808b");
      slideAnimate(
        slideScope.current,
        { opacity: 0 },
        { duration: 0, ease: "easeOut" }
      );
      setIsPage(false);
      return;
    } else if (first && latest >= 0.85) {
      setFirst(false);
      setBackgroundColor("#364fdc");
      setStickyColor("#80808b");
      setIsPage(false);
      return;
    }
    setOpacity(1 - (latest - 0.6) * 5);
    if (backgroundColor === "#364fdc" && latest >= 0.35 && latest < 0.85) {
      setBackgroundColor("#f5f5f7");
      setNavIsBlack(true);
      setStickyColor("#000000");
      slideAnimate(
        slideScope.current,
        { opacity: 1 },
        { duration: 0.3, ease: "easeOut" }
      );
    } else if (backgroundColor === "#f5f5f7" && latest < 0.35 && latest > 0) {
      setBackgroundColor("#364fdc");
      setNavIsBlack(false);
      setStickyColor("#80808b");
      slideAnimate(
        slideScope.current,
        { opacity: 0 },
        { duration: 0.3, ease: "easeOut" }
      );
      setIsPage(false);
    } else if (backgroundColor === "#f5f5f7" && latest >= 0.85 && latest < 1) {
      setStickyColor("#80808b");
    } else if (
      backgroundColor === "#364fdc" &&
      latest < 0.85 &&
      latest > 0.35
    ) {
      setStickyColor("#000000");
    }
    if (backgroundColor === "#f5f5f7" && latest >= 0.65 && latest < 1) {
      setIsPage(false);
    } else if (
      backgroundColor === "#f5f5f7" &&
      latest < 0.65 &&
      latest > 0.35
    ) {
      setIsPage(true);
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
    <div className={styles.caseStudies} ref={scope} id="caseStudies">
      <div className={styles.background} ref={ref}>
        <div className={styles.stickyContainer} ref={caseStudiesRef}>
          <div className={styles.sticky}>
            <span style={{ color: stickyColor }}>CASE STUDIES</span>
          </div>
        </div>
        <div className={styles.slideContainer} ref={slideScope}>
          <motion.div
            className={styles.slide}
            ref={mainSlideScope}
            style={{ opacity: opacity }}
          >
            <div className={styles.card}>
              <div className={styles.cardImage}>
                <img src="https://res.cloudinary.com/hoyahoya/image/upload/v1750445062/leehyun/20200825_125152-min_bud00v.jpg" />
                <div className={styles.text}>
                  <span>
                    울산광역시
                    <br />
                    교통관리센터 상황실
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardImage}>
                <img src="https://res.cloudinary.com/hoyahoya/image/upload/v1750418358/leehyun/20200825_135939-min_itmqhg.jpg" />
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardImage}>
                <img src="https://res.cloudinary.com/hoyahoya/image/upload/v1750418358/leehyun/20201119_181922-min_q7x0zf.jpg" />
                <div className={styles.text}>
                  <span>중앙재난안전상황실</span>
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardImage}>
                <img src="https://res.cloudinary.com/hoyahoya/image/upload/v1750418348/leehyun/IMG_20160729_172602-min_odytrj.jpg" />
                <div className={styles.text}>
                  <span>한국전력 상황실</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <AnimatePresence>
          {isPage && (
            <motion.div
              className={styles.button}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <span
                onClick={leftHandle}
                style={
                  index === 1 ? { cursor: "default" } : { cursor: "pointer" }
                }
              >
                <BiChevronLeft
                  size={32}
                  color={index === 1 ? "#bebebe" : "#707072"}
                />
              </span>
              <span
                onClick={rightHandle}
                style={
                  index === 5 ? { cursor: "default" } : { cursor: "pointer" }
                }
              >
                <BiChevronRight
                  size={32}
                  color={index === 5 ? "#bebebe" : "#707072"}
                />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
