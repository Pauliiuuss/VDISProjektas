import React, { useState } from "react";

const AddGroup = ({ onAddGroup, successful, message }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("3 iki 6");
  const [capasity, setCapasity] = useState("");
  const [addForm, setAddForm] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  function hanldeClick() {
    onAddGroup(name, age, capasity);
    setAddForm(false);
    setAge("");
    setCapasity("");
    setName("");
  }

  function getButtonState() {
    if (name === "" || capasity < 1) return true;
    return false;
  }
  if (!addForm)
    return (
      <tfoot>
        <tr>
          <td style={{ paddingLeft: "5px", paddingRight: "5px" }}>
            <button
              onClick={() => {
                setAddForm(!addForm);
                setShowMessage(false);
              }}
              className="btn btn-sm btn-success"
            >
              <p style={{ margin: 0 }}>Pridėti grupę</p>
            </button>
          </td>
          <td colSpan="3">
            {message && showMessage && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </td>
        </tr>
      </tfoot>
    );

  return (
    <React.Fragment>
      <tfoot>
        <tr>
          <td style={{ paddingRight: "4px", paddingLeft: "4px" }}>
            <input
              value={name}
              id="name"
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Pavadinimas"
            />
            <button
              onClick={() => {
                setAddForm(!addForm);
                setCapasity("");
                setName("");
              }}
              className="btn btn-sm btn-secondary m-3"
            >
              <p style={{ margin: 0 }}>Atšaukti</p>
            </button>
          </td>
          <td style={{ paddingRight: "4px", paddingLeft: "4px" }}>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="form-control"
              id="exampleFormControlSelect1"
            >
              <option id="2 iki 3" value="2 iki 3">
                2 iki 3
              </option>
              <option id="3 iki 6" value="3 iki 6">
                3 iki 6
              </option>
            </select>
          </td>
          <td
            style={{ width: "90px", paddingRight: "4px", paddingLeft: "4px" }}
          >
            <div className="row">
              <div className="col-9" style={{ paddingRight: "4px" }}>
                <input
                  value={capasity}
                  id="capasity"
                  onChange={(e) => setCapasity(e.target.value)}
                  type="number"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Vietos"
                />
              </div>
              <div className="col-2" style={{ padding: 0 }}>
                <button
                  disabled={getButtonState() ? true : false}
                  className="btn btn-sm btn-success"
                  style={{ height: "95%" }}
                  onClick={() => {
                    hanldeClick();
                    setShowMessage(true);
                  }}
                >
                  <i className="fa fa-check" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </React.Fragment>
  );
};

export default AddGroup;
