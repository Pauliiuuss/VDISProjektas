import React, { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ParenService from "../../services/parent.service";

const InfoModal = ({ handleClose, show, children, showId }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  useEffect(() => {
    if (showId !== "")
      ParenService.getAllData(showId).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [showId]);

  console.log(showId);

  return (
    <div className={showHideClassName}>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button onClick={handleClose} class="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button onClick={handleClose} class="btn btn-secondary">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InfoModal;
