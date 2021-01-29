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
  ];

  render() {
    const { users } = this.props;

    return <Table columns={this.columns} data={users} />;
  }
}

export default UsersTable;
