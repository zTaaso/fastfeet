import React from 'react';
import Proptypes from 'prop-types';

import { Table as TableStyled } from './styles';

function Table({ headItems = [], bodyRows = [], ...props }) {
  return (
    <TableStyled {...props}>
      <table>
        <thead>
          <tr>
            {headItems.map((i) => (
              <th>{i}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row) => (
            <tr>
              {Object.values(row).map((item) => (
                <td>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </TableStyled>
  );
}

export default Table;

Table.propTypes = {
  headItems: Proptypes.arrayOf(Proptypes.string).isRequired,
  bodyRows: Proptypes.arrayOf(Proptypes.object).isRequired,
};
