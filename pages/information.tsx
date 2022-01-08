import { NextPage } from 'next';
import React from 'react';

const Information: NextPage = () => {
  return (
    <div>
      <h1>Information</h1>
      <a
        href="https://nobco.notion.site/progLab-Closers-aae9fc9944954d27880d322e167d5215"
        target="_blank"
        rel="noopener noreferrer"
      >
        会員用情報掲載ページ
      </a>
      <h2>WIKI</h2>
      <p>Notionから取得したコミュニティのWIKIを表示する</p>
      <h2>NEWS</h2>
      <p>Notionから取得したお知らせ情報を表示する</p>
    </div>
  );
};

export default Information;
