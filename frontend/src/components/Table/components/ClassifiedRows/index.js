import React from 'react';

const ClassifiedRows = ({ rows = [], category, components }) => {
  let classifiedRows;
  const { StatusLabel, ActionsBtn } = components;

  switch (category) {
    case 'deliveries': {
      classifiedRows = rows.map((row) => (
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
            <StatusLabel.Component category={row.status.category}>
              {row.status.label}
            </StatusLabel.Component>
          </td>
          <td>
            <ActionsBtn.Component {...ActionsBtn.props} />
          </td>
        </tr>
      ));
      break;
    }

    case 'deliverymen': {
      classifiedRows = rows.map((row) => (
        <tr>
          <td>{row.id}</td>
          <td>
            <img
              src={
                row.img
                  ? row.img
                  : `https://ui-avatars.com/api/?name=${row.name}&color=${row.avatar.color}`
              }
              alt=""
            />
          </td>
          <td>{row.name}</td>
          <td>{row.email}</td>

          <td>
            <ActionsBtn.Component {...ActionsBtn.props} />
          </td>
        </tr>
      ));
      break;
    }

    case 'recipients': {
      classifiedRows = rows.map((row) => (
        <tr>
          <td>{row.id}</td>

          <td>{row.name}</td>
          <td>{row.adress}</td>

          <td>
            <ActionsBtn.Component {...ActionsBtn.props} />
          </td>
        </tr>
      ));
      break;
    }

    case 'problems': {
      classifiedRows = rows.map((row) => (
        <tr>
          <td>{row.id}</td>

          <td>{row.problem}</td>

          <td>
            <ActionsBtn.Component {...ActionsBtn.props} />
          </td>
        </tr>
      ));
      break;
    }

    default:
      classifiedRows = null;
  }

  return classifiedRows;
};

export default ClassifiedRows;
