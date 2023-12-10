import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { searchSpotifyTracks, saveSong } from './searchClient';
import './searchStyles.css';

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const searchQuery = searchParams.get('query');
        if (searchQuery) {
            setQuery(searchQuery);
            performSearch(searchQuery);
        }
    }, [searchParams]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearchParams({ query });
        performSearch(query);
    };

    const performSearch = async (searchQuery) => {
        try {
            const data = await searchSpotifyTracks(searchQuery);
            setResults(data.tracks.items);
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

  return (
    <div className="container">
        <h1>Search Spotify</h1>
        <form onSubmit={handleSearch} className="search-form">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for songs"
            />
            <button type="submit">Search</button>
        </form>

        <div className="search-results">
            <ul>
                {results.map((track) => (
                    <li key={track.id} className="track-item">
                        {track.name} by {track.artists.map(artist => artist.name).join(', ')}
                        <Link to={`/project/search/details/${track.id}`} className="view-details-button">
                            View Details
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  );
}

export default Search;
