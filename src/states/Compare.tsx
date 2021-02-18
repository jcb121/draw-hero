import React, { FC } from "react";
import { Button } from "../comps/Button";
import { BodyPart, BodyParts, Hero } from "../types";
import styles from "./compare.module.css";

export const Compare: FC<{
  next: () => void;
  drawings: Hero[];
}> = ({ drawings }) => {
  const title = `${drawings[0].prompt} ${"🆚"} ${drawings[1].prompt}`;

  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div>

      <div className={styles.drawings}>
        {drawings.map(({ prompt, bodyParts }) => (
          <div className={styles.col} key={prompt}>
            <div className={styles.drawing}>
              <div className={styles.drawingInner}>
                {Object.keys(BodyParts).map((key) => (
                  <div
                    className={
                      styles.imageWarpper + " " + BodyParts[key as BodyPart]
                    }
                  >
                    <div className={styles.imageWarpperInner}>
                      {bodyParts[BodyParts[key as BodyPart]] && (
                        <img
                          className={styles.image}
                          src={bodyParts[BodyParts[key as BodyPart]]}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button onClick={() => {}}>Vote 💯</Button>
          </div>
        ))}
      </div>
    </div>
  );
};
