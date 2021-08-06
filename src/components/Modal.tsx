import { VFC, ReactNode } from 'react';
import styled from 'styled-components';

type ModalProps = {
  open: boolean;
  close: () => void;
  children: ReactNode;
};

export const Modal: VFC<ModalProps> = ({ open, close, children }) => {
  return open ? (
    <StyledModal>
      <div className='mask' onClick={close} />
      <div className='container'>{children}</div>
    </StyledModal>
  ) : null;
};

const StyledModal = styled.div`
  > .mask {
    width: 100vw;
    height: 100vh;
    background-color: #666;
    opacity: 0.5;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
  }

  > .container {
    max-width: 360px;
    max-height: 600px;

    position: fixed;
    inset: 0;
    margin: auto;
    background-color: #fff;
    border: 2px solid #333;
    border-radius: 8px;
    z-index: 999;
  }
`;
