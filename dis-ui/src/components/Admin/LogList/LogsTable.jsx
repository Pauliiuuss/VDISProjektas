import React, { Component } from "react";
import Table from "./Table";

class LogsTable extends Component {
  columns = [
    { path: "date", label: "Data" },
    { path: "time", label: "Laikas" },
    { path: "user", label: "Naudotojas" },
    { path: "action", label: "Veiksmas" },
  ];

  render() {
    const { loading, logs, onSort, sortColumn } = this.props;

    return (
      <Table
        loading={loading}
        columns={this.columns}
        data={logs}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}
export default LogsTable;
