import { useMovie } from "../context/MovieContext";

import MovieCard from "./MovieCard";

const MovieList = () => {
  const { movies, loading } = useMovie();

  if (loading) {
    return <p data-testid="loading">Loading movies...</p>;
  }

  if (movies.length === 0) {
    return (
      <p className="no-movies" data-testid="no-movies">
        No movies available
      </p>
    );
  }

  const completeMovies = movies.filter(
    (movie) => movie.title && movie.year && movie.genre
  );

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <input type="search" placeholder="Search" />
        <button>Search</button>
      </div>
      <div className="movie-list" data-testid="movie-list">
        {completeMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
