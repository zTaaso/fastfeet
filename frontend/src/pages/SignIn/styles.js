import styled, { keyframes } from 'styled-components';

export const LogoContent = styled.div`
  display: flex;
  justify-content: center;

  img {
    width: 254px;
    height: 44px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

export const Button = styled.button`
  svg {
    animation: ${rotate} 1s linear infinite;
  }
`;
