import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  background: #7d40e7 no-repeat;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  background: #fff;
  width: 100%;
  max-width: 360px;

  border-radius: 8px;
  padding: 60px 30px;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 25px;

    button {
      padding: 12px 7px;
      margin-top: 10px;
      background: #7d40e7;
      border-radius: 8px;
      border: 0;

      font: 16px 'Roboto';
      font-weight: bold;
      line-height: 24px;
      color: #fff;

      transition: background 0.5s;

      &:hover {
        background: ${darken(0.1, '#7d40e7')};
      }
    }
  }
`;
