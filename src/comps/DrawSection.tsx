import React, { FC, useEffect, useRef, useState } from "react";
import { BodyParts } from "../types";
import { Button } from "./Button";
import styles from "./drawsection.module.css";

enum PenState {
  PEN = "PEN",
  ERASER = "ERASER",
}

enum PenSize {
  SMALL = "1",
  MEDIUM = "2",
  BIG = "3",
}

enum PenColour {
  RED = "red",
  BLACK = "black",
  WHITE = "white",
  BLUE = "blue",
}

function drawLine(
  context: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  penSize: PenSize,
  penColor: PenColour
) {
  context.beginPath();
  context.strokeStyle = penColor;
  context.lineWidth = Number(penSize);
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

export const DrawSection: FC<{
  next: (img: string) => void;
  currentRound: number;
  bodyPart: BodyParts;
}> = ({ next, currentRound, bodyPart }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const XY = useRef<[number, number]>([-1, -1]);
  const [penState, setPenState] = useState<keyof typeof PenState>(PenState.PEN);
  const [penSize, setPenSize] = useState<PenSize>(PenSize.MEDIUM);
  const [penColour, setPenColour] = useState<PenColour>(PenColour.BLUE);
  const [saveImage, setSaved] = useState<string>();
  const [canvasSize, setCanvasSize] = useState<number>();

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      setCanvasSize(1);
      setTimeout(() => {
        sizeCanvas();
      }, 100);
    });

    sizeCanvas();
  }, []);

  const sizeCanvas = () => {
    const node = parentRef.current?.getBoundingClientRect();
    if (!node) return;
    const { width, height } = node;
    if (height > width) {
      setCanvasSize(width);
    } else {
      setCanvasSize(height);
    }
  };

  useEffect(() => {
    var ctx = ref.current?.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "black";

    if (bodyPart === BodyParts.HEAD && canvasSize) {
      ctx.beginPath();
      ctx.moveTo(canvasSize / 2 - 50, canvasSize);
      ctx.lineTo(canvasSize / 2 - 50, canvasSize - 10);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(canvasSize / 2 + 50, canvasSize);
      ctx.lineTo(canvasSize / 2 + 50, canvasSize - 10);
      ctx.stroke();
    } else if (bodyPart === BodyParts.CHEST && canvasSize) {
      // neck joint
      ctx.beginPath();
      ctx.moveTo(canvasSize / 2 - 50, 0);
      ctx.lineTo(canvasSize / 2 - 50, 0 + 10);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(canvasSize / 2 + 50, 0);
      ctx.lineTo(canvasSize / 2 + 50, 0 + 10);
      ctx.stroke();

      // legs
      ctx.beginPath();
      ctx.moveTo(canvasSize / 2 - 100, canvasSize);
      ctx.lineTo(canvasSize / 2 - 100, canvasSize - 10);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(canvasSize / 2 + 100, canvasSize);
      ctx.lineTo(canvasSize / 2 + 100, canvasSize - 10);
      ctx.stroke();
    } else if (bodyPart === BodyParts.LEGS && canvasSize) {
      ctx.beginPath();
      ctx.moveTo(canvasSize / 2 - 100, 0);
      ctx.lineTo(canvasSize / 2 - 100, 0 + 10);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(canvasSize / 2 + 100, 0);
      ctx.lineTo(canvasSize / 2 + 100, 0 + 10);
      ctx.stroke();
    }
  }, [canvasSize, currentRound]);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("touchstart", (e) => {
        e.preventDefault();
        //   const bcr = ref.current?.getBoundingClientRect() || { x: 0, y: 0 };
        //   XY.current[0] = e.targetTouches[0].clientX - bcr.x;
        //   XY.current[1] = e.targetTouches[0].clientY - bcr.y;
        //   isDrawing.current = true;
      });

      ref.current.addEventListener("touchmove", touchMove);

      ref.current.addEventListener("touchend", (e) => {
        e.preventDefault();
        XY.current[0] = -1;
        XY.current[1] = -1;
      });

      // ref.current.addEventListener("mousedown", (e) => {
      //   console.log(XY);
      //   XY.current[0] = e.offsetX;
      //   XY.current[1] = e.offsetY;
      //   isDrawing.current = true;
      // });
      // ref.current.addEventListener("mousemove", (e) => {
      //   if (isDrawing.current === true) {
      //     ctx &&
      //       drawLine(ctx, XY.current[0], XY.current[1], e.offsetX, e.offsetY);
      //     XY.current[0] = e.offsetX;
      //     XY.current[1] = e.offsetY;
      //   }
      // });
      // window.addEventListener("mouseup", (e) => {
      //   if (isDrawing.current === true) {
      //     ctx &&
      //       drawLine(ctx, XY.current[0], XY.current[1], e.offsetX, e.offsetY);
      //     XY.current[0] = e.offsetX;
      //     XY.current[1] = e.offsetY;
      //     isDrawing.current = false;
      //   }
      // });
    }
    return () => {
      ref.current?.removeEventListener("touchmove", touchMove);
    };
  }, [penState, penSize, penColour]);

  const touchMove = (e: TouchEvent) => {
    e.preventDefault();
    const ctx = ref.current?.getContext("2d");
    const bcr = ref.current?.getBoundingClientRect() || { x: 0, y: 0 };
    const x = e.targetTouches[0].clientX - bcr.x;
    const y = e.targetTouches[0].clientY - bcr.y;

    if (penState === PenState.ERASER) {
      ctx && ctx.clearRect(x, y, 10, 10);
    } else if (penState === PenState.PEN) {
      if (XY.current[0] !== -1 && XY.current[1] !== -1) {
        ctx &&
          drawLine(ctx, XY.current[0], XY.current[1], x, y, penSize, penColour);
      }
      XY.current[0] = x;
      XY.current[1] = y;
    }
  };

  const handleClear = () => {
    var ctx = ref.current?.getContext("2d");
    if (ctx && ref.current)
      ctx.clearRect(0, 0, ref.current.width, ref.current.height);
  };

  const setPen = () => {
    setPenState(PenState.PEN);
  };

  const setEraser = () => {
    setPenState(PenState.ERASER);
  };

  const handleSave = () => {
    const image = ref.current?.toDataURL("image/png");
    setSaved(image);
    handleClear();
    next && image && next(image);
  };

  return (
    <div className={styles.root}>
      {/* <CountDown reset={currentRound} onEnd={handleSave} /> */}
      {/* <div className="button-row">
        <button onClick={handleClear}>Clear</button>
        <button onClick={setPen}>Pen</button>
        <button onClick={setEraser}>Eraser</button>
      </div> */}

      <div
        className={styles.buttons}
        style={{
          width: `${canvasSize}px`,
        }}
      >
        {Object.keys(PenColour).map((colour) => (
          <button
            className={styles.button}
            onClick={() =>
              setPenColour(PenColour[colour as keyof typeof PenColour])
            }
          >
            <div className={styles[colour]} />
          </button>
        ))}
        <div className={styles.spacer} />
        {Object.keys(PenSize).map((size) => (
          <button
            className={styles.button}
            onClick={() => setPenSize(PenSize[size as keyof typeof PenSize])}
          >
            <div className={styles[size]} />
          </button>
        ))}
      </div>
      <div ref={parentRef} className={styles.canvasWrapper}>
        {canvasSize && canvasSize > 0 && (
          <canvas
            ref={ref}
            height={canvasSize}
            width={canvasSize}
            className={styles.canvas}
          ></canvas>
        )}
      </div>
      <Button onClick={handleSave}>Complete</Button>
      {/* {saveImage && <img src={saveImage} />} */}
    </div>
  );
};
