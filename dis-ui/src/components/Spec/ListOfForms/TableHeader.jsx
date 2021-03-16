import React, { Component } from "react";
import ParentService from "../../../services/parent.service";

// columns: array
// sortColumn: object
// onSort: function

class TableHeader extends Component {
  state = {
    appStatus: {
      registrationClosed: true,
      specelistsDisabled: true,
    },
  };

  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  componentDidMount() {
    ParentService.appStatus().then((response) => {
      this.setState({ appStatus: response.data });
    });
  }

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              hidden={
                this.state.appStatus.specelistsDisabled &&
                column.path === "buttons"
              }
              key={column.path || column.key}
              onClick={
                column.path !== "buttons"
                  ? () => this.raiseSort(column.path)
                  : ""
              }
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
