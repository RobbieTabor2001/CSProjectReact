// Project.js

import React from "react";
import { Route, Routes } from "react-router-dom";
import UserList from "./users/list";
import UserDetails from "./users/details";
import SignIn from "./users/signin";
import Account from "./users/account";
import SignUp from "./users/signup";
import Nav from "./nav";
import store from "./store";
import { Provider } from "react-redux";
import CurrentUser from "./users/currentUser";
import ProtectedAdminRoute from "./users/protectedAdminRoute";
import ProjectHome from "./projecthome";
import Search from "./search"; // Import the Search component
import SongDetails from "./songdetails";
import ProtectedContent from "./users/protectedContent";
function Project() {
  return (
    <Provider store={store}>
      <CurrentUser>
        <div className="row container-fluid mt-2">
          <div className="col-3">
            <Nav />
          </div>
          <div className="col-9">
            <Routes>
              {/* Update this route to use ProjectHome */}
              <Route path="/home" element={<ProjectHome />} />         
              <Route path="/search" element={<Search />} />
          <Route path="/search/details/:id" element={<SongDetails />} />
              <Route path="/" element={<ProjectHome />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/account" element={
                <ProtectedContent>
                  <Account />
                </ProtectedContent>
              } />
              <Route
                path="/users"
                element={
                  <ProtectedAdminRoute>
                    <UserList />
                  </ProtectedAdminRoute>
                }
              />
              <Route path="/users/:id" element={<UserDetails />} />
              <Route path="/search" element={<Search />} /> {/* New route for Search */}
            </Routes>
          </div>
        </div>
      </CurrentUser>
    </Provider>
  );
}

export default Project;
