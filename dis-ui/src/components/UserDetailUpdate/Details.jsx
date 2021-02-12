import React, { useState } from "react";
import RenderInput from "./util/RenderInput";
import {
  faUser,
  faHome,
  faPhone,
  faEnvelope,
  faBirthdayCake,
} from "@fortawesome/free-solid-svg-icons";

const Details = ({ currentUser, userReady, roles }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  console.log(name);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2 className={"m-3"}>Mano domenys</h2>
      <form>
        <div class="form-group">
          <RenderInput
            inputPlaceholder={"Vardas"}
            type={"text"}
            forItem={name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={faUser}
          />
          <RenderInput
            inputPlaceholder={"Pavardė"}
            type={"text"}
            forItem={surname}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            icon={faUser}
          />
          <RenderInput
            inputPlaceholder={"Tel"}
            type={"number"}
            forItem={phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            icon={faPhone}
          />
          <RenderInput
            inputPlaceholder={"El.paštas"}
            type={"email"}
            forItem={email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={faEnvelope}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button type="submit" class="btn btn-primary mx-auto">
            Atnaujinti
          </button>
        </div>
      </form>
    </div>
  );
};

export default Details;
