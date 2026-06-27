import { useEffect, useState } from "react";

export default function Typewriter({ text, speed = 20, className = "" }) {
  const [displayedText, setDisplayedText] = useState("");
  const hasPlayed = typeof window !== "undefined" && sessionStorage.getItem("typewriterPlayed:" + text);

  useEffect(() => {
    if (hasPlayed) {
      return;
    }

    const key = "typewriterPlayed:" + text;
    let index = 0;

    const interval = setInterval(() => {
      index += 1;
      setDisplayedText(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
        sessionStorage.setItem(key, "true");
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, hasPlayed]);

  return <p className={className} style={{ whiteSpace: "pre-line" }}>{hasPlayed ? text : displayedText}</p>;
}