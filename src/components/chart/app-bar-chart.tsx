'use client';

import { Article } from '@/app/page';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ReactElement, memo } from 'react';
import { Bar, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { ContentType } from 'recharts/types/component/Tooltip';

const BarChart = dynamic(() => import('recharts').then((recharts) => recharts.BarChart), { ssr: false });

function AppBarChart({
  title,
  data,
  dataKeys,
}: {
  title: string;
  data: Article[];
  dataKeys: { name: string; key: keyof Article; color?: string }[];
}) {
  const width = data.length * 60;

  const CustomToolTip: ContentType<ValueType, NameType> = ({ active, payload, label }) => {
    const article = data[label - 1];
    if (active && payload && payload.length && article) {
      return (
        <div className="rounded-lg border bg-yellow-100 p-2">
          <p className="w-56 truncate">{article.title}</p>
          {dataKeys.map((item) => (
            <p key={item.key}>
              {item.name}: {article[item.key]}
            </p>
          ))}
        </div>
      );
    }
  };

  const XaxisTick: (props: any) => ReactElement = ({ x, y, payload }) => (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16}>
        <Link target="_blank" href={data[payload['index']].url}>
          {payload['index'] + 1}
        </Link>
      </text>
    </g>
  );

  return (
    <div className="h-full w-full overflow-x-auto">
      <p id="chart-title" className="mb-4 text-center font-semibold">
        {title}
      </p>
      <style jsx>
        {`
          #chart-title {
            width: ${width}px;
          }
        `}
      </style>
      <BarChart
        width={width}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="index" tick={<XaxisTick />} />
        <YAxis />
        <Tooltip content={<CustomToolTip />} />
        <Legend />
        {dataKeys.map((item) => (
          <Bar key={item.key} name={item.name} dataKey={item.key} fill={item.color} />
        ))}
      </BarChart>
    </div>
  );
}

export default memo(AppBarChart);
