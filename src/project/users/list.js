import React, { useState } from "react";
import * as client from "./client";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
function UserList() {
  const [users, setUsers] = useState([]);
  // const navigate = useNavigate();
  // const { currentUser } = useSelector((state) => state.usersReducer);
  // if (!currentUser || currentUser.role !== "ADMIN") {
  //   navigate("/project/signin");
  // }
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useState(() => {
    fetchUsers();
  }, []);
  return (
    <div className="container">
      <h1>Users</h1>
      <div className="list-group">
        {users.map((user) => (
          <Link
            key={user._id}
            className="list-group-item"
            to={`/project/users/${user._id}`}
          >
            {user.username} {user.role}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default UserList;
