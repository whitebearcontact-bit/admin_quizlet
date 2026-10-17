import type { ChartPoint } from '@/types';

interface BarChartProps {
  data: ChartPoint[];
  color?: string;
  height?: number;
  formatValue?: (v: number) => string;
}

export function BarChart({ data, color = '#2563eb', height = 180, formatValue }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;

  return (
    <div className="flex items-end justify-between gap-2" style={{ height }}>
      {data.map((d, i) => {
        const pct = ((d.value - min) / range) * 0.75 + 0.25;
        return (
          <div key={i} className="group flex flex-1 flex-col items-center gap-2">
            <div className="relative flex w-full flex-1 items-end justify-center">
              <div
                className="w-full max-w-[36px] rounded-t-md transition-all duration-300 hover:opacity-80"
                style={{
                  height: `${pct * 100}%`,
                  backgroundColor: color,
                  minHeight: 4,
                }}
              />
              <div className="pointer-events-none absolute -top-8 z-10 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                {formatValue ? formatValue(d.value) : d.value.toLocaleString()}
              </div>
            </div>
            <span className="text-xs font-medium text-slate-500">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

interface LineChartProps {
  data: ChartPoint[];
  color?: string;
  height?: number;
  formatValue?: (v: number) => string;
}

export function LineChart({ data, color = '#2563eb', height = 180, formatValue }: LineChartProps) {
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;
  const width = 100;
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((d.value - min) / range) * (height - 20) - 10;
      return `${x},${y}`;
    })
    .join(' ');
  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <div className="relative w-full" style={{ height }}>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill={`url(#grad-${color.replace('#', '')})`} />
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * width;
          const y = height - ((d.value - min) / range) * (height - 20) - 10;
          return (
            <g key={i} className="group">
              <circle cx={x} cy={y} r="1.5" fill={color} className="r-1.5" />
              <circle cx={x} cy={y} r="6" fill="transparent" className="cursor-pointer">
                <title>{formatValue ? formatValue(d.value) : d.value.toLocaleString()}</title>
              </circle>
            </g>
          );
        })}
      </svg>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between">
        {data.map((d, i) => (
          <span key={i} className="text-xs font-medium text-slate-500">{d.label}</span>
        ))}
      </div>
    </div>
  );
}

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
}

export function DonutChart({ data, size = 160 }: DonutChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const radius = size / 2 - 8;
  const innerRadius = radius * 0.62;
  const center = size / 2;
  let angle = -90;

  const segments = data.map((d) => {
    const sweep = (d.value / total) * 360;
    const startAngle = angle;
    const endAngle = angle + sweep;
    angle = endAngle;

    const startOuter = polarToCartesian(center, center, radius, startAngle);
    const endOuter = polarToCartesian(center, center, radius, endAngle);
    const startInner = polarToCartesian(center, center, innerRadius, endAngle);
    const endInner = polarToCartesian(center, center, innerRadius, startAngle);

    const largeArc = sweep > 180 ? 1 : 0;

    const path = [
      `M ${startOuter.x} ${startOuter.y}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}`,
      `L ${startInner.x} ${startInner.y}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${endInner.x} ${endInner.y}`,
      'Z',
    ].join(' ');

    return { path, color: d.color, label: d.label, value: d.value };
  });

  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((s, i) => (
          <path key={i} d={s.path} fill={s.color} className="transition-opacity hover:opacity-80" />
        ))}
        <text x={center} y={center - 4} textAnchor="middle" className="fill-slate-900 text-lg font-bold">
          {total}%
        </text>
        <text x={center} y={center + 14} textAnchor="middle" className="fill-slate-400 text-[10px] font-medium">
          Total
        </text>
      </svg>
      <div className="space-y-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-xs font-medium text-slate-600">{d.label}</span>
            <span className="text-xs font-bold text-slate-900">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
