import {
  AnimatePresence,
  motion,
  useAnimate,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import styles from "./Service2.module.css";
import { useEffect, useRef, useState } from "react";
import CardSwap, { Card } from "../../../../Reactbits/CardSwap/CardSwap";
import { AiOutlineClose } from "react-icons/ai";

export default function Service2({
  setNavIsBlack,
  backgroundColor,
  setBackgroundColor,
}: {
  setNavIsBlack: (isBlack: boolean) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}) {
  const [scrollY, setScrollY] = useState(0);
  const [window1Open, setWindow1Open] = useState(false);
  const [window2Open, setWindow2Open] = useState(false);
  const [window3Open, setWindow3Open] = useState(false);
  const [width, setWidth] = useState<number | undefined>();
  const [first, setFirst] = useState(true);
  const [stickyColor, setStickyColor] = useState("#80808b");
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
      setNavIsBlack(false);
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
      setStickyColor("#80808b");
      return;
    }
    setOpacity(1 - (latest - 0.6) * 5);
    if (latest >= 0.35 && latest < 0.85) {
      setStickyColor("#f5f5f7");
    }
    if (backgroundColor === "#364fdc" && latest >= 0.35 && latest < 0.85) {
      setBackgroundColor("#364fdc");
      setNavIsBlack(false);
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
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const html: HTMLHtmlElement =
      window.document.getElementsByTagName("html")[0];
    const body: HTMLBodyElement =
      window.document.getElementsByTagName("body")[0];
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIos =
      userAgent.indexOf("iphone") > -1 ||
      (userAgent.indexOf("ipad") > -1 && "ontouchend" in document);
    if (window1Open || window2Open || window3Open) {
      if (isIos) {
        const tmpScrollY = window.scrollY;
        setScrollY(tmpScrollY);
        body.style.position = "fixed";
        body.style.top = `-${tmpScrollY}px`;
        html.style.scrollBehavior = "unset";
      } else {
        body.style.overflow = "hidden";
      }
    } else {
      if (isIos) {
        body.style.removeProperty("position");
        body.style.removeProperty("top");
        window.scrollTo(0, scrollY);
        html.style.scrollBehavior = "smooth";
      } else {
        body.style.removeProperty("overflow");
      }
    }
  }, [window1Open, window2Open, window3Open]);
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
                : { top: "100%" }
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
                <Card
                  customClass={styles.card1}
                  onClick={() => setWindow1Open(true)}
                >
                  <p className={styles.cardP}>4K Laser DLP Cube</p>
                </Card>
                <Card
                  customClass={styles.card2}
                  onClick={() => setWindow2Open(true)}
                >
                  <p className={styles.cardP}>RGB Laser DLP Cube</p>
                </Card>
                <Card
                  customClass={styles.card3}
                  onClick={() => setWindow3Open(true)}
                >
                  <p className={styles.cardP}>Laser DLP Cube</p>
                </Card>
              </CardSwap>
            </div>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {window1Open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={styles.window}
            onClick={() => setWindow1Open(false)}
          >
            <div
              className={styles.windowMain}
              onClick={(e) => e.stopPropagation()}
            >
              <span
                className={styles.close}
                onClick={() => setWindow1Open(false)}
              >
                <AiOutlineClose size={24} color="black" />
              </span>
              <div className={styles.windowContent}>
                <div className={styles.windowImage}>
                  <div className={styles.imageContainer}>
                    <img src="https://res.cloudinary.com/hoyahoya/image/upload/v1751003027/leehyun/laser3-min_epw1nt.png" />
                  </div>
                </div>
                <div className={styles.windowText}>
                  <p>4K Laser DLP Cube</p>
                  <span>
                    4K 레이저 시리즈는 친환경 레이저 다이오드를 탑재하여 놀라운
                    시각 효과를 구현하며, 에너지 효율성이 뛰어나고 수명이 길어
                    사실상 유지보수가 거의 필요 없습니다. 이 4K 레이저 시리즈는
                    기존의 어떤 리어 프로젝션 비디오 월보다도 높은 밝기 수준과
                    더 우수한 루멘 효율을 자랑합니다. 디스플레이는 4K-UHD (3840
                    x 2160) 해상도로 제공되며, 비디오 월 큐브 사이즈는 60″, 70″,
                    80″로 구성되어 있어 고해상도와 에너지 절약이 중요한 24시간
                    연속 운영 제어실에 이상적인 솔루션입니다. 4K 레이저 비디오
                    월은 DLP® 비디오 월 업계에서 가장 높은 수준인 최대 2,400
                    루멘의 밝기를 자랑합니다.
                    <br />
                    <br />
                    또한, 4K 레이저 비디오 월은 ‘인텔리센스(intelli-sense)’라는
                    독자적인 지능형 자동 보정 시스템을 내장하고 있어 외부 개입
                    없이도 시스템 성능을 향상시키고 수명을 연장시킵니다. 견고한
                    디자인의 큐브와 산업용 등급의 부품은 24시간 연속 가동과
                    장기적인 사용 환경에서도 안정적으로 작동할 수 있도록
                    설계되었습니다.
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {window2Open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={styles.window}
            onClick={() => setWindow2Open(false)}
          >
            <div
              className={styles.windowMain}
              onClick={(e) => e.stopPropagation()}
            >
              <span
                className={styles.close}
                onClick={() => setWindow2Open(false)}
              >
                <AiOutlineClose size={24} color="black" />
              </span>
              <div className={styles.windowContent}>
                <div className={styles.windowImage}>
                  <div className={styles.imageContainer}>
                    <img src="https://res.cloudinary.com/hoyahoya/image/upload/v1751003028/leehyun/laser2-min_ekxbat.png" />
                  </div>
                </div>
                <div className={styles.windowText}>
                  <p>RGB Laser DLP Cube</p>
                  <span>
                    RGB 레이저 시리즈는 친환경적인 순수 RGB(적색, 녹색, 청색이
                    각각 분리된) 레이저 다이오드를 탑재하여 뛰어난 시각적 효과를
                    제공하며, 에너지 효율이 높고 수명이 길어 사실상 유지보수가
                    거의 필요 없습니다. RGB 레이저 시리즈는 기존의 어떤 리어
                    프로젝션 비디오 월보다도 높은 밝기 수준과 우수한 루멘 효율을
                    자랑하여, 에너지 효율성이 뛰어난 비디오 월 솔루션입니다.
                    디스플레이는 풀 HD (1920 x 1080) 해상도로 제공되며, 비디오
                    월 큐브 사이즈는 50″, 60″, 70″, 80″로 구성되어 있어
                    고해상도와 에너지 절약이 중요한 24시간 연속 운영 제어실에
                    최적의 솔루션입니다. RGB 레이저 비디오 월은 DLP® 비디오 월
                    업계에서 가장 높은 수준 중 하나인 최대 2,000루멘의 밝기를
                    자랑합니다.
                    <br />
                    <br />
                    RGB 레이저 비디오 월에는 Delta만의 독자적인 기술인
                    ‘인텔리센스(intelli-sense)’가 적용되어 있으며, 이는 외부
                    개입 없이도 시스템 성능을 향상시키고 수명을 연장시키는
                    지능형 자동 보정 시스템입니다. 견고한 디자인의 큐브와 산업용
                    등급의 부품은 24시간 연속 가동 및 장기적인 사용 환경에서도
                    높은 신뢰성을 제공합니다.
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {window3Open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={styles.window}
            onClick={() => setWindow3Open(false)}
          >
            <div
              className={styles.windowMain}
              onClick={(e) => e.stopPropagation()}
            >
              <span
                className={styles.close}
                onClick={() => setWindow3Open(false)}
              >
                <AiOutlineClose size={24} color="black" />
              </span>
              <div className={styles.windowContent}>
                <div className={styles.windowImage}>
                  <div className={styles.imageContainer}>
                    <img src="https://res.cloudinary.com/hoyahoya/image/upload/v1751003027/leehyun/laser1-min_rq7xvh.png" />
                  </div>
                </div>
                <div className={styles.windowText}>
                  <p>Laser DLP Cube</p>
                  <span>
                    레이저 시리즈는 친환경 레이저 다이오드를 탑재하여 놀라운
                    시각 효과를 제공하며, 에너지 효율성이 뛰어나고 수명이 길어
                    사실상 유지보수가 필요 없는 제품입니다. 이 레이저 시리즈는
                    기존 어떤 리어 프로젝션 비디오 월보다도 높은 밝기 수준과 더
                    우수한 루멘 효율을 자랑하여, 에너지 절약형 비디오 월
                    솔루션으로 적합합니다. 디스플레이는 풀 HD(1920 x 1080)와
                    UXGA(1600 x 1200) 해상도로 제공되며, 비디오 월 큐브 사이즈는
                    50″, 60″, 67″, 70″, 80″로 구성되어 있어 고해상도와 에너지
                    절약이 중요한 24시간 연속 운영 제어실에 이상적인
                    솔루션입니다. 레이저 비디오 월은 DLP® 비디오 월 업계에서
                    가장 높은 수준 중 하나인 2,400루멘 이상의 밝기를 자랑합니다.
                    <br />
                    <br />
                    레이저 비디오 월에 업계 최초로
                    ‘인텔리센스(intelli-sense)’라는 독창적이고 지능적인 자동
                    보정 시스템을 내장하여, 외부 개입 없이도 시스템 성능 향상과
                    긴 수명을 보장합니다. 견고한 디자인의 큐브와 산업용 등급의
                    부품은 24시간 연속 가동과 장기간의 사용 환경에서도
                    안정적으로 작동할 수 있도록 설계되었습니다.
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
