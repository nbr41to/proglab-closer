import { FormEvent, VFC, useState, ChangeEvent } from 'react';
import { Box } from '@fower/react';
import { Button } from './Button';
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

type PostFormProps = {
  open: boolean;
  close: () => void;
};

export const PostForm: VFC<PostFormProps> = ({ open, close }) => {
  const [chat, setChat] = useState('');
  const [report, setReport] = useState('');
  const [next, setNext] = useState('');

  const user = useRecoilValue(userInfo);

  const [chatHistory, setChatHistory] = useRecoilState(postChatHistory);
  const [reportHistory, setReportHistory] = useRecoilState(postReportHistory);
  const [nextHistory, setNextHistory] = useRecoilState(postNextHistory);

  const onSubmit = (e: FormEvent<HTMLDivElement>, to: ContentType) => {
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
      <Box toCenter>
        <Box
          fixed
          top0
          left0
          w='100vw'
          h='100vh'
          opacity={50}
          bgGray600
          onClick={close}
        />
        <Box
          toCenter
          column
          absolute
          top40
          bgWhite
          zIndex={99}
          p={20}
          borderBlack
          border={2}
          rounded={8}
        >
          <h2>Post Form</h2>
          <Box as='form' onSubmit={(e) => onSubmit(e, 'chat')}>
            <label htmlFor=''>今週を振り返る</label>
            <Box flex>
              {chatHistory.map((text, index) => (
                <Box
                  key={index}
                  bgOrange400
                  white
                  text={12}
                  rounded={4}
                  px={8}
                  py={4}
                  m={4}
                >
                  {text}
                </Box>
              ))}
            </Box>
            <Box flex toCenter>
              <Box
                as='input'
                type='text'
                block
                px={8}
                mr={8}
                borderBlack
                border={2}
                rounded={4}
                h={52}
                toCenterY
                text={24}
                value={chat}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setChat(e.target.value)
                }
              />
              <Button label='' icon={<Send />} onClick={() => {}} />
            </Box>
          </Box>
          <Box as='form' onSubmit={(e) => onSubmit(e, 'report')}>
            <label htmlFor=''>今週に学んだこと</label>
            <Box flex>
              {reportHistory.map((text, index) => (
                <Box
                  key={index}
                  bgOrange400
                  white
                  text={12}
                  rounded={4}
                  px={8}
                  py={4}
                  m={4}
                >
                  {text}
                </Box>
              ))}
            </Box>
            <Box flex toCenter>
              <Box
                as='input'
                type='text'
                block
                px={8}
                mr={8}
                borderBlack
                border={2}
                rounded={4}
                h={52}
                toCenterY
                text={24}
                value={report}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setReport(e.target.value)
                }
              />
              <Button label='' icon={<Send />} onClick={() => {}} />
            </Box>
          </Box>
          <Box as='form' onSubmit={(e) => onSubmit(e, 'next')}>
            <label htmlFor=''>次週の取り組み</label>
            <Box flex>
              {nextHistory.map((text, index) => (
                <Box
                  key={index}
                  bgOrange400
                  white
                  text={12}
                  rounded={4}
                  px={8}
                  py={4}
                  m={4}
                >
                  {text}
                </Box>
              ))}
            </Box>
            <Box flex toCenter>
              <Box
                as='input'
                type='text'
                block
                px={8}
                mr={8}
                borderBlack
                border={2}
                rounded={4}
                h={52}
                toCenterY
                text={24}
                value={next}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNext(e.target.value)
                }
              />
              <Button label='' icon={<Send />} onClick={() => {}} />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else return null;
};
