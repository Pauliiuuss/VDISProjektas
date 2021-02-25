import React, { Component } from 'react';
import Table from './Table';

export default class DocumentsTable extends Component {
  columns = [
    { path: 'uploadDate', label: 'Įkėlimo data' },
    { path: 'userName', label: 'Prisijungimo vardas' },
    { path: 'url', label: 'Medicininė pažyma' },
  ];

  render() {
    const { docs } = this.props;
    return <Table columns={this.columns} data={docs} />;
  }
}
