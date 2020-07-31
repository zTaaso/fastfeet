import styled, { css } from 'styled-components';

export const Table = styled.div`
  overflow-y: scroll;
  max-height: 350px;
  height: 100%;

  display: flex;
  justify-content: center;

  &::-webkit-scrollbar {
    width: 0.3em;
    height: 0.3em;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    /* background: #7d40e7; */
    background: rgba(10, 20, 30, 0.1);
    opacity: 0.3;
    border-radius: 5px;
  }

  ${({ focused }) =>
    !focused &&
    css`
      /* Hide scrollbar for IE, Edge and Firefox */
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */

      /* Hide scrollbar for Chrome, Safari and Opera */
      &::-webkit-scrollbar {
        display: none;
      }
    `}

  svg.loading {
    margin-top: 200px;
  }

  table {
    width: 97%;
    border-spacing: 0;
    border-collapse: separate;
    border-spacing: 0px 20px;

    thead tr th {
      color: #444444;
      text-align: left;
      padding: 12px 20px;

      &:last-child {
        text-align: center;
      }

      /* margin-left: 5px; */
    }

    tbody {
      border: 1px solid black;
    }

    tbody tr {
      background: #fff;
      border-radius: 9px;

      td {
        padding: 5px 20px 10px;
        color: #666666;
        font-size: 16px;
        max-width: 600px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        word-wrap: break-word;
        vertical-align: baseline;

        label {
          padding-bottom: 5px;
        }

        img {
          width: 28px;
          height: 28px;
          position: relative;
          top: 5px;
          border-radius: 50%;
          margin-right: 5px;
        }
      }

      td:last-child {
        padding: 10px 20px 10px;
        overflow: visible;
      }
    }
  }
`;
