import { FC } from "react";
import { SlashTitle } from "../comps/SlashTitle";
import { CountDown } from "../CountDown";
import styles from './intro.module.css';

export const Intro: FC<{
  next: () => void;
}> = ({ next }) => {
  return (
    <div className={styles.root}>
      <SlashTitle>How to play!</SlashTitle>

      <div className={styles.video}>
        <img src="https://via.placeholder.com/300x250'"/>
      </div>
      {/* Video intro to game, TODO */}
      <CountDown onEnd={next} duration={5} className={styles.countdown}/>
    </div>
  );
};
