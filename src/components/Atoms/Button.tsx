import styled from 'styled-components';
import { ReactNode, VFC } from 'react';

type ButtonProps = {
  className?: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
};

export const Button: VFC<ButtonProps> = ({
  className,
  label,
  icon,
  onClick,
}) => {
  return (
    <StyledButton className={className} onClick={onClick}>
      {icon && <div className='icon'>{icon}</div>}
      {label && <div className='label'>{label}</div>}
    </StyledButton>
  );
};

const StyledButton = styled.div`
  font-size: 18px;
  font-weight: bold;

  width: auto;
  height: 60px;
  padding: 0 16px;
  border: 4px solid #333;
  border-radius: 12px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  background-color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  > .label {
    margin: 0 8px;
  }

  &:hover {
    transform: scale(0.98);
    transition: all 0.2s ease-out;
  }
  &:active {
    transform: scale(0.95);
    background-color: orange;
  }
`;
