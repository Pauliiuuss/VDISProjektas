import React, { useState } from "react";
import { useEffect } from "react";
import SpecService from "../../../services/spec.service";
import Groups from "./ListOfGroups/Groups";

const KindergartenModal = ({ kindergarten, handleClose, show }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [disabled] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    SpecService.getFormsByKindergarten(kindergarten.id).then(
      (response) => {
        console.log(response.data);
        setData(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [kindergarten]);

  console.log(kindergarten.groups);
  console.log(data["VIJURKAI Vilniaus darželis-mokykla „Lokiukas“"]);

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
                <div key={g.name + " " + g.age + " " + g.capasity}>
                  <Groups
                    kindergarten={kindergarten}
                    forms={data[`${g.name} ${kindergarten.name}`]}
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
