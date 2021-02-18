import React, { FC } from "react";
import { SlashTitle } from "../comps/SlashTitle";
import { CountDown } from "../CountDown";
import styles from './passdevice.module.css'

export const PassDevice: FC<{
  next: () => void
}> = ({next}) => {
  return (
    <div className={styles.root}>
      <SlashTitle>Pass the device!</SlashTitle>
      <CountDown className={styles.countdown} duration={5} onEnd={next}></CountDown>
    </div>
  );
};
