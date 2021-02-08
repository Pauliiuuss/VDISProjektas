import React, { useState } from "react";

const AddElement = ({ onAddKindergarten, successful, message }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [lang, setLang] = useState("lietuvių");
  const [capasity, setCapasity] = useState(0);
  const [addForm, setAddForm] = useState(false);

  function hanldeClick() {
    onAddKindergarten(address, name, lang, capasity);
    setAddForm(false);
    setAddress("");
    setCapasity(null);
    setName("");
  }

  function getButtonState() {
    if (name === "" || address === "" || capasity < 1) return true;
    return false;
  }
  if (!addForm)
    return (
      <tfoot>
        <tr>
          <td>
            <button
              onClick={() => setAddForm(!addForm)}
              className="btn btn-md btn-success"
            >
              <p style={{ margin: 0 }}>Pridėti darželį</p>
            </button>
          </td>
          <td colSpan="3">
            {message && (
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
                setAddress("");
                setCapasity(null);
                setName("");
              }}
              className="btn btn-sm btn-secondary m-3"
            >
              <p style={{ margin: 0 }}>Atšaukti</p>
            </button>
          </td>
          <td style={{ paddingRight: "4px", paddingLeft: "4px" }}>
            <input
              value={address}
              id="address"
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Adresas"
            />
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
                  onClick={() => hanldeClick()}
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

export default AddElement;
