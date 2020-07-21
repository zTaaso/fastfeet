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
      max-width: 250px;
      max-height: 500px;
      border-radius: 15%;
    }

    h2 {
      margin: 10px 0;
    }
  }
`;
