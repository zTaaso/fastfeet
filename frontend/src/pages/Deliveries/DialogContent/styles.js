import styled from 'styled-components';

export const DialogContentStyled = styled.div`
  hr {
    margin: 10px 1px;
    opacity: 0.5;
  }

  div {
    h3 {
      margin-bottom: 10px;
    }
  }

  div div {
    display: flex;
    align-items: center;
    flex-direction: column;
    img {
      max-width: 300px;
      max-height: 80px;
    }
  }
`;
