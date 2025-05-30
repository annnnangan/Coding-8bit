export default function TransparentLoader() {
  return (
    <div className="loader-wrapper loader-wrapper-transparent">
      <svg
        width="150px"
        height="75px"
        viewBox="0 0 187.3 93.7"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#d0a2f7", stopOpacity: "1" }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "#f1eaff", stopOpacity: "1" }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#645caa", stopOpacity: "1" }}
            />
          </linearGradient>
        </defs>
        <path
          id="outline-bg"
          d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 -8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
        />
        <path
          id="outline"
          d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 -8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
        />
      </svg>
    </div>
  );
}
