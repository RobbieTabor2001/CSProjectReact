import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link
import * as Client from './users/client'; 
import * as searchClient from './searchClient';
import './homeStyles.css';

function ProjectHome() {
  const [recentUser, setRecentUser] = useState(null);
  const [followedUserReviews, setFollowedUserReviews] = useState([]);
  const [songs, setSongs] = useState([]);
  const currentUser = useSelector((state) => state.usersReducer.currentUser);

  useEffect(() => {
    const fetchMostRecentUser = async () => {
      try {
        const user = await Client.findMostRecentUser();
        setRecentUser(user);
      } catch (error) {
        console.error('Error fetching recent user', error);
      }

    };

    const fetchReviews = async () => {
      if (currentUser) {
        try {
          const reviews = await searchClient.fetchFollowedUserReviews(currentUser._id);
          setFollowedUserReviews(reviews);
        } catch (error) {
          console.error('Error fetching reviews', error);
        }
      }
    };
    const fetchSongs = async () => {
      try {
        const fetchedSongs = await searchClient.fetchAllSongs();
        setSongs(fetchedSongs);
      } catch (error) {
        console.error('Error fetching songs', error);
      }
    };

    fetchMostRecentUser();
    fetchReviews();
    fetchSongs();
  }, [currentUser]);

  return (
    <div className="home-container">
      <h1>Welcome to the Project Home Page</h1>
      {recentUser && (
        <p>Welcome, {recentUser.firstName} {recentUser.lastName} ({recentUser.role})!</p>
      )}
      <p>This is the main page of the project. Feel free to explore the features.</p>
      
      <section className="section-reviews">
        <h2>Reviews from Followed Users</h2>
        {currentUser && followedUserReviews.length > 0 ? (
          <ul className="reviews-list">
            {followedUserReviews.map((review, index) => (
              <li key={index} className="review-item">
                <strong>{review.userName}</strong>: {review.reviewText} <span className="song-id">(Song ID: {review.songId})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews to display. Follow users to see their reviews here.</p>
        )}
      </section>

      <section className="section-songs">
        <h2>All Songs</h2>
        {songs.length > 0 ? (
          <ul className="songs-list">
            {songs.map((song, index) => (
              <li key={index} className="song-item">
                <div className="song-info">
                  <strong>{song.name}</strong> by {song.artist}
                </div>
                <Link to={`/project/search/details/${song.trackId}`} className="view-details-button">
                   View Details
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No songs available.</p>
        )}
      </section>
    </div>
  );
}

export default ProjectHome;