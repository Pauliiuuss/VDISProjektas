import React, { Component } from 'react';
import Table from './Table';

class FormsTable extends Component {
  columns = [
    { path: 'name', label: 'Vardas' },
    { path: 'surename', label: 'Pavardė' },
    { path: 'personId', label: 'Asmens kodas' },
    { path: 'postDate', label: 'Pateikta' },
    { path: 'formStatus.name', label: 'Statusas' },
    { path: 'buttons', label: '' },
  ];

  render() {
    const { forms } = this.props;
    return <Table columns={this.columns} data={forms} />;
  }
}
export default FormsTable;
