import React, { Component } from "react";
import Table from "./Table";

class KindergartenTable extends Component {
  columns = [
    {
      path: "name",
      label: "Darželio pavadinimas",
    },
    { path: "address", label: "Adresas" },
    { path: "lang", label: "Kalba" },
    { path: "capasity", label: "Vietų skaičius" },
  ];
  render() {
    const { kindergartens, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={kindergartens}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default KindergartenTable;
