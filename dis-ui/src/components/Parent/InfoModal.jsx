import React, { useState } from "react";
import { useEffect } from "react";
import ParenService from "../../services/parent.service";
import RenderInfoForm from "./RenderInfoForm";

const InfoModal = ({ handleClose, show, showId }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [disabled] = useState(false);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (showId !== "") {
      setLoading(true);
      ParenService.getAllData(showId).then(
        (response) => {
          setData(response.data);
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
        }
      );
    }
  }, [showId]);

  return (
    /* eslint-disable */
    <div className={showHideClassName}>
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Vaiko forma</h5>
            <button onClick={handleClose} className="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {/* {loading ? (
            <div className="d-flex justify-content-center">
              <div
                className="spinner-border m-5"
                style={{ width: "3rem", height: "3rem", marginTop: "3rem" }}
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : ( */}
          <div className="modal-body">
            {showId && (
              <RenderInfoForm disabled={disabled} showId={showId} data={data} />
            )}
          </div>
          {/* )} */}
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
