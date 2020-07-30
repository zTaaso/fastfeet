import styled from 'styled-components';

export const DialogContentStyled = styled.div`
  hr {
    margin: 10px 1px;
    opacity: 0.5;
  }

  div.loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div.product {
    display: flex;
    align-items: center;
    justify-content: center;

    strong {
      margin-right: 6px;
    }
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

    svg {
      margin-top: 5px;
    }
  }
`;
