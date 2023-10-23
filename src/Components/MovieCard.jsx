import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const MovieCard = () => {
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const { id } = useParams();

  const updateData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${
          id ? id : "385687"
        }?language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZWI1NWUyN2RjMTdkNDVjNDViM2Q3NGQ5ZjMzZDg2OCIsInN1YiI6IjY1MmQ5MjE0MGNiMzM1MTZmODg0NzFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2NNwlH4pu5jdkXeyvHRgmo4dJPW_vwvTB-a_BlLTyls",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMovieDetails(data);
      } else {
        console.log("network error");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    updateData();
    window.scrollTo(0, 0);
  }, [id]);

  const similarMovieData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${
          id ? id : "385687"
        }/similar?language=en-US&page=${page}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZWI1NWUyN2RjMTdkNDVjNDViM2Q3NGQ5ZjMzZDg2OCIsInN1YiI6IjY1MmQ5MjE0MGNiMzM1MTZmODg0NzFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2NNwlH4pu5jdkXeyvHRgmo4dJPW_vwvTB-a_BlLTyls",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRecommended(data.results);
        setTotalPages(data.total_pages);
      } else {
        console.log("network error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
    similarMovieData(page + 1);
    console.log(page);
  };

  const handlePreviousClick = () => {
    setPage((prevPage) => prevPage - 1);
    similarMovieData(page - 1);
    console.log(page);
  };
  useEffect(() => {
    similarMovieData();
    // localStorage.setItem('currentPage',page)
    // eslint-disable-next-line
  }, [page]);

  const handleCardClick = (clickedMovieId) => {
    const updatedRecommended = recommended.filter(
      (movie) => movie.id !== clickedMovieId
    );
    setRecommended(updatedRecommended);
  };

  return (
    <>
      {movieDetails && (
        <div style={{ fontFamily: "georgia" }}>
          {movieDetails.title ? (
            <div className="flex space-x-4 w-5/6 mx-auto my-20">
              <div>
                <img
                  className="rounded-md h-96 w-80"
                  src={`https://image.tmdb.org/t/p/original/${
                    movieDetails && movieDetails.poster_path
                  }`}
                  alt=""
                />
              </div>
              <div className="space-y-2 flex justify-center items-start flex-col border-0 border-black w-fit">
                <span className="font-semibold text-2xl">
                  {movieDetails && movieDetails.title}
                </span>

                <span>{movieDetails && movieDetails.overview}</span>

                <div className="flex flex-col">
                  {movieDetails.release_date && (
                    <span className="text-lg">
                      Released: {movieDetails && movieDetails.release_date}
                    </span>
                  )}
                  {movieDetails.vote_average && (
                    <span className="text-lg">
                      Rating: {movieDetails && movieDetails.vote_average}
                    </span>
                  )}
                  {/* <span>{movieDetails && movieDetails.original_language}</span> */}
                  {movieDetails.runtime && (
                    <span className="text-lg">
                      Duration: {movieDetails && movieDetails.runtime}m
                    </span>
                  )}
                  {movieDetails.genres && (
                    <div className="text-lg">
                      Genre: &nbsp;
                      {movieDetails && movieDetails.genres
                        ? movieDetails.genres.map((genre) => (
                            <span key={genre.id} className="mr-1">
                              {genre.name},
                            </span>
                          ))
                        : null}
                    </div>
                  )}
                  {movieDetails.production_countries && (
                    <div className="text-lg">
                      Countries:{" "}
                      {movieDetails && movieDetails.production_countries
                        ? movieDetails.production_countries.map((countries) => (
                            <span key={countries.iso_3166_1}>
                              {countries.name}
                            </span>
                          ))
                        : null}
                    </div>
                  )}
                  {movieDetails.production_companies && (
                    <div className="text-lg">
                      Production:{" "}
                      {movieDetails && movieDetails.production_companies
                        ? movieDetails.production_companies.map(
                            (production) => (
                              <span key={production.id}>
                                {production.name},{" "}
                              </span>
                            )
                          )
                        : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <span className="flex justify-center h-[32rem] items-center">
              loading
            </span>
          )}

          <div className="my-6 mx-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                {recommended ? (
                  recommended.length > 0 ? (
                    <span className="text-3xl font-semibold">
                      You may also like
                    </span>
                  ) : (
                    ""
                  )
                ) : (
                  "loading"
                )}
              </div>
              <span className="shadow-sm shadow-black px-3 py-1 rounded-lg">
                Page: {page}/{totalPages}
              </span>
              <div className="space-x-4 text-white">
                <button
                  className={`shadow-black shadow-sm px-3 py-1 rounded-lg ${
                    page > 1 ? "bg-sky-600" : "bg-sky-900"
                  } `}
                  disabled={page <= 1}
                  onClick={handlePreviousClick}
                  style={{
                    cursor: page > 1 ? "pointer" : "not-allowed",
                  }}
                >
                  Previous
                </button>
                <button
                  className={`shadow-black shadow-sm px-3 py-1 rounded-lg ${
                    page <= totalPages ? "bg-sky-600" : "bg-sky-900"
                  }`}
                  disabled={page >= totalPages}
                  onClick={handleNextClick}
                  style={{
                    cursor: page <= totalPages ? "pointer" : "not-allowed",
                  }}
                >
                  Next
                </button>
              </div>
            </div>

            <div className="my-4 grid gap-6 grid-flow-row grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-col-6">
              {recommended &&
                recommended.map((movie) => {
                  return (
                    <>
                      {movie.poster_path && (
                        <div>
                          <Link
                            key={movie.id}
                            className=""
                            to={`/movie/${movie.id}`}
                          >
                            <div
                              className="hover:scale-105 duration-500 ease-in-out"
                              onClick={() => handleCardClick(movie.id)}
                            >
                              <img
                                className={`border-0 border-black shadow-sm shadow-black h-96 rounded-lg`}
                                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                alt=""
                              />
                            </div>
                          </Link>
                          <div className="my-3 flex flex-col">
                            <Link
                              to={`/movie/${movie.id}`}
                              onClick={() => handleCardClick(movie.id)}
                              className="hover:underline duration-200"
                            >
                              {movie.title
                                ? movie.title.length > 30
                                  ? `${movie.title.slice(0, 30)}...`
                                  : movie.title
                                : ""}
                            </Link>
                            <div className="flex justify-between">
                              <span className="">{movie.release_date}</span>
                              <span>
                                {movie.vote_average
                                  ? `${
                                      Math.round(movie.vote_average * 10) / 10
                                    }`
                                  : 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
