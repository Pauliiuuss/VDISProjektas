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

  componentDidMount() {
    ParentService.appStatus().then((response) => {
      console.log(response);
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
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
