import React, { useState } from "react";
import RenderPasswordInput from "./util/RenderPasswordInput";

const Password = ({ currentUser, userReady, roles }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  console.log(currentUser);
  return (
    <div style={{ marginTop: "100px" }}>
      <div style={{ textAlign: "center" }}>
        <h2 className={"m-3"}>Pakeisti slaptažodį</h2>
        <h6 className={"m-3"}>
          Prisijungimo vardas:{"  "}
          <i>
            <b>{currentUser.username}</b>
          </i>
        </h6>
      </div>
      <p>Reikalavimai keičiamam slaptažodžiui:</p>
      <p>
        Slaptažodis turi būti ne mažiau 8 simbolių ilgo turi būti bent viena
        didžioji ir bent viena mažoji raidė, ir bent vienas skaičius.
      </p>
      <form>
        <div className="form-group">
          <RenderPasswordInput
            inputPlaceholder={"Dabartinis slaptažodis"}
            type={"password"}
            forItem={oldPassword}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <RenderPasswordInput
            inputPlaceholder={"Naujas slaptažodis"}
            type={"password"}
            forItem={newPassword1}
            value={newPassword1}
            onChange={(e) => setNewPassword1(e.target.value)}
          />
          <RenderPasswordInput
            inputPlaceholder={"Pakartokite naują slaptazodį"}
            type={"password"}
            forItem={newPassword2}
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button type="submit" className="btn btn-primary mx-auto">
            Pakeisti slaptažodį
          </button>
        </div>
      </form>
    </div>
  );
};

export default Password;
