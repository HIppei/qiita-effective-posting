'use client';

import AppBarChart from '@/components/chart/app-bar-chart';
import AppTable from '@/components/table/app-table';
import ToggleButtons from '@/components/toggle-buttons';
import { UserInfoContext } from '@/providers/token-provider';
import { useContext, useMemo, useState } from 'react';

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

// This defines the type that charts and tabls will use.
// Raw data itself remains on memory as is.
export type Article = {
  index: number;
  title: string;
  url: string;
  createdAt: string;
  views: number;
  likes: number;
  stocks: number;
  likesRate: string;
  stocksRate: string;
};

// Type definition based on Qiita API repsponse.
// Only properties that will be used are defined.
export type QiitaArticle = {
  title: string;
  url: string;
  created_at: string;
  page_views_count: number;
  likes_count: number;
  stocks_count: number;
};

const a = '';

export default function Home() {
  const { userInfo } = useContext(UserInfoContext);
  const [data, setData] = useState<Article[] | undefined>();
  const [display, setDisplay] = useState<'chart' | 'table'>('chart');
  const dataDeps = JSON.stringify(data);

  const memoData = useMemo(() => data, [dataDeps]);

  const likesDataKeys = useMemo<{ name: string; key: keyof Article; color?: string | undefined }[]>(
    () => [
      { name: 'Likes', key: 'likes', color: '#8884d8' },
      { name: 'Stocks', key: 'stocks', color: '#82ca9d' },
    ],
    []
  );
  const viewsDataKeys = useMemo<{ name: string; key: keyof Article; color?: string | undefined }[]>(
    () => [{ name: 'Views', key: 'views', color: '#EC9F1F' }],
    []
  );

  const getData = async () => {
    const headers = { authorization: `Bearer ${userInfo.token}` };
    const res = await fetch(`https://qiita.com/api/v2/items?query=user:${userInfo.user}`, {
      method: 'GET',
      headers: headers,
    });

    if (res.status === 200) {
      const result = transformData(await res.json());
      setData(result);
    } else if (res.status === 401) {
      window.alert('Authorization failed. Please check your access token.');
    } else {
      console.error('Error Status:', res.status);
      console.error('Error Message:', await res.json());
      return;
    }
  };

  const transformData = (data: QiitaArticle[]): Article[] => {
    data.sort((a, b) => {
      const date1 = new Date(a.created_at);
      const date2 = new Date(b.created_at);

      if (date1 > date2) {
        return 1;
      } else {
        return -1;
      }
    });

    const articles = data.map<Article>((item, index) => {
      return {
        index: index + 1,
        title: item.title,
        url: item.url,
        createdAt: item.created_at,
        views: item.page_views_count,
        likes: item.likes_count,
        stocks: item.stocks_count,
        likesRate: ((item.likes_count / item.page_views_count) * 100).toFixed(2),
        stocksRate: (((item.stocks_count ?? 0) / item.page_views_count) * 100).toFixed(2),
      };
    });

    return articles;
  };

  return (
    <div className="grid h-full grid-cols-1 gap-y-12 overflow-y-auto">
      <div className="flex px-6 pt-6">
        <div className="w-2/12">
          <ToggleButtons display={display} setDisplay={setDisplay} />
        </div>
        <span className="w-9/12" />
        <button
          onClick={getData}
          className="h-fit w-1/12 rounded-lg border bg-blue-300 px-3 py-2 text-lg hover:bg-blue-500"
        >
          Get Data
        </button>
      </div>
      {memoData && (
        <>
          <div className={`${display === 'table' && 'hidden'}`}>
            <div>
              <AppBarChart title="Likes & Stocs" data={memoData} dataKeys={likesDataKeys} />
            </div>
            <div>
              <AppBarChart title="Views" data={memoData} dataKeys={viewsDataKeys} />
            </div>
          </div>
          <div className={`${display === 'chart' && 'hidden'} w-[80%] px-6 pb-10`}>
            <AppTable data={memoData} />
          </div>
        </>
      )}
    </div>
  );
}
