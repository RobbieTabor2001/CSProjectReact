import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as client from "./client";
import * as followsClient from "../follows/client";
import { useSelector } from "react-redux";
import * as searchClient from "../searchClient" // import the new function

function UserDetails() {
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.usersReducer);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [reviews, setReviews] = useState([]); // State for storing user reviews
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?._id === id) {
      navigate("/project/account");
    } else {
      fetchUser();
      fetchUserReviews(id); // Fetch reviews when the component mounts
    }
  }, [id, currentUser, navigate]);

  const fetchUser = async () => {
    const userDetails = await client.findUserById(id);
    setUser(userDetails);
    fetchFollowers(userDetails._id);
    fetchFollowing(userDetails._id);
  };

  const follow = async () => {
    await followsClient.createUserFollowsUser(currentUser._id, user._id);
  };

  const fetchFollowers = async (userId) => {
    const followersData = await followsClient.findUsersFollowingUser(userId);
    setFollowers(followersData);
  };

  const fetchFollowing = async (userId) => {
    const followingData = await followsClient.findUsersFollowedByUser(userId);
    setFollowing(followingData);
  };

  const alreadyFollowing = () => {
    return followers.find(
      (follows) => follows.follower._id === currentUser._id
    );
  };

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveUser = () => {
    client.updateUsers(user._id, user);
  };

  const fetchUserReviews = async (userId) => {
    try {
      const userReviews = await searchClient.fetchUserReviews(userId)
      setReviews(userReviews);
    } catch (error) {
      console.error('Error fetching user reviews:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <div className="container">
      {currentUser?._id !== id && (
        <>
          {alreadyFollowing() ? (
            <button className="btn btn-danger float-end">Unfollow</button>
          ) : (
            <button onClick={follow} className="btn btn-primary float-end">
              Follow
            </button>
          )}
        </>
      )}
      <h1>User Details</h1>
      {currentUser?.role === "ADMIN" ? (
        <>
          <div className="form-group">
            <label>Username:</label>
            <input
              name="username"
              type="text"
              value={user?.username}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>First Name:</label>
            <input
              name="firstName"
              type="text"
              value={user?.firstName}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              name="lastName"
              type="text"
              value={user?.lastName}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          {/* Add other fields as necessary */}
          <button onClick={saveUser} className="btn btn-primary mt-2">
            Save
          </button>
        </>
      ) : (
        <>
          <p>Username: {user?.username}</p>
          <p>First Name: {user?.firstName}</p>
          <p>Last Name: {user?.lastName}</p>
        </>
      )}
      
      <h2>Followers</h2>
<div className="list-group">
  {followers.map((follows) => (
    <Link
      to={`/project/users/${follows.follower._id}`}
      key={follows._id}
      className="list-group-item"
    >
      {follows.follower.firstName} {follows.follower.lastName} (@
      {follows.follower.username})
    </Link>
  ))}
</div>
<h2>Following</h2>
<div className="list-group">
  {following.map((follows) => (
    <Link
      to={`/project/users/${follows.followed._id}`}
      key={follows._id}
      className="list-group-item"
    >
      {follows.followed.firstName} {follows.followed.lastName} (@
      {follows.followed.username})
    </Link>
  ))}
</div>

<h2>User Reviews</h2>
      <ul className="list-group">
        {reviews.map((review, index) => (
          <li key={index} className="list-group-item">
            <p>{review.reviewText}</p>
            <Link to={`/project/search/details/${review.songId}`}>View Song</Link>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default UserDetails;





