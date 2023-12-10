import React, { useState } from "react";
import * as client from "./client";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("USER"); // Default role
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signUp = async () => {
    try {
      const user = await client.signUp({ username, password, firstName, lastName, role });
      //const user = await client.signIn({ username, password });
      dispatch(setCurrentUser(user));
      navigate("/project/account");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        onChange={(e) => setFirstName(e.target.value)}
        type="text"
        value={firstName}
        className="form-control"
        placeholder="First Name"
      />
      <input
        onChange={(e) => setLastName(e.target.value)}
        type="text"
        value={lastName}
        className="form-control"
        placeholder="Last Name"
      />
      <input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        value={username}
        className="form-control"
        placeholder="Username"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        value={password}
        className="form-control"
        placeholder="Password"
      />
      <div>
        <label>Role:</label>
        {["ADMIN", "FACULTY", "STUDENT", "USER"].map((r) => (
          <div key={r}>
            <input
              type="radio"
              value={r}
              checked={role === r}
              onChange={(e) => setRole(e.target.value)}
            />
            {r}
          </div>
        ))}
      </div>
      <button className="btn btn-success" onClick={signUp}>
        Sign Up
      </button>
      <Link to="/project/signin">Sign In</Link>
    </div>
  );
}

export default SignUp;
