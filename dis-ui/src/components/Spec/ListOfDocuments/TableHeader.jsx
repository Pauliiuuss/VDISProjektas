import React, { Component } from 'react';

export default class TableHeader extends Component {
  render() {
    return (
      <thead className="text-secondary text-center">
        <tr>
          {this.props.columns.map((column) => (
            <th key={column.path || column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
    );
  }
}
