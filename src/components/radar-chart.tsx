import type { PlayerAttributes } from "@/lib/players";

interface RadarChartProps {
  attributes: PlayerAttributes;
  size?: number;
  max?: number;
  showLabels?: boolean;
}

const axisOrder: Array<{ key: keyof PlayerAttributes; label: string }> = [
  { key: "hurtighet", label: "Hurtighet" },
  { key: "dribling", label: "Dribling" },
  { key: "skudd", label: "Skudd" },
  { key: "pasning", label: "Pasning" },
  { key: "forsvar", label: "Forsvar" },
  { key: "fysikk", label: "Fysikk" },
];

export function RadarChart({
  attributes,
  size = 320,
  max = 99,
  showLabels = true,
}: RadarChartProps) {
  const padding = showLabels ? 54 : 8;
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - padding * 2) / 2;

  const angleFor = (i: number) => (-90 + i * 60) * (Math.PI / 180);

  const pointAt = (i: number, value: number) => {
    const ratio = Math.max(0, Math.min(1, value / max));
    const a = angleFor(i);
    return [cx + Math.cos(a) * r * ratio, cy + Math.sin(a) * r * ratio];
  };

  const labelAt = (i: number) => {
    const a = angleFor(i);
    const lr = r + 26;
    return [cx + Math.cos(a) * lr, cy + Math.sin(a) * lr];
  };

  const valueLabelAt = (i: number, value: number) => {
    const a = angleFor(i);
    const lr = r + 10;
    const ratio = Math.max(0, Math.min(1, value / max));
    return [cx + Math.cos(a) * lr * ratio + Math.cos(a) * 6, cy + Math.sin(a) * lr * ratio + Math.sin(a) * 6];
  };

  const rings = [0.25, 0.5, 0.75, 1];

  const polygonPoints = (ratio: number) =>
    axisOrder
      .map((_, i) => {
        const a = angleFor(i);
        return `${cx + Math.cos(a) * r * ratio},${cy + Math.sin(a) * r * ratio}`;
      })
      .join(" ");

  const dataPoints = axisOrder
    .map(({ key }, i) => pointAt(i, attributes[key]))
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className="select-none"
      aria-label="Spillerattributter"
    >
      {rings.map((ratio) => (
        <polygon
          key={ratio}
          points={polygonPoints(ratio)}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.08}
          strokeWidth={1}
        />
      ))}

      {axisOrder.map((_, i) => {
        const a = angleFor(i);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + Math.cos(a) * r}
            y2={cy + Math.sin(a) * r}
            stroke="currentColor"
            strokeOpacity={0.08}
            strokeWidth={1}
          />
        );
      })}

      <polygon
        points={dataPoints}
        fill="#c5382a"
        fillOpacity={0.22}
        stroke="#c5382a"
        strokeWidth={1.75}
        strokeLinejoin="round"
      />

      {axisOrder.map(({ key }, i) => {
        const [x, y] = pointAt(i, attributes[key]);
        return (
          <circle
            key={key}
            cx={x}
            cy={y}
            r={3}
            fill="#c5382a"
            stroke="var(--background)"
            strokeWidth={1.5}
          />
        );
      })}

      {showLabels &&
        axisOrder.map(({ key, label }, i) => {
          const [lx, ly] = labelAt(i);
          const [vx, vy] = valueLabelAt(i, attributes[key]);
          return (
            <g key={key}>
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-muted-foreground"
                fontSize={11}
                fontWeight={500}
              >
                {label}
              </text>
              <text
                x={vx}
                y={vy}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#c5382a"
                fontSize={10}
                fontWeight={700}
                fontFamily="ui-monospace, SFMono-Regular, monospace"
              >
                {attributes[key]}
              </text>
            </g>
          );
        })}
    </svg>
  );
}
