import { VFC } from 'react';
import { useForm } from 'react-hook-form';
import { Game } from 'src/types';
import styled from 'styled-components';
import { createGame } from '../../firebase/firestore/game';

type PostFormProps = {
  className?: string;
};

export const PostForm: VFC<PostFormProps> = ({ className }) => {
  const { register, handleSubmit } = useForm();
  const submit = (data: Game) => {
    console.log(data);
    // createGame(data)
  };
  return (
    <StyledPostForm className={`${className}`}>
      <form onSubmit={handleSubmit(submit)}>
        <input type='file' accept='image/*' />
        <input
          type='text'
          {...register('title', { required: true })}
          placeholder='タイトル'
        />
        <input
          type='text'
          {...register('description', { required: true })}
          placeholder='説明'
        />
        <input
          type='text'
          {...register('createdBy', { required: true })}
          placeholder='製作者'
        />
        <input
          type='url'
          {...register('gameUrl', { required: true })}
          placeholder='ゲームのURL'
        />
        <input
          type='url'
          {...register('githubUrl', { required: true })}
          placeholder='GitHubのURL'
        />
        <button type='submit'>送信</button>
      </form>
    </StyledPostForm>
  );
};

const StyledPostForm = styled.div`
  form {
    display: flex;
    flex-direction: column;
  }
`;
