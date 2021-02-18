import { FC } from "react";
import styles from "./button.module.css";

export const Button: FC<{
  onClick: () => void;
}> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};
