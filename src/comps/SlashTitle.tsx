import React, { FC } from "react"
import styles from './slashtitle.module.css';

export const SlashTitle: FC<{
  size?: number
}> = ({ children, size }) => {
  return (
    <div className={styles.title} style={{
      fontSize: size
    }}>
      {children}
    </div>
  )
}