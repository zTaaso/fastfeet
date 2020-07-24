import styled, { keyframes, css } from 'styled-components';
import { darken, parseToRgb } from 'polished';
import Select from 'react-select';

const color = parseToRgb('#7d40e7');

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
  /* width: 100%; */

  border: 1px solid #dddddd;
  border-radius: 8px;

  color: #556;
  margin-top: 5px;
  margin-bottom: 15px;

  transition: border-radius 0.5s;

  &::placeholder {
    opacity: 0.7;
  }

  &:focus,
  &:hover {
    border-radius: 0;
    border: 1px solid rgba(${color.red}, ${color.green}, ${color.blue}, 0.5);
  }
`;

export const Label = styled.label`
  font-family: 'Roboto';
  color: #444444;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  width: ${({ labelWidth }) => (labelWidth ? `${labelWidth}%` : '100%')};

  text-transform: uppercase;
  margin-bottom: 5px;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  width: 100%;

  input {
    padding: 10px 25px;
  }

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

export const SelectStyled = styled(Select)`
  /* padding: 10px 5px; */
  background: #fff;
  width: 100%;

  border: 1px solid #dddddd;
  border-radius: 12px;

  color: #556;
  margin-top: 5px;
  margin-bottom: 15px;

  transition: border-radius 0.5s;

  &::placeholder {
    opacity: 0.7;
  }

  &:focus,
  &:hover {
    border-radius: 5px;
    border: 1px solid rgba(${color.red}, ${color.green}, ${color.blue}, 0.5);
  }
`;
