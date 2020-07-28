import styled from 'styled-components';
import Input from '../../components/Input';

export const Container = styled.div``;

export const InputStyled = styled(Input)`
  width: ${({ width }) => `${width}%`};
`;

export const InputRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const ButtonRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    background: #de3b3b;

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
      margin-left: 5px;
    }
  }
`;
