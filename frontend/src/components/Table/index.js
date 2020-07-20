import React from 'react';
import Proptypes from 'prop-types';

import { Table as TableStyled } from './styles';

import StatusLabel from './components/StatusLabel';
import ActionsBtn from '../ActionsBtn';

function Table({ headItems = [], bodyRows = [], dialog, ...props }) {
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
          {bodyRows.map((row) => (
            <tr>
              <td>{row.id}</td>
              <td>{row.recipient}</td>
              <td>
                <img
                  src={`https://ui-avatars.com/api/?name=${row.deliveryman}&color=${row.avatar.color}`}
                  alt=""
                />
                <label>{row.deliveryman}</label>
              </td>
              <td>{row.city}</td>
              <td>{row.state}</td>
              <td>
                <StatusLabel category={row.status.category}>
                  {row.status.label}
                </StatusLabel>
              </td>
              <td>
                <ActionsBtn dialog={dialog} />
              </td>
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
