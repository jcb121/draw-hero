import { useEffect, useRef, useState, FC } from "react";

export const CountDown: FC<{
  onEnd?: () => void;
  duration?: number;
  reset?: any;
  className?: string;
}> = ({ onEnd, duration = 60, reset, className }) => {
  const interval = useRef<NodeJS.Timeout>();

  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    interval.current && clearInterval(interval.current);
    setTimeRemaining(duration)
    interval.current = setInterval(() => {
      setTimeRemaining((time) => {
        if (time < 1 && interval.current) {
          onEnd && onEnd();
          clearInterval(interval.current);
        }
        return time - 1;
      });
    }, 1000);

    return () => {
      interval.current && clearInterval(interval.current);
    };
  }, [reset]);

  return <div className={className}>{timeRemaining}</div>;
};
