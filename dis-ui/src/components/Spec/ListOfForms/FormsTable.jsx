import React, { Component } from "react";
import Table from "./Table";

class FormsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Vardas",
    },
    {
      path: "surename",
      label: "Pavardė",
    },
    { path: "address", label: "Adresas" },
    { path: "city", label: "Miestas" },
    { path: "birthDate", label: "Amžius" },
    { path: "formStatus.name", label: "Statusas" },
    { path: "buttons", label: "Veiksmai" },
  ];
  render() {
    const { forms, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={forms}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default FormsTable;
