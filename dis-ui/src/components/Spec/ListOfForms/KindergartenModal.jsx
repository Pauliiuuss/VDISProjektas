import React, { useState } from "react";
import { useEffect } from "react";
import SpecService from "../../../services/spec.service";
import Groups from "./ListOfGroups/Groups";

const KindergartenModal = ({ kindergarten, handleClose, show }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  // const [disabled] = useState(false);
  const [data, setData] = useState([]);
  const [waitingList, setWaitingList] = useState([]);

  useEffect(() => {
    SpecService.getFormsByKindergarten(kindergarten.id).then(
      (response) => {
        setData(response.data);
        setWaitingList(
          response.data["Laukiantys null"].filter(
            (g) =>
              g.kindergartenPriority.kindergartenOne === kindergarten.name ||
              g.kindergartenPriority.kindergartenTwo === kindergarten.name ||
              g.kindergartenPriority.kindergartenThree === kindergarten.name ||
              g.kindergartenPriority.kindergartenFour === kindergarten.name ||
              g.kindergartenPriority.kindergartenFive === kindergarten.name
          )
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }, [kindergarten]);

  return (
    <div className={showHideClassName}>
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Preliminarios grupės darželiui: {kindergarten.name}
            </h5>
            <button onClick={handleClose} className="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body container">
            {kindergarten.groups &&
              kindergarten.groups.map((g) => (
                <div
                  key={
                    g.name +
                    " " +
                    g.age +
                    " " +
                    g.capasity +
                    " " +
                    g.kindergarten +
                    " " +
                    g.id
                  }
                >
                  <Groups
                    kindergarten={kindergarten}
                    forms={data[`${g.name} ${kindergarten.name}`]}
                    group={g}
                  />
                </div>
              ))}
            {waitingList.length !== 0 && (
              <div key="waiting">
                <Groups
                  kindergarten={kindergarten}
                  forms={waitingList}
                  group={null}
                />
              </div>
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
export default KindergartenModal;
