import React, { Component } from "react";
import Table from "./Table";

class FormsTable extends Component {
  columns = [
    { path: "name", label: "Vardas" },
    { path: "surename", label: "Pavardė" },
    { path: "personId", label: "Asmens kodas" },
    { path: "postDate", label: "Pateikta" },
    { path: "formStatus.name", label: "Statusas" },
  ];

  render() {
    const { forms, appStatus } = this.props;
    if (
      forms.filter(
        (f) =>
          f.formStatus.name !== "PATEIKTAS" &&
          f.formStatus.name !== "PANAIKINTAS"
      ).length > 0
    )
      this.columns = [
        { path: "name", label: "Vardas" },
        { path: "surename", label: "Pavardė" },
        { path: "personId", label: "Asmens kodas" },
        { path: "postDate", label: "Pateikta" },
        { path: "formStatus.name", label: "Statusas" },
        { path: "kindergartenName", label: "Darželis" },
        { path: "groupName", label: "Grupė" },
      ];

    return <Table appStatus={appStatus} columns={this.columns} data={forms} />;
  }
}
export default FormsTable;
