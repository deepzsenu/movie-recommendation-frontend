import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [userId, setUserId] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [hybridRecommendations, setHybridRecommendations] = useState([]);
  const [error, setError] = useState('');

  const getRecommendations = async () => {
    try {
      const response = await axios.get('https://movie-recommendation-system-m1q9.onrender.com/recommend', {
        params: {
          user_id: userId,
          movie_title: movieTitle,
        },
      });
      setRecommendedMovies(response.data.recommended_movies);
      setHybridRecommendations(response.data.hybrid_recommendations);
      setError('');
    } catch (err) {
      setError('Error fetching recommendations. Please make sure the movie title is correct.');
      setRecommendedMovies([]);
      setHybridRecommendations([]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Recommendation System</h1>
      </header>
      <p> <span>Eg. </span> user id '1' movie-tittle 'Toy Story (1995)'</p>
      <div className="form-container">
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Movie Title"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <button onClick={getRecommendations}>Get Recommendations</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="results-container">
        <h2>Recommended Movies</h2>
        <ul>
          {recommendedMovies.map((movie, index) => (
            <li key={index}>
              {movie.title} (Distance: {movie.distance.toFixed(2)})
            </li>
          ))}
        </ul>
        <h2>Hybrid Recommendations</h2>
        <ul>
          {hybridRecommendations.map((movie, index) => (
            <li key={index}>
              {movie.title} (Score: {movie.score.toFixed(2)})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
