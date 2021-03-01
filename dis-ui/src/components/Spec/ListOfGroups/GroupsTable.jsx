import React, { Component } from "react";
import Table from "./Table";
import ParentService from "../../../services/parent.service";

class GroupsTable extends Component {
  state = {
    appStatus: {
      registrationClosed: true,
      specelistsDisabled: true,
    },
  };

  componentDidMount() {
    ParentService.appStatus().then((response) => {
      console.log(response);
      this.setState({ appStatus: response.data });
    });
  }

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
        appStatus={this.state.appStatus}
      />
    );
  }
}

export default GroupsTable;
