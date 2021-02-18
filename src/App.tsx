import React, { useState } from "react";
import "./App.css";
import { Compare } from "./states/Compare";
import { Drawing } from "./states/Drawing";
import { Intro } from "./states/Intro";
import { PassDevice } from "./states/PassDevice";
import { Prompt } from "./states/Prompt";
import { RoomCode } from "./states/RoomCode";
import { WaitingDrawing } from "./states/WaitingDrawings";
import { Waiting } from "./states/WaitingPlayers";
import { GameState, Hero, RoundComplete, ROUND_A, ROUND_B } from "./types";

function App() {
  // const [drawings, setDrawings] = useState<Hero[]>();
  const [prompts, setPrompt] = useState<{ promptA: string; promptB: string }>({
    promptA: "",
    promptB: "",
  });

  const [roundA, setRoundA] = useState<RoundComplete[]>([]);
  const [roundB, setRoundB] = useState<RoundComplete[]>([]);

  const [gameState, setGameState] = useState<GameState>(GameState.ROOM_CODE);

  const next = () => {
    const index = Object.keys(GameState).indexOf(gameState);
    const next = Object.keys(GameState)[index + 1];
    setGameState(next as GameState);
  };

  const handleJoinGame = (RoomCode: string) => {
    next();
  };

  if (gameState === GameState.ROOM_CODE) {
    return <RoomCode next={handleJoinGame} />;
  }

  if (gameState === GameState.WAITING_PLAYERS) {
    return <Waiting next={next} />;
  }

  if (gameState === GameState.INTRO) {
    return <Intro next={next} />;
  }

  if (gameState === GameState.PROMPT_A) {
    return (
      <Prompt
        next={(prompt) => {
          setPrompt((p) => ({
            ...p,
            promptA: prompt,
          }));
          next();
        }}
      />
    );
  }
  if (gameState === GameState.PROMPT_B) {
    return (
      <Prompt
        next={(prompt) => {
          setPrompt((p) => ({
            ...p,
            promptB: prompt,
          }));
          next();
        }}
      />
    );
  }

  if (gameState === GameState.DRAWING_A) {
    return (
      <Drawing
        rounds={ROUND_A(prompts.promptA)}
        next={(drawings) => {
          setRoundA(drawings);
          next();
        }}
      />
    );
  }

  if (gameState === GameState.DRAWING_B) {
    return (
      <Drawing
        rounds={ROUND_B(prompts.promptB)}
        next={(drawings) => {
          setRoundB(drawings);
          next();
        }}
      />
    );
  }

  if (gameState === GameState.PASS_DEVICE_A) {
    return <PassDevice next={next} />;
  }
  if (gameState === GameState.PASS_DEVICE_B) {
    return <PassDevice next={next} />;
  }

  if (gameState === GameState.WAITING_DRAWING) {
    return <WaitingDrawing next={next} />;
  }

  if (gameState === GameState.COMPARE) {
    // needs to be worked out somewhere and smarter
    const drawings: Hero[] = [
      {
        prompt: prompts.promptA,
        bodyParts: {
          head: roundA[0].data,
          chest: roundA[2].data,
          legs: roundB[1].data,
        },
      },
      {
        prompt: prompts.promptB,
        bodyParts: {
          head: roundB[2].data,
          chest: roundB[0].data,
          legs: roundA[1].data,
        },
      },
    ];

    return <Compare drawings={drawings} next={next} />;
  }

  return null;
}

export default App;
