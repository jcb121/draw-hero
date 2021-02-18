import React, { FC, useEffect, useState } from "react";
import { DrawSection } from "../comps/DrawSection";
import { Round, RoundComplete } from "../types";
import styles from "./drawing.module.css";

export const Drawing: FC<{
  next: (drawings: RoundComplete[]) => void;
  rounds: Round[];
}> = ({ next, rounds }) => {
  const [roundData, setRoundData] = useState<RoundComplete[]>([]);
  const currentRound = roundData.length;
  const prompt = rounds[currentRound]?.prompt;
  const bodyPart = rounds[currentRound]?.bodyPart;

  const handleNextRound = (img: string) => {
    const round: RoundComplete = { ...rounds[currentRound], data: img };
    setRoundData((r) => {
      return [...r, round];
    });
  };

  useEffect(() => {
    if (roundData.length > rounds.length - 1) {
      next(roundData);
    }
  }, [roundData]);

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>
        Draw the <span className={styles.alt}>{bodyPart}</span> of{" "}
        <span className={styles.alt}>{prompt}</span>
      </h1>
      <DrawSection bodyPart={bodyPart} currentRound={currentRound} next={handleNextRound} />
    </div>
  );
};
