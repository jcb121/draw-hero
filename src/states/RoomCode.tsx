import React, { FC, useState } from "react";
import { Button } from "../comps/Button";
import { SlashTitle } from "../comps/SlashTitle";
import styles from "./roomcode.module.css";

export const RoomCode: FC<{
  next: (code: string) => void;
}> = ({ next }) => {
  const [roomCode, setRoomCode] = useState<string>("AIJG271");

  return (
    <>
      <SlashTitle size={40}>✍ Draw Hero ✍</SlashTitle>
      <div className={styles.root}>
        <label className={styles.label}>
          <span>Enter your room code</span>
          <input
            className={styles.input}
            id="roomCode"
            type="text"
            value={roomCode}
          />
        </label>
        <Button
          onClick={() => {
            next(roomCode);
          }}
        >
          Join game
        </Button>
      </div>
    </>
  );
};
