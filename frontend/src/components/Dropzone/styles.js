import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 15px 30px;
`;
export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: ${({ hasPhoto }) => (hasPhoto ? '0' : '25px')};

  color: #ccc;

  border-radius: 50%;
  border: ${({ hasPhoto }) => (hasPhoto ? 2 : 1)}px dashed #ccc;

  cursor: pointer;

  img {
    width: 160px;
    height: 150px;
    border-radius: 50%;
  }
`;
