import styled from 'styled-components';
import { darken } from 'polished';

export const Button = styled.button`
  background: #7d40e7;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: #fff;
  padding: 7px 14px;
  border: none;
  border-radius: 4px;
  max-height: 36px;
  width: 130px;

  transition: background 0.3s;

  &:hover {
    background: ${darken(0.1, '#7d40e7')};
  }

  span {
    text-align: center;
  }
`;
