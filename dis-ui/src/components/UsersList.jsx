import React from 'react';

const UsersListComponent = ({ userid, ...otherProps }) => {
  return (
    <tbody>
      <tr>
        <th scope="row">{userid}</th>
        <td>{otherProps.username}</td>
        <td>{otherProps.role}</td>
      </tr>
    </tbody>
  );
};

export default UsersListComponent;
