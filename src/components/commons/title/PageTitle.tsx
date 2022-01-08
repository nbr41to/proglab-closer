import { VFC } from 'react';

type PageTitleProps = {
  title: string;
  paragraph?: string;
};

export const PageTitle: VFC<PageTitleProps> = ({ title, paragraph }) => {
  return (
    <div className="text-center">
      <h1 className="text-xl font-bold">{title}</h1>
      {paragraph && <p className="mt-4 text-slate-600">{paragraph}</p>}
    </div>
  );
};
