import React, { Component } from 'react';
import UploadService from '../../services/upload-files.service';

class FileUpload extends Component {
  state = {
    selectedFile: null,
    currentFile: null,
    fileName: '',
    progress: 0,
    message: '',
  };

  fileSelectHandler = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
      fileName: e.target.files[0].name,
    });
  };

  fileUploadHandler = () => {
    let currentFile = this.state.selectedFile[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        return;
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: 'Nepavyko prisegti failo!',
          currentFile: null,
        });
      });
    this.setState({
      selectedFile: null,
    });
  };

  render() {
    const { currentFile, progress } = this.state;

    return (
      <React.Fragment>
        {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + '%' }}
            >
              {progress}%
            </div>
          </div>
        )}
        <input
          style={{ display: 'none' }}
          accept="application/pdf"
          id="files"
          type="file"
          onChange={this.fileSelectHandler}
          ref={(fileInput) => (this.fileInput = fileInput)}
        />
        <button
          className="btn btn-secondary"
          onClick={() => {
            this.fileInput.click();
          }}
        >
          Prisegti dokumentą
        </button>
        <div>{this.state.fileName}</div>
        <div>
          <button
            className="btn btn-success mt-3"
            onClick={this.fileUploadHandler}
          >
            Pateikti
          </button>
        </div>
      </React.Fragment>
    );
  }
}
export default FileUpload;
