'use client';

import { UserInfoContext } from '@/providers/token-provider';
import dynamic from 'next/dynamic';
import { memo, useContext } from 'react';
import { Area, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

const AreaChart = dynamic(() => import('recharts').then((recharts) => recharts.AreaChart), { ssr: false });

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

function HomeComponent() {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const { userInfo } = useContext(UserInfoContext);

  const update = async () => {
    const headers = { authorization: `Bearer ${userInfo.token}` };
    const res = await fetch(`https://qiita.com/api/v2/items?query=user:${userInfo.user}`, {
      method: 'GET',
      headers: headers,
    });

    const result = await res.json();
    console.log(result);
  };

  return (
    <div>
      <div className="w-full text-center">
        <button
          onClick={update}
          className="ml-4 mt-3 rounded-lg border bg-blue-300 px-3 py-2 text-lg hover:bg-blue-500"
        >
          Get Data
        </button>
      </div>
      <div className="mt-10">
        <AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
      </div>
    </div>
  );
}

const Home = memo(HomeComponent);

export default Home;
