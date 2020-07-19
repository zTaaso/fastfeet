import styled, { keyframes, css } from 'styled-components';
import { darken } from 'polished';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

export const Input = styled.input`
  padding: 10px 5px;
  background: #fff;

  border: 1px solid #dddddd;

  color: #556;
  margin-top: 5px;
  margin-bottom: 15px;

  &::placeholder {
    opacity: 0.7;
  }
`;

export const Label = styled.label`
  font-family: 'Roboto';
  color: #444444;
  font-weight: bold;
  display: flex;
  flex-direction: column;

  text-transform: uppercase;
  margin-bottom: 5px;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;

  button {
    margin: 5px 0 15px 5px;
    background: #7d40e7;
    padding: 6px;
    border-radius: 6px;
    border: 0;

    transition: 0.2s;

    &:hover {
      background: ${darken(0.1, '#7d40e7')};
      padding: 7px;
    }

    svg {
      ${(props) =>
        props.loading &&
        css`
          animation: ${rotate} 1s linear infinite;
        `}
    }
  }
`;
