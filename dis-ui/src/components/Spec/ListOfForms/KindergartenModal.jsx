import React, { useState } from "react";
import { useEffect } from "react";
import Groups from "./ListOfGroups/Groups";

const KindergartenModal = ({ kindergarten, handleClose, show }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [disabled] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {}, []);

  console.log(kindergarten.groups);

  return (
    <div className={showHideClassName}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{kindergarten.name}</h5>
            <button onClick={handleClose} className="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">dcsax</div>
          {kindergarten.groups &&
            kindergarten.groups.map((g) => <Groups group={g} />)}
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
export default KindergartenModal;
