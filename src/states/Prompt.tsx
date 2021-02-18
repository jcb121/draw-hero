import React, { FC, useState } from "react";
import { Button } from "../comps/Button";
import { SlashTitle } from "../comps/SlashTitle";
import styles from "./prompt.module.css";

export const Prompt: FC<{
  next: (p: string) => void;
}> = ({ next }) => {
  const [prompt, setPrompt] = useState("");
  return (
    <div className={styles.root}>
      <SlashTitle>Round 1</SlashTitle>

      <label className={styles.label}>
        <span>Come up with the worst super hero name:</span>
        <input
          className={styles.input}
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </label>
      <Button
        onClick={() => {
          next(prompt);
        }}
      >
        Submit
      </Button>
    </div>
  );
};
