"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
} from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./homepage.module.css";

interface ComponentProps {
  someText: string;
  someBoolean: boolean;
}

export default function Homepage() {
  const [property, setProperty] = useState<JSX.Element>(<div>Welcome!</div>);
  const propRef = useRef<string>("initialValue");
  function setPropRef(point: string): void {
    propRef.current = point;
  }

  //componentDidMount, runs when component mounts, then componentDismount
  useEffect(() => {
    return () => {};
  }, []);
  //componentDidUpdate, runs after render
  useEffect(() => {}, [property]);

  return (
    <main className={styles.homepage}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.bodyText}>
            <div>
              {`This place has the best service of any place anywhere.`}{" "}
            </div>
            <div>{`This is why you should go to this place.`}</div>
            <div>{`That makes the most sense.`}</div>
          </div>
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <h1>Did you know?</h1>
            <div
              className={styles.bodyText}
            >{`He heard the song coming from a distance, lightly floating over the air to his ears. Although it was soft and calming, he was wary. It seemed a little too soft and a little too calming for everything that was going on. He wanted it to be nothing more than beautiful music coming from the innocent and pure joy of singing, but in the back of his mind, he knew it was likely some type of trap.`}</div>
          </div>

          <div className={styles.info}>
            <h1>What We Offer</h1>
            <div
              className={styles.bodyText}
            >{`The alarm went off and Jake rose awake. Rising early had become a daily ritual, one that he could not fully explain. From the outside, it was a wonder that he was able to get up so early each morning for someone who had absolutely no plans to be productive during the entire day`}</div>
          </div>

          <div className={styles.info}>
            <h1>Different Options</h1>
            <div
              className={styles.bodyText}
            >{`Why do Americans have so many different types of towels? We have beach towels, hand towels, bath towels, dish towels, camping towels, quick-dry towels, and let’s not forget paper towels. Would 1 type of towel work for each of these things? Let’s take a beach towel. It can be used to dry your hands and body with no difficulty. A beach towel could be used to dry dishes. Just think how many dishes you could dry with one beach towel. I’ve used a beach towel with no adverse effects while camping. If you buy a thin beach towel it can dry quickly too. I’d probably cut up a beach towel to wipe down counters or for cleaning other items, but a full beach towel could be used too. Is having so many types of towels an extravagant luxury that Americans enjoy or is it necessary? I’d say it's overkill and we could cut down on the many types of towels that manufacturers deem necessary.`}</div>
          </div>

          <div className={styles.info}>
            <h1>Even More...</h1>
            <div
              className={styles.bodyText}
            >{`There was a time when this wouldn't have bothered her. The fact that it did actually bother her bothered her even more. What had changed in her life that such a small thing could annoy her so much for the entire day? She knew it was ridiculous that she even took notice of it, yet she was still obsessing over it as she tried to fall asleep.`}</div>
          </div>
        </div>

        <div className={styles.contactContainer}>
          <h1>Contact Us</h1>
          <ul className={styles.contactOptions}>
            <li>314-159-2653</li>
            <li>somemail@website.com</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
