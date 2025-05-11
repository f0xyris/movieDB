import React, { useEffect, useState } from "react";
import hero from "./assets/hero-img.png";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [search, setSearch] = useState("");
  const [movie, setMovie] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [deboubceSearch, setDeboubceSearch] = useState("");

  useDebounce(() => setDeboubceSearch(search), 500, [search]);

  async function fetchMovies(query = "") {
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();
      setMovie(data.results);
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function loadTrendingMovies() {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchMovies(deboubceSearch);
  }, [deboubceSearch]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <h1>
              <img src={hero} />
              Find <span className="text-gradient">movies</span> You'll enjoy
              without the hassle
            </h1>
            <Search search={search} setSearch={setSearch} />
          </header>

          {trendingMovies.length > 0 && (
            <section className="trending">
              <h2>Trending movies</h2>
              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="all-movies">
            <h2>All movies</h2>
            <ul>
              {movie.map((item) => (
                <MovieCard key={item.id} item={item} />
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
