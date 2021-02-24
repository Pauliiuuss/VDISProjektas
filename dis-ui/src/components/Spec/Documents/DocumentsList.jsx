import React, { Component } from 'react';
import Navbar from '../../navbar.component';
import UploadService from '../../../services/upload-files.service';
import DocumentsTable from './DocumentsTable';

export default class DocumentsList extends Component {
  state = {
    docs: [],
  };

  componentDidMount = async () => {
    const { data } = await UploadService.getFiles();
    this.setState({ docs: data });
  };

  render() {
    console.log(this.state.docs);

    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <DocumentsTable docs={this.state.docs} />
        </div>
      </React.Fragment>
    );
  }
}
