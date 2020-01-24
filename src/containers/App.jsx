import React, { useState, useEffect } from "react";
import VideoList from "./VideoList";
import SearchBar from "../components/SearchBar";
import VideoDetail from "../components/VideoDetail";
import Video from "../components/Video";
import axios from "axios";
import "../styles/style.css";
import isEmpty from "../utils/isEmpty";

export default function App() {
  const [movies, setMovies] = useState([]); // Most popular movies
  const [keyPrimeMovie, setPrimeMovieKey] = useState({});
  const [primeMovie, setPrimeMovie] = useState([]); // List of 5 movies after the most popular

  //API URL
  const API_END_POINT = "https://api.themoviedb.org/3/";
  const POPULAR_MOVIES_URL = "discover/movie?sort_by=popularity.desc&page=1";
  const API_KEY = "api_key=383fad9661a33d6164b48dd1309a05cd";

  // Requet API. Want to know more ? https://www.robinwieruch.de/react-hooks-fetch-data
  //Function that fetch current popular movies and set a primemovie(with trailer)
  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await axios(
          `${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`
        );
        setMovies(res.data.results.slice(1, 6));
        //console.log("premmier call de set movie", res.data.results.slice(0, 1));
        const tabPrimeMovie = res.data.results.slice(0, 1);
        setPrimeMovie(tabPrimeMovie[0]);
      } catch (e) {
        console.log(e);
        throw e;
      }
    }

    fetchMovies();
  }, []);

  //Second function that get a movie
  useEffect(() => {
    async function setVideoKey(movie) {
      try {
        const res = await axios(
          `${API_END_POINT}movie/${movie.id}?append_to_response=videos&${API_KEY}`
        );
        setPrimeMovieKey(res.data.videos.results[0].key);
      } catch (e) {
        console.log(e);
        throw e;
      }
    }

    if (!isEmpty(primeMovie)) {
      setVideoKey(primeMovie);
    }
  }, [primeMovie]);

  const receiveMovie = movie => {
    setPrimeMovie(movie);
  };

  return (
    <section>
      <div className="searchbar">
        <SearchBar />
      </div>
      <div className="row">
        <div className="col-md-8">
          <Video moviekey={keyPrimeMovie} />
          <VideoDetail
            title={primeMovie.original_title}
            description={primeMovie.overview}
          />
        </div>
        <div className="col-md-4">
          <VideoList sendMovie={receiveMovie} movies={movies} />
        </div>
      </div>
    </section>
  );
}
