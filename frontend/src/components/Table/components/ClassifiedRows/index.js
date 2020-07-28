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
            <img src={row.deliveryman.avatar_url} alt={row.deliveryman.name} />
            <label>{row.deliveryman.name}</label>
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
            <img src={row.avatar_url} alt={row.name} />
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
          <td>{row.delivery_id}</td>

          <td>{row.description}</td>

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
