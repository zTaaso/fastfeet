import styled from 'styled-components';
import { darken } from 'polished';

export const ActionButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    cursor: pointer;
  }
`;

export const Options = styled.ul`
  border: 1px solid rgba(0, 0, 0, 0.2);

  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  background-color: #fff;
  color: #fff;
  text-align: center;
  border-radius: 0px;
  position: absolute;
  z-index: 10;
  top: 100%;
  /* left: 0%; */
  /* margin-left: -10%; */

  &::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 4px;
    border-style: solid;

    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: rgba(0, 0, 0, 0.6);
    border-top-color: transparent;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  width: 100%;

  font-size: 12px;
  padding: 5px 10px;

  &:hover {
    background: ${darken(0.07, '#fff')};
  }

  svg {
    margin-right: 5px;
  }

  color: #999999;
  background: #ffffff;
  border: 0;
`;
