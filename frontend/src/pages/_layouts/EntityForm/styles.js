import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  section {
    width: 60%;
    display: flex;
    justify-content: space-between;

    div {
      display: flex;

      button {
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 7px 15px;
        border: 0;
        border-radius: 5px;

        text-transform: uppercase;
        font-family: 'Roboto';
        font-weight: bold;
        color: #fff;

        margin: 0 5px;

        transition: 0.5s;

        &:hover {
          filter: brightness(0.8);
        }

        svg {
          margin-right: 3px;
        }

        &#back {
          background: #cccccc;
        }
        &#save {
          background: #7d40e7;
        }
      }
    }
  }
`;

export const Content = styled.div`
  background: #fff;
  width: 60%;
  margin-top: 20px;
  border-radius: 7px;

  padding: 30px;
`;
