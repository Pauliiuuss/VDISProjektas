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
    {
      path: "personId",
      label: "Asmens kodas",
    },
    { path: "formStatus.name", label: "Statusas" },
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
    if (
      forms.filter(
        (f) =>
          f.formStatus.name !== "PATEIKTAS" &&
          f.formStatus.name !== "PANAIKINTAS"
      ).length > 0
    )
      this.columns = [
        {
          path: "name",
          label: "Vardas",
        },
        {
          path: "surename",
          label: "Pavardė",
        },
        {
          path: "personId",
          label: "Asmens kodas",
        },
        { path: "formStatus.name", label: "Statusas" },
        { path: "kindergartenName", label: "Darželis" },
        { path: "groupName", label: "Grupė" },
        { path: "buttons", label: "Veiksmai" },
      ];

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
