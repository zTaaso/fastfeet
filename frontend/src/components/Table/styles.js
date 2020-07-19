import styled from 'styled-components';

export const Table = styled.div`
  overflow-y: scroll;
  padding: 10px 20px;
  scrollbar-color: #eee;

  table {
    width: 100%;
    border-spacing: 0;
    border-collapse: separate;
    border-spacing: 0px 20px;

    thead tr th {
      color: #444444;
      text-align: left;
      padding: 12px 20px;

      /* margin-left: 5px; */
    }

    tbody tr {
      background: #fff;
      border-radius: 9px;

      td {
        padding: 12px 20px;
        color: #666666;
        font-size: 16px;
        height: 20px;
        text-align: left;
      }
    }
  }
`;
