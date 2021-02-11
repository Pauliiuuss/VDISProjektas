import React, { Component } from 'react';
import Table from './Table';

class FormsTable extends Component {
  columns = [
    {
      path: 'date',
      label: 'Data',
    },
    { path: 'name', label: 'Vardas Pavardė' },
    { path: 'kindergarten', label: 'Darželis' },
    { path: 'status', label: 'Prašymo statusas' },
  ];

  render() {
    const { forms } = this.props;
    return <Table columns={this.columns} data={forms} />;
  }
}
export default FormsTable;
