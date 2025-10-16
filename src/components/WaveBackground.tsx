export const WaveBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M0,300 C300,250 600,350 900,300 C1200,250 1440,300 1440,300 L1440,0 L0,0 Z"
          fill="hsl(var(--wave-light))"
          opacity="0.3"
        />
        <path
          d="M0,400 C400,350 800,450 1200,400 C1400,375 1440,400 1440,400 L1440,0 L0,0 Z"
          fill="hsl(var(--wave-medium))"
          opacity="0.2"
        />
        <ellipse
          cx="-100"
          cy="200"
          rx="400"
          ry="400"
          fill="hsl(var(--wave-light))"
          opacity="0.4"
        />
        <ellipse
          cx="1540"
          cy="600"
          rx="500"
          ry="500"
          fill="hsl(var(--wave-medium))"
          opacity="0.3"
        />
      </svg>
    </div>
  );
};
