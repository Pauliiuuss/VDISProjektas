import React, { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ParenService from "../../services/parent.service";
import RenderInfoForm from "./RenderInfoForm";

const InfoModal = ({ handleClose, show, children, showId }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    if (showId !== "")
      ParenService.getAllData(showId).then(
        (response) => {
          setData(response.data);
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
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Vaiko forma</h5>
            <button onClick={handleClose} className="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {showId && (
              <RenderInfoForm disabled={disabled} showId={showId} data={data} />
            )}
          </div>
          <div className="modal-footer">
            <button onClick={handleClose} className="btn btn-secondary">
              Uždaryti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InfoModal;
