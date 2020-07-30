import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  background: ${darken(0.03, '#f5f5f5')};

  padding: 40px 70px;

  display: flex;
  flex-direction: column;

  header {
    /* max-width: 10%; */
    display: flex;
    flex-direction: column;

    div {
      display: flex;
      justify-content: space-between;

      padding: 5px;
    }

    h1 {
      display: block;
      margin-bottom: 10px;
    }
  }
`;
