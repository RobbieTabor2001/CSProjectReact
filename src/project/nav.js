import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Nav() {
  const { currentUser } = useSelector((state) => state.usersReducer);

  return (
    <div className="list-group">
      {currentUser && (
        <div className="list-group-item">
          Logged in as: <strong>{currentUser.username}</strong>
        </div>
      )}

      <Link to="/project/home" className="list-group-item list-group-item-action">
        Home
      </Link>

      <Link to="/project/search" className="list-group-item list-group-item-action">
        Search
      </Link>

      {!currentUser && (
        <>
          <Link
            to="/project/signin"
            className="list-group-item list-group-item-action"
          >
            SignIn
          </Link>
          <Link
            to="/project/signup"
            className="list-group-item list-group-item-action"
          >
            SignUp
          </Link>
        </>
      )}
      
      {currentUser && (
        <>
          {currentUser.role === "ADMIN" && (
            <Link
              to="/project/users"
              className="list-group-item list-group-item-action"
            >
              Users
            </Link>
          )}
          <Link
            to="/project/account"
            className="list-group-item list-group-item-action"
          >
            Account
          </Link>
        </>
      )}
    </div>
  );
}

export default Nav;
