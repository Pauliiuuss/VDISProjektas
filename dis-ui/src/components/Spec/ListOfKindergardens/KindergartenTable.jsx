import React, { Component } from "react";
import Table from "./Table";
import ParentService from "../../../services/parent.service";

class KindergartenTable extends Component {
  state = {
    appStatus: {
      registrationClosed: true,
      specelistsDisabled: true,
    },
  };

  componentDidMount() {
    ParentService.appStatus().then((response) => {
      this.setState({ appStatus: response.data });
    });
  }

  columns = [
    {
      path: "name",
      label: "Darželio pavadinimas",
    },
    { path: "address", label: "Adresas" },
    { path: "capasity", label: "Vietų skaičius" },
    { path: "button", label: "" },
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
      onAmendKindergarten,
    } = this.props;

    return (
      <Table
        onAmendKindergarten={onAmendKindergarten}
        columns={this.columns}
        data={kindergartens}
        sortColumn={sortColumn}
        onSort={onSort}
        onKindergartenChange={onKindergartenChange}
        onAddKindergarten={onAddKindergarten}
        successful={successful}
        message={message}
        active={active}
        appStatus={this.state.appStatus}
      />
    );
  }
}

export default KindergartenTable;
