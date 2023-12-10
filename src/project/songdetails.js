import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { saveReview, fetchSongDetails, fetchSongReviews } from './searchClient';
import { Link } from 'react-router-dom';
import './songDetailsStyles.css';

function SongDetails() {
  const { id } = useParams();
  const [review, setReview] = useState('');
  const [songDetails, setSongDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const currentUser = useSelector((state) => state.usersReducer.currentUser);

  useEffect(() => {
    const loadSongDetails = async () => {
      try {
        const details = await fetchSongDetails(id);
        setSongDetails(details);
      } catch (error) {
        console.error('Error loading song details:', error);
      }
    };

    const loadReviews = async () => {
      try {
        const songReviews = await fetchSongReviews(id);
        setReviews(songReviews);
      } catch (error) {
        console.error('Error loading reviews:', error);
      }
    };

    loadSongDetails();
    loadReviews();
  }, [id]);

  const handleReviewSubmit = async () => {
    if (!currentUser) {
      alert('You must be signed in to post a review.');
      return;
    }

    try {
      const reviewData = {
        userId: currentUser._id, // Assuming currentUser has an id field
        songId: id,
        reviewText: review,
        userName: currentUser.userName
      };
      await saveReview(reviewData);
      console.log('Review submitted:', review);
      setReview('');
      // Reload reviews to include the new one
      try {
        const songReviews = await fetchSongReviews(id);
        setReviews(songReviews);
      } catch (error) {
        console.error('Error loading reviews:', error);
      }
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  return (
    <div className="song-details-container">
      <h1>Song Details</h1>
      {songDetails && (
        <div className="song-info">
          <p><strong>Title:</strong> {songDetails.name}</p>
          <p><strong>Artist:</strong> {songDetails.artist}</p>
          <p><strong>Album:</strong> {songDetails.album}</p>
          <p><strong>Release Date:</strong> {songDetails.releaseDate}</p>
          <p className="song-duration"><strong>Duration:</strong> {(songDetails.durationMs / 60000).toFixed(2)} minutes</p>
          {songDetails.previewUrl && <a href={songDetails.previewUrl} target="_blank" rel="noopener noreferrer">Preview Song</a>}
        </div>
      )}
      
      <div className="reviews-section">
        <h2>Reviews</h2>
        <ul className="reviews-list">
          {reviews.map((review, index) => (
            <li key={index} className="review-item">
              <p className="review-text">{review.reviewText}</p>
              <Link to={`/project/users/${review.userId._id}`} className="review-user-link">{review.userId.username}</Link>
            </li>
          ))}
        </ul>
      </div>

      {currentUser && (
        <div className="review-form">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write a review..."
            className="review-textarea"
          ></textarea>
          <button onClick={handleReviewSubmit} className="submit-review-button">Submit Review</button>
        </div>
      )}
    </div>
  );
}

export default SongDetails;
