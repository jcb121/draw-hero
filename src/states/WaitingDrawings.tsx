import { FC } from "react";
import { CountDown } from "../CountDown";

import styles from './waitingdrawing.module.css'

export const WaitingDrawing: FC<{
  next: () => void;
}> = ({ next }) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>Waiting for others to finish their drawings</div>
      <CountDown className={styles.countdown} onEnd={() => {
        next();
      }} duration={10} />
    </div>
  );
};
