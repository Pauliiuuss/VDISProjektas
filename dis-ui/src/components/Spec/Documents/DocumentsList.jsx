import React, { Component } from 'react';
import Navbar from '../../navbar.component';
import UploadService from '../../../services/upload-files.service';

export default class DocumentsList extends Component {
  state = {
    docs: [],
  };

  //   componentDidMount = async () => {
  //     const { data } = await UploadService.getFiles();
  //     this.setState({ docs: data });
  //   };

  componentDidMount = async () => {
    await UploadService.getFiles()
      .then((d) => {
        this.setState({ docs: d });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    console.log(this.state.docs);
    // const { data } = this.state.docs;
    // console.log(data);
    return (
      <div>
        <Navbar />
        <h1>Listas</h1>
      </div>
    );
  }
}
