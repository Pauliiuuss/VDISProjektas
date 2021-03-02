import React, { Component } from "react";
import UploadService from "../../services/upload-files.service";
import AuthService from "../../services/auth.service";
import { Redirect } from "react-router-dom";
import { faPaperclip, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";

class FileUpload extends Component {
  state = {
    currentUser: "",
    roles: "",
    selectedFiles: null,
    currentFile: null,
    fileName: "",
    progress: 0,
    message: "",
    successful: false,
    redirect: null,
  };

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/dis-app/" });
    this.setState({
      currentUser: currentUser,
      roles: currentUser.roles,
    });
    if (!currentUser.roles.includes("ROLE_PARENT")) {
      this.props.history.push("/dis-app/");
      window.location.reload();
    }
  }

  fileSelectHandler = (e) => {
    if (e.target.value.length > 0) {
      this.setState({
        selectedFiles: e.target.files,
        fileName: e.target.files[0].name,
      });
    }
  };

  fileUploadHandler = () => {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });
    UploadService.upload(this.state.currentUser.id, currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
      return;
    }).then(
      (response) => {
        this.setState({
          message: response.data.message,
          successful: true,
        });
        return;
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          message: resMessage,
        });
      }
    );
    this.setState({
      message: "",
      selectedFiles: null,
      fileName: "",
      successful: false,
    });
    ReactTooltip.hide();
  };

  render() {
    if (this.state.redirect) return <Redirect to={this.state.redirect} />;
    const { selectedFiles, message, successful, fileName } = this.state;

    return (
      <React.Fragment>
        <input
          style={{ display: "none" }}
          accept="application/pdf"
          id="files"
          type="file"
          onChange={this.fileSelectHandler}
          ref={(fileInput) => (this.fileInput = fileInput)}
        />
        <div className="btn-group" role="group" aria-label="Third group">
          <button
            data-tip
            data-for="registerTip3"
            className="btn btn-secondary"
            onClick={() => {
              this.fileInput.click();
            }}
          >
            <FontAwesomeIcon icon={faPaperclip} />
          </button>
          <ReactTooltip id="registerTip3" place="bottom" effect="solid">
            Prisegti dokumentą
          </ReactTooltip>
          <button
            data-tip
            data-tip-disabled={selectedFiles}
            data-for="registerTip4"
            className="btn btn-success"
            onClick={this.fileUploadHandler}
            disabled={!selectedFiles}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
          <ReactTooltip id="registerTip4" place="bottom" effect="solid">
            Pateikti dokumentą
          </ReactTooltip>
        </div>

        <div className="mt-2">{fileName}</div>

        {message && (
          <div className="form-group">
            <div
              className={
                successful
                  ? "alert alert-success alert-dismissible fade show"
                  : "alert alert-danger alert-dismissible fade show"
              }
              role="alert"
            >
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              {message}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default FileUpload;
