import { FormEvent, VFC, useState, ChangeEvent } from 'react';
import { Button } from './atoms/Button';
import { Send } from 'akar-icons';
import Router from 'next/router';
import { postContent } from 'src/firebase/firestore';
import { Content, ContentType } from 'src/types';
import {
  postChatHistory,
  postReportHistory,
  postNextHistory,
  userInfo,
} from '../recoil/atom';
import { useRecoilState, useRecoilValue } from 'recoil';

type AgendaFormProps = {};

export const AgendaForm: VFC<AgendaFormProps> = () => {
  const [chat, setChat] = useState('');
  const [report, setReport] = useState('');
  const [next, setNext] = useState('');

  const user = useRecoilValue(userInfo);

  const [chatHistory, setChatHistory] = useRecoilState(postChatHistory);
  const [reportHistory, setReportHistory] = useRecoilState(postReportHistory);
  const [nextHistory, setNextHistory] = useRecoilState(postNextHistory);

  const onSubmit = (e: FormEvent<HTMLFormElement>, to: ContentType) => {
    e.preventDefault();
    const roomId = Router.query.id as string;
    const colorNum = Math.floor(Math.random() * 12);
    const content: Content = { text: '', name: user.name, colorNum };
    if (to === 'chat') {
      if (!chat) return alert('入力してください');
      content.text = chat;
      setChatHistory((prev) => [...prev, chat]);
      setChat('');
    }
    if (to === 'report') {
      if (!report) return alert('入力してください');
      content.text = report;
      setReportHistory((prev) => [...prev, report]);
      setReport('');
    }
    if (to === 'next') {
      if (!next) return alert('入力してください');
      content.text = next;
      setNextHistory((prev) => [...prev, next]);
      setNext('');
    }
    postContent(roomId, to, content);
  };

  if (open) {
    return (
      <div>
        <h2>Agenda Post Form</h2>
        <p>※Enterでも送信されます</p>
        <form onSubmit={(e) => onSubmit(e, 'chat')}>
          <label htmlFor='chat'>今週を振り返る</label>
          <div>
            {chatHistory.map((text, index) => (
              <div key={index}>{text}</div>
            ))}
          </div>
          <div>
            <input
              id='chat'
              type='text'
              value={chat}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setChat(e.target.value)
              }
            />
            <Button label='' icon={<Send />} onClick={() => {}} />
          </div>
        </form>
        <form onSubmit={(e) => onSubmit(e, 'report')}>
          <label htmlFor=''>今週に学んだこと</label>
          <div>
            {reportHistory.map((text, index) => (
              <div key={index}>{text}</div>
            ))}
          </div>
          <div>
            <input
              type='text'
              value={report}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setReport(e.target.value)
              }
            />
            <Button label='' icon={<Send />} onClick={() => {}} />
          </div>
        </form>
        <form onSubmit={(e) => onSubmit(e, 'next')}>
          <label htmlFor=''>次週の取り組み</label>
          <div>
            {nextHistory.map((text, index) => (
              <div key={index}>{text}</div>
            ))}
          </div>
          <div>
            <input
              type='text'
              value={next}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNext(e.target.value)
              }
            />
            <Button label='' icon={<Send />} onClick={() => {}} />
          </div>
        </form>
      </div>
    );
  } else return null;
};
