import styled from 'styled-components';
import Input from '../../components/Input';

export const Container = styled.div``;

export const InputStyled = styled(Input)`
  width: ${({ widthProp }) => `${widthProp}%`};
  margin-right: 10px;
`;

export const InputRow = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  align-items: stretch;
`;
