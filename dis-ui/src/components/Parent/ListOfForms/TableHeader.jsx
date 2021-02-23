import React, { Component } from 'react';

export default class TableHeader extends Component {
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th key={column.path || column.key}>{column.label}</th>
          ))}
          <th className="text-center">Prašymas</th>
          <th className="text-center">Medicininė pažyma</th>
        </tr>
      </thead>
    );
  }
}
