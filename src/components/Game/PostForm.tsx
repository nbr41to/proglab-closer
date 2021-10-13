import { useState, VFC } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValueLoadable } from 'recoil';
import { withAuthInfo } from 'src/recoil/authState';
import { Game } from 'src/types';
import styled from 'styled-components';

import { createGame } from '../../firebase/firestore/game';

type PostFormProps = {
  className?: string;
};

export const PostForm: VFC<PostFormProps> = ({ className }) => {
  const user = useRecoilValueLoadable(withAuthInfo);
  const { register, handleSubmit, watch, reset } = useForm();
  const submit = async (data: Game & { thumbnail: File }) => {
    if (user.state !== 'hasValue') return;
    data.createdBy = user.contents?.name;
    delete data.thumbnail;
    await createGame(data as Game);
    reset();
    alert('投稿が完了しました');
    location.reload();
  };
  return (
    <StyledPostForm className={`${className}`}>
      <form onSubmit={handleSubmit(submit)}>
        {watch('thumbnail')?.length > 0 && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={window.URL.createObjectURL(watch('thumbnail')[0])}
            alt="preview"
          />
        )}
        <input type="file" accept="image/*" {...register('thumbnail')} />
        <input
          type="text"
          {...register('title', { required: true })}
          placeholder="タイトル"
        />
        <textarea
          rows={4}
          {...register('description', { required: true })}
          placeholder="説明"
        ></textarea>
        <input
          type="text"
          {...register('createdBy', { required: true })}
          placeholder="製作者"
        />
        <input
          type="url"
          {...register('gameUrl', { required: true })}
          placeholder="ゲームのURL"
        />
        <input
          type="url"
          {...register('githubUrl', { required: true })}
          placeholder="GitHubのURL"
        />
        <button type="submit">送信</button>
      </form>
    </StyledPostForm>
  );
};

const StyledPostForm = styled.div`
  width: min-content;

  form {
    display: flex;
    flex-direction: column;

    img {
      width: 400px;
    }

    button {
      text-align: center;
    }
  }
`;
