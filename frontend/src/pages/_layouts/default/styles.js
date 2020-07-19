import styled from 'styled-components';

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
  background: #f5f5f5;

  padding: 40px 70px;

  display: flex;
  flex-direction: column;

  header {
    max-width: 90%;

    h1 {
      margin-bottom: 10px;
    }
  }
`;
