import { useRouter } from 'next/router';
import { VFC } from 'react';

import { PlaceButton } from './PlaceButton';

export const HomePage: VFC = () => {
  const router = useRouter();

  return (
    <div className="py-4">
      <h1 className="text-xl text-center">全体マップ</h1>
      <div className="overflow-scroll mt-4 w-full">
        <div className="relative mx-auto w-[1000px] h-[800px] bg-[url('../village.jpg')] bg-no-repeat bg-contain border">
          <PlaceButton
            className="top-[60%] left-1/2 bg-amber-400/60"
            label="集会場"
            onClick={() => router.push('/weekly')}
          />
          <PlaceButton
            className="top-[40%] left-1/4 bg-pink-400/60"
            label="自宅"
            onClick={() => router.push('/mypage')}
          />
          <PlaceButton
            className="top-[20%] left-1/2 bg-sky-400/60"
            label="掲示板"
            onClick={() => router.push('/information')}
          />
          <PlaceButton
            className="top-[45%] left-2/3 bg-teal-400/60"
            label="GAME村"
            onClick={() => router.push('/games')}
          />
        </div>
      </div>
    </div>
  );
};
