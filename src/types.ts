export enum BodyParts {
  HEAD = "head",
  CHEST = "chest",
  LEGS = "legs",
  // LEFT_ARM = "left-arm",
  // RIGHT_ARM = "right-arm",
}

export enum GameState {
  ROOM_CODE = "ROOM_CODE",
  WAITING_PLAYERS = "WAITING_PLAYERS",
  INTRO = "INTRO",
  PROMPT_A = "PROMPT_A",
  PASS_DEVICE_A = "PASS_DEVICE_A", // WAITING_DRAWING
  PROMPT_B = "PROMPT_B",
  DRAWING_B = "DRAWING_B", // WAITING_DRAWING
  PASS_DEVICE_B = "PASS_DEVICE_B", // WAITING_DRAWING
  DRAWING_A = "DRAWING_A", // WAITING_DRAWING
  WAITING_DRAWING = "WAITING_DRAWING", // WAITING_DRAWING
  COMPARE = "COMPARE",
}

export type Round = {
  prompt: string;
  bodyPart: BodyParts;
};

export type RoundComplete = Round & {
  data: string;
};

export const ROUND_A = (prompt: string): Round[] => [
  {
    prompt,
    bodyPart: BodyParts.HEAD,
  },
  {
    prompt,
    bodyPart: BodyParts.LEGS,
  },
  {
    prompt,
    bodyPart: BodyParts.CHEST,
  },
];

export const ROUND_B = (prompt: string): Round[] => [
  {
    prompt,
    bodyPart: BodyParts.CHEST,
  },
  {
    prompt,
    bodyPart: BodyParts.LEGS,
  },
  {
    prompt,
    bodyPart: BodyParts.HEAD,
  },
];

export type Hero = {
  prompt: string;
  bodyParts: Record<BodyParts, string>;
};

export type BodyPart = keyof typeof BodyParts;
