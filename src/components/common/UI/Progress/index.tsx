interface ProgressProps {
  size: number;
  percentage: number;
}

export default function Progress({ size, percentage }: ProgressProps) {
  const sizeInRem = size / 16;
  const strokeWidth = sizeInRem * 0.1;
  const radius = (sizeInRem - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const fontSize = sizeInRem * 0.25;

  return (
    <div
      className="relative flex justify-center items-center"
      style={{ width: `${sizeInRem}rem`, height: `${sizeInRem}rem` }}
    >
      <svg className="absolute w-full h-full -rotate-90">
        <circle
          className="text-tertiary"
          cx={`${sizeInRem / 2}rem`}
          cy={`${sizeInRem / 2}rem`}
          r={`${radius}rem`}
          strokeWidth={`${strokeWidth}rem`}
          fill="none"
          stroke="currentColor"
        />
        <circle
          className="text-primary transition-all"
          cx={`${sizeInRem / 2}rem`}
          cy={`${sizeInRem / 2}rem`}
          r={`${radius}rem`}
          strokeWidth={`${strokeWidth}rem`}
          strokeDasharray={`${strokeDasharray}rem`}
          strokeDashoffset={`${strokeDashoffset}rem`}
          fill="none"
          stroke="currentColor"
        />
      </svg>
      <svg className="absolute w-full h-full">
        <text
          className="text-primary"
          x="50%"
          y="50%"
          fontSize={`${fontSize}rem`}
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="central"
          fill="currentColor"
          stroke="none"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
}
