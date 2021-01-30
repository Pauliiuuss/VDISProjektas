import React, { Component } from "react";
import Table from "./Table";

class UsersTable extends Component {
  columns = [
    {
      path: "username",
      label: "Prisijungimo vardas",
    },
    { path: "role", label: "Rolė" },
    { path: "button", label: "" },
    {
      key: "delete",
      content: (user) => (
        <button
          onClick={() => {
            if (window.confirm(`Ištrinti naudotoją: ${user.username}`)) {
              this.props.onDelete(user);
            }
          }}
          // onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { users, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={users}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default UsersTable;
