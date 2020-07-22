import React from 'react';
import Proptypes from 'prop-types';

import { Table as TableStyled } from './styles';

import StatusLabel from './components/StatusLabel';
import ClassifyRows from './components/ClassifiedRows';
import ActionsBtn from '../ActionsBtn';

function Table({ headItems = [], bodyRows = [], dialog, category, ...props }) {
  const components = {
    StatusLabel: { Component: StatusLabel },
    ActionsBtn: { Component: ActionsBtn, props: { dialog } },
  };

  return (
    <TableStyled>
      <table {...props}>
        <thead>
          <tr>
            {headItems.map((i) => (
              <th>{i}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <ClassifyRows
            rows={bodyRows}
            category={category}
            components={components}
          />
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
