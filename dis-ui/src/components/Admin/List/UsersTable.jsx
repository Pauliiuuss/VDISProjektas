import React, { Component } from "react";
import Table from "./Table";

class UsersTable extends Component {
  columns = [
    {
      path: "username",
      label: "Prisijungimo vardas",
    },
    { path: "roles", label: "Rolė" },
  ];

  render() {
    const { users } = this.props;

    return <Table columns={this.columns} data={users} />;
  }
}

export default UsersTable;
