import styled from 'styled-components';

export const Table = styled.div`
  overflow-y: scroll;
  padding: 10px 20px;
  max-height: 400px;

  scrollbar-color: #eee;
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  table {
    width: 100%;
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
        max-width: 900px;
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
