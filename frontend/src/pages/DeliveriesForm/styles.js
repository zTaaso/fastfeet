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
