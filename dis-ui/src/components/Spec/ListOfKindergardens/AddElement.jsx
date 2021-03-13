import React, { useState } from 'react';

const AddElement = ({ onAddKindergarten, successful, message }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [addForm, setAddForm] = useState(false);

  function hanldeClick() {
    onAddKindergarten(address, name);
    setAddForm(false);
    setAddress('');
    setName('');
  }

  function getButtonState() {
    if (name === '' || address === '') return true;
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
                    successful ? 'alert alert-success' : 'alert alert-danger'
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
          <td style={{ paddingRight: '4px', paddingLeft: '4px' }}>
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
                setAddress('');
                setName('');
              }}
              className="btn btn-sm btn-secondary m-3"
            >
              <p style={{ margin: 0 }}>Atšaukti</p>
            </button>
          </td>
          <td style={{ paddingRight: '4px', paddingLeft: '4px' }}>
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
          <td style={{ paddingRight: '4px', paddingLeft: '4px' }}>
            <button
              disabled={getButtonState() ? true : false}
              className="btn btn-md btn-success"
              style={{ height: '95%' }}
              onClick={() => hanldeClick()}
            >
              Pridėti <i className="fa fa-check" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
      </tfoot>
    </React.Fragment>
  );
};

export default AddElement;
