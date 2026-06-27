import { useMemo, useState } from "react";
import Landing1 from "../assets/images/banner/Landing1.jpg";
import Landing2 from "../assets/images/banner/Landing2.jpg";
import Landing3 from "../assets/images/banner/Landing3.jpg";
import Landing4 from "../assets/images/banner/Landing4.jpg";
import Landing5 from "../assets/images/banner/Landing5.jpg";

const LANDING_IMAGES = [
  { name: "Landing1", src: Landing1 },
  { name: "Landing2", src: Landing2 },
  { name: "Landing3", src: Landing3 },
  { name: "Landing4", src: Landing4 },
  { name: "Landing5", src: Landing5 },
];

export default function LandingBanner({ speed, height = 110 }) {
  const [isPaused, setIsPaused] = useState(false);
  const marqueeItems = useMemo(() => [...LANDING_IMAGES, ...LANDING_IMAGES], []);
  const inlineVars = {
    "--landing-height-desktop": `${height}px`,
  };

  if (typeof speed === "number") {
    inlineVars["--landing-speed"] = `${speed}s`;
  }

  return (
    <section
      className={`landing-banner${isPaused ? " is-paused" : ""}`}
      style={inlineVars}
      aria-label="Banniere decorative defilante"
    >
      <button
        type="button"
        className="landing-banner__toggle"
        aria-pressed={isPaused}
        aria-label={
          isPaused
            ? "Reprendre le defilement de la banniere"
            : "Mettre en pause la banniere"
        }
        onClick={() => setIsPaused((prev) => !prev)}
      >
        {isPaused ? "Reprendre" : "Pause"}
      </button>

      <div className="landing-banner__viewport" aria-hidden="true">
        <div className="landing-banner__track">
          {marqueeItems.map((item, index) => (
            <img
              key={`${item.name}-${index}`}
              className="landing-banner__image"
              src={item.src}
              alt=""
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
