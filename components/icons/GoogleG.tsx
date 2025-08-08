import * as React from "react";
import Svg, { Circle, Rect } from "react-native-svg";

interface GoogleGProps {
  size?: number;
}

// Lightweight local Google "G" mark approximation for buttons
export function GoogleG({ size = 20 }: GoogleGProps) {
  const strokeWidth = Math.max(2, Math.round(size * 0.3));
  const r = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * r;
  const quarter = circumference / 4;
  const gap = quarter * 0.08; // small gap between segments
  const seg = quarter - gap;

  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      accessibilityLabel="Google logo"
    >
      {/* Background */}
      <Circle cx={size / 2} cy={size / 2} r={size / 2} fill="#FFFFFF" />

      {/* Blue segment (right) */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#4285F4"
        strokeWidth={strokeWidth}
        strokeDasharray={`${seg} ${circumference - seg}`}
        strokeDashoffset={0}
      />

      {/* Red segment (top) */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#EA4335"
        strokeWidth={strokeWidth}
        strokeDasharray={`${seg} ${circumference - seg}`}
        strokeDashoffset={quarter}
      />

      {/* Yellow segment (left) */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#FBBC05"
        strokeWidth={strokeWidth}
        strokeDasharray={`${seg} ${circumference - seg}`}
        strokeDashoffset={quarter * 2}
      />

      {/* Green segment (bottom) */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#34A853"
        strokeWidth={strokeWidth}
        strokeDasharray={`${seg} ${circumference - seg}`}
        strokeDashoffset={quarter * 3}
      />

      {/* G crossbar (blue) */}
      <Rect
        x={size * 0.55}
        y={size * 0.45}
        width={size * 0.18}
        height={Math.max(2, Math.round(size * 0.1))}
        fill="#4285F4"
        rx={2}
      />
    </Svg>
  );
}

export default GoogleG;
