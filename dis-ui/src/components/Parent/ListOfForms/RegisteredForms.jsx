import React, { Component } from 'react';
import ParentService from '../../../services/parent.service';
import RegisteredFormsTable from './RegisteredFormsTable';

export default class Forms extends Component {
  state = {
    forms: [],
  };

  //   componentDidMount = async () => {
  //     const { data } = await ParentService.getFormsById();
  //     this.setState({ users: data });
  //   };

  render() {
    const allForms = this.props.forms;
    const count = allForms.length;

    if (count === 0)
      return (
        <div
          className="alert alert-secondary text-center d-grid gap-2 col-6 mx-auto"
          role="alert"
        >
          Pateiktų prašymų nėra registruota.
        </div>
      );

    return (
      <div className="row">
        <div className="col">
          <RegisteredFormsTable />
        </div>
      </div>
    );
  }
}
