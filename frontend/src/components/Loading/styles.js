import styled, { keyframes, css } from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const rotate = keyframes`
  from {
    transform: rotate(360deg);
  } to {
    transform: rotate(0deg);
  }
`;
export const Icon = styled(AiOutlineLoading3Quarters)`
  animation: ${rotate} 1s linear infinite;
`;
