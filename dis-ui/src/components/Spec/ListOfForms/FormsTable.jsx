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
    { path: "formStatus.name", label: "Statusas" },
    { path: "kindergarten", label: "Darželis" },
    { path: "buttons", label: "Veiksmai" },
  ];
  render() {
    const {
      loading,
      enableForm,
      cancelForm,
      forms,
      onSort,
      sortColumn,
    } = this.props;

    return (
      <Table
        enableForm={enableForm}
        cancelForm={cancelForm}
        loading={loading}
        columns={this.columns}
        data={forms}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default FormsTable;
