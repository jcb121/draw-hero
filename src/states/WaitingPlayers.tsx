import { FC } from "react";
import { Button } from "../comps/Button";
import { SlashTitle } from "../comps/SlashTitle";
import styles from './waitingplayers.module.css'

export const Waiting: FC<{
  next: () => void;
}> = ({ next }) => {
  return (
    <div className={styles.root}>
      <SlashTitle>Waiting for other players to join...</SlashTitle>
      <Button onClick={next}>Everyone is in, start game</Button>
    </div>
  );
};
