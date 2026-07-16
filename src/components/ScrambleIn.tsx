import { useEffect, useRef, useState } from 'react';

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

interface ScrambleInProps {
  text: string;
  delay: number;
  triggered: boolean;
}

export default function ScrambleIn({ text, delay, triggered }: ScrambleInProps) {
  const [display, setDisplay] = useState(' ');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!triggered) return;

    timeoutRef.current = setTimeout(() => {
      let progress = 0;
      intervalRef.current = setInterval(() => {
        progress += 0.5;
        const revealed = Math.floor(progress);

        if (revealed >= text.length) {
          setDisplay(text);
          if (intervalRef.current) clearInterval(intervalRef.current);
          return;
        }

        let out = '';
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            out += ' ';
          } else if (i < revealed) {
            out += text[i];
          } else if (i < revealed + 3) {
            out += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setDisplay(out.length > 0 ? out : ' ');
      }, 25);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [triggered, text, delay]);

  return <span>{display}</span>;
}
