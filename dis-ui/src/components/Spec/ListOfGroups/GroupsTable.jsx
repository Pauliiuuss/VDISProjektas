import React, { Component } from "react";
import Table from "./Table";

class GroupsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Grupės pavadinimas",
    },
    { path: "ageFrom", label: "Amžius nuo" },
    { path: "ageTo", label: "Amžius iki" },
    { path: "capasity", label: "Vietų skaičius" },
  ];
  render() {
    const {
      groups,
      onSort,
      sortColumn,
      onAddGroup,
      successful,
      message,
    } = this.props;

    return (
      <Table
        columns={this.columns}
        data={groups}
        sortColumn={sortColumn}
        onSort={onSort}
        onAddGroup={onAddGroup}
        successful={successful}
        message={message}
      />
    );
  }
}

export default GroupsTable;
