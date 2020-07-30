import styled, { css } from 'styled-components';

export const Button = styled.button`
  background: #de3b3b;
  color: #fff;
  min-width: 100px;
  max-width: 280px;
  border: 0;
  border-radius: 5px;

  opacity: 0.5;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px 2px;
  margin-top: 16px;
  margin-left: 15px;

  border-bottom: 4px solid rgba(0, 0, 0, 0.2);

  transition: background 0.2s;

  &:hover {
    filter: brightness(0.8);
    transition: 0.2s;
  }

  ${({ enabled }) =>
    enabled &&
    css`
      border-bottom: 2px solid red;
      opacity: 1;
    `}

  ${({ enabled }) =>
    !enabled &&
    css`
      &:hover {
        opacity: 0.8;
        transition: 0.2s;
      }
    `}

    svg {
    margin-right: 4px;
  }
`;
