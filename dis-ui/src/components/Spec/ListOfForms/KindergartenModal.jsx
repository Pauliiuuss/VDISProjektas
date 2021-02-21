import React, { useState } from "react";
import { useEffect } from "react";
import SpecService from "../../../services/spec.service";
import Groups from "./ListOfGroups/Groups";

const KindergartenModal = ({ kindergarten, handleClose, show }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [disabled] = useState(false);
  const [dataYoung, setDataYoung] = useState("");
  const [dataOld, setDataOld] = useState("");

  useEffect(() => {
    SpecService.getFormsByKindergarten(kindergarten.id).then(
      (response) => {
        console.log(response.data[0]);
        setDataOld(response.data[0]);
        setDataYoung(response.data[1]);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [kindergarten]);

  console.log(kindergarten.groups);

  return (
    <div className={showHideClassName}>
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{kindergarten.name}</h5>
            <button onClick={handleClose} className="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body container">
            {kindergarten.groups &&
              kindergarten.groups.map((g) => (
                <div key={g.name}>
                  <Groups
                    forms={g.age === "2 iki 3" ? dataYoung : dataOld}
                    group={g}
                  />
                </div>
              ))}
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
export default KindergartenModal;
