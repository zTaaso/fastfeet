import styled from 'styled-components';

export const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 5px;
  max-width: 130px;
  border-radius: 12px;
  font-size: 14px;
  text-transform: uppercase;

  div {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
  }

  &.delivered {
    color: #2ca42b;
    font-weight: bold;
    background: #dff0df;

    div {
      background: #2ca42b;
    }
  }

  &.pending {
    color: #c1bc35;
    font-weight: bold;
    background: #f0f0df;

    div {
      background: #c1bc35;
    }
  }

  &.retired {
    color: #4d85ee;
    font-weight: bold;
    background: #bad2ff;

    div {
      background: #4d85ee;
    }
  }

  &.canceled {
    color: #de3b3b;
    font-weight: bold;
    background: #fab0b0;

    div {
      background: #de3b3b;
    }
  }
`;
