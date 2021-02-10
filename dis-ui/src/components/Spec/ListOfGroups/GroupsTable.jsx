import React, { Component } from "react";
import Table from "./Table";

class GroupsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Grupės pavadinimas",
    },
    { path: "age", label: "Amžius" },
    { path: "capasity", label: "Vietų skaičius" },
    { path: "button", label: "" },
  ];
  render() {
    const {
      groups,
      onSort,
      sortColumn,
      onAddGroup,
      successful,
      message,
      onAmendGroup,
    } = this.props;
    return (
      <Table
        onAmendGroup={onAmendGroup}
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
