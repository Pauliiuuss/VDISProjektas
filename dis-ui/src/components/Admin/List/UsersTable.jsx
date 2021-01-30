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
          className="btn btn-danger btn-sm"
        >
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      ),
    },
    {
      key: "disable",
      content: (user) => (
        <button
          onClick={() => {
            if (window.confirm(`Deaktyvuoti naudotoją: ${user.username}`)) {
              this.props.onDisable(user);
            }
          }}
          className="btn btn-warning btn-sm"
        >
          <i className="fa fa-lock" aria-hidden="true"></i>
        </button>
      ),
    },
    {
      key: "reset",
      content: (user) => (
        <button
          onClick={() => {
            if (
              window.confirm(
                `Atstatyti slaptažodį naudotojui: ${user.username}`
              )
            ) {
              this.props.onResetPassword(user);
            }
          }}
          className="btn btn-success btn-sm"
        >
          <i className="fa fa-key" aria-hidden="true"></i>
        </button>
      ),
    },
  ];
  onResetPassword;
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
