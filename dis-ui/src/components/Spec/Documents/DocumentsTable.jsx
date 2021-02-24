import React, { Component } from 'react';
import Table from './Table';

export default class DocumentsTable extends Component {
  columns = [
    { path: 'username', label: 'Vardas' },
    { path: 'uploadDate', label: 'Data' },
    { path: 'docName', label: 'Dokumentas' },
    { path: 'url', label: 'Perziureti' },
  ];

  render() {
    const { docs } = this.props;
    return <Table columns={this.columns} data={docs} />;
  }
}
