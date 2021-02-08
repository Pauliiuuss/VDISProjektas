import React, { Component } from "react";
import Table from "./Table";

class KindergartenTable extends Component {
  columns = [
    {
      path: "name",
      label: "Darželio pavadinimas",
    },
    { path: "address", label: "Adresas" },
    { path: "capasity", label: "Vietų skaičius" },
  ];
  render() {
    const {
      kindergartens,
      onSort,
      sortColumn,
      onKindergartenChange,
      onAddKindergarten,
      successful,
      message,
      active,
    } = this.props;

    return (
      <Table
        columns={this.columns}
        data={kindergartens}
        sortColumn={sortColumn}
        onSort={onSort}
        onKindergartenChange={onKindergartenChange}
        onAddKindergarten={onAddKindergarten}
        successful={successful}
        message={message}
        active={active}
      />
    );
  }
}

export default KindergartenTable;
