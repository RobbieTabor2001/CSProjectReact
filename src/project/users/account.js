import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as client from "./client";
import * as followsClient from "../follows/client";
import * as searchClient from "../searchClient";
import { setCurrentUser } from "./reducer";
import { useDispatch, useSelector } from "react-redux";

function Account() {
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState([]);
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.usersReducer.currentUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await client.account();
        setUser(user);
        fetchFollowing(user._id);
        fetchUserReviews(user._id);
      } catch (error) {
        navigate("/project/signin");
      }
    };

    fetchUser();
  }, [navigate]);

  const fetchUserReviews = async (userId) => {
    try {
      const userReviews = await searchClient.fetchUserReviews(userId);
      setReviews(userReviews);
    } catch (error) {
      console.error("Error fetching user reviews:", error);
    }
  };

  const fetchFollowing = async (userId) => {
    const following = await followsClient.findUsersFollowedByUser(userId);
    setFollowing(following);
  };

  const signOut = async () => {
    await client.signOut();
    dispatch(setCurrentUser(null));
    navigate("/project/signin");
  };

  const updateUser = async () => {
    await client.updateUser(user._id, user);
    fetchUserReviews(user._id);  // Refetch the reviews after updating the user
  };

  const handleChange = (field) => (e) => {
    setUser({ ...user, [field]: e.target.value });
  };

  return (
    <div className="container">
            <h1>Account</h1>

<div className="mb-3">
  <label className="form-label">First Name</label>
  <input
    onChange={handleChange("firstName")}
    type="text"
    value={user?.firstName}
    className="form-control"
  />
</div>

<div className="mb-3">
  <label className="form-label">Last Name</label>
  <input
    onChange={handleChange("lastName")}
    type="text"
    value={user?.lastName}
    className="form-control"
  />
</div>

<div className="mb-3">
  <label className="form-label">Password</label>
  <input
    onChange={handleChange("password")}
    type="password"
    value={user?.password}
    className="form-control"
  />
</div>

<button onClick={updateUser} className="btn btn-success">
  Save
</button>
<button onClick={signOut} className="btn btn-danger">
  Sign Out
</button>

{user?.role === "ADMIN" && (
  <Link to="/project/users" className="btn btn-primary">
    Users
  </Link>
)}

      <h2>My Reviews</h2>
      <div className="list-group">
        {reviews.map((review, index) => (
          <div key={index} className="list-group-item">
            <p>{review.reviewText}</p>
            <Link to={`/project/search/details/${review.songId}`}>View Song</Link>
          </div>
        ))}
      </div>

      <h2>Following</h2>
      <div className="list-group">
        {following.map((follows) => (
          <Link
            key={follows.followed._id}
            className="list-group-item"
            to={`/project/users/${follows.followed._id}`}
          >
            {follows.followed.firstName} {follows.followed.lastName} (@
            {follows.followed.username})
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Account;
