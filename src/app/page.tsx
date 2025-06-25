"use client";

import { useEffect, useRef, useState } from "react";
import About from "./_components/About/About";
import Main from "./_components/Main/Main";
import styles from "./page.module.css";
import { AnimatePresence, motion } from "motion/react";
import Service from "./_components/Service/Service";
import Service2 from "./_components/Service2/Service2";
import CaseStudies from "./_components/CaseStudies/CaseStudies";
import Contact from "./_components/Contact/Contact";

export default function Home() {
  const [navOn, setNavOn] = useState(false);
  const [width, setWidth] = useState<number | undefined>();
  const [navIsBlack, setNavIsBlack] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const serviceRef = useRef<HTMLDivElement | null>(null);
  const caseStudiesRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className={styles.home}>
      {width && width > 768 ? (
        <div className={styles.nav}>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            style={{ color: navIsBlack ? "black" : "#f5f5f7" }}
            className={styles.navLeft}
          >
            <span
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Home
            </span>
            <span
              onClick={() => {
                aboutRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              About
            </span>
            <span
              onClick={() => {
                serviceRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Service
            </span>
            <span
              onClick={() => {
                caseStudiesRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Case Studies
            </span>
          </motion.div>
          <motion.button
            onClick={() => {
              contactRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            style={{
              backgroundColor: navIsBlack ? "#364fdc" : "#f5f5f7",
              color: navIsBlack ? "#f5f5f7" : "black",
            }}
          >
            Contact
          </motion.button>
        </div>
      ) : navOn ? null : (
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className={styles.mobileNav}
        >
          <motion.button
            onClick={() => {
              setNavOn(true);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            style={{
              backgroundColor: navIsBlack ? "#364fdc" : "#f5f5f7",
              color: navIsBlack ? "#f5f5f7" : "black",
            }}
          >
            Menu
          </motion.button>
        </motion.div>
      )}
      <Main
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />
      <About
        aboutRef={aboutRef}
        setNavIsBlack={setNavIsBlack}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />
      <Service
        serviceRef={serviceRef}
        setNavIsBlack={setNavIsBlack}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />
      <Service2
        setNavIsBlack={setNavIsBlack}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />
      <CaseStudies
        caseStudiesRef={caseStudiesRef}
        setNavIsBlack={setNavIsBlack}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />
      <Contact
        contactRef={contactRef}
        setNavIsBlack={setNavIsBlack}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />
      <AnimatePresence>
        {navOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className={styles.navMenu}
          >
            <motion.button
              onClick={() => {
                setNavOn(false);
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              Close
            </motion.button>
            <div className={styles.navMenuList}>
              <span
                onClick={() => {
                  setNavOn(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Home
              </span>
              <span
                onClick={() => {
                  setNavOn(false);
                  aboutRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                About
              </span>
              <span
                onClick={() => {
                  setNavOn(false);
                  serviceRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Service
              </span>
              <span
                onClick={() => {
                  setNavOn(false);
                  caseStudiesRef.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Case Studies
              </span>
              <span
                onClick={() => {
                  setNavOn(false);
                  contactRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
