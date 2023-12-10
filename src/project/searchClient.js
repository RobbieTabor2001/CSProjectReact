// Assuming this code is in a file like client.js or api.js in your React project

import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

const BASE_API_URL = "http://localhost:4000/api"; // Base URL for your API

// Existing users API functions...
// ...

// Function to search Spotify via your Node.js backend
export const searchSpotifyTracks = async (query) => {
  const response = await request.get(`${BASE_API_URL}/search`, {
    params: { query }
  });
  return response.data;
};

export const saveSong = async (songData) => {
    const response = await request.post(`${BASE_API_URL}/songs`, songData);
    return response.data;
  };

  export const saveReview = async (reviewData) => {
    const response = await request.post(`${BASE_API_URL}/reviews`, reviewData);
    return response.data;
  };
  export const fetchFollowedUserReviews = async (currentUserId) => {
    const response = await request.get(`${BASE_API_URL}/followed-user-reviews`, {
      params: { userId: currentUserId }
    });
    return response.data;
  };

  export const fetchSongDetails = async (songId) => {
    const response = await request.get(`${BASE_API_URL}/songs/details/${songId}`);
    return response.data;
  };
  
  export const fetchSongReviews = async (songId) => {
    const response = await request.get(`${BASE_API_URL}/reviews/song/${songId}`);
    return response.data;
  };

  export const fetchUserReviews = async (userId) => {
    const response = await request.get(`${BASE_API_URL}/reviews/user/${userId}`);
    return response.data;
  };
  

  // In your client.js or api.js

export const fetchAllSongs = async () => {
  const response = await request.get(`${BASE_API_URL}/songs`);
  return response.data;
};
