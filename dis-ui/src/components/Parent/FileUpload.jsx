import React, { Component } from "react";
import UploadService from "../../services/upload-files.service";
import AuthService from "../../services/auth.service";

class FileUpload extends Component {
  state = {
    currentUser: "",
    roles: "",
    selectedFiles: null,
    currentFile: null,
    fileName: "",
    progress: 0,
    message: "",
  };

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    this.setState({
      currentUser: currentUser,
      roles: currentUser.roles,
    });
  }

  fileSelectHandler = (e) => {
    this.setState({
      selectedFiles: e.target.files,
      fileName: e.target.files.name,
    });
  };

  fileUploadHandler = () => {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });
    console.log(currentFile);
    UploadService.upload(this.state.currentUser.id, currentFile, (event) => {
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
          message: "Nepavyko prisegti failo!",
          currentFile: null,
        });
      });
    this.setState({
      selectedFiles: null,
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
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}
        <input
          style={{ display: "none" }}
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
