import React, { Component } from "react";
import Table from "./Table";

class GroupsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Grupės pavadinimas",
    },
    { path: "type", label: "Amžius" },
    { path: "lang", label: "Kalba" },
    { path: "capasity", label: "Vietų skaičius" },
  ];
  render() {
    const { groups, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={groups}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default GroupsTable;
