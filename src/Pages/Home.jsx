import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import Search from "../SearchMovies/Search";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const updateData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZWI1NWUyN2RjMTdkNDVjNDViM2Q3NGQ5ZjMzZDg2OCIsInN1YiI6IjY1MmQ5MjE0MGNiMzM1MTZmODg0NzFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2NNwlH4pu5jdkXeyvHRgmo4dJPW_vwvTB-a_BlLTyls",
        },
      }
    );

    const data = await response.json();
    console.log(data.results);
    setPopularMovies(data.results);
    setTotalPages(data.total_pages);
  };

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
    updateData(page + 1);
  };

  const handlePreviousClick = () => {
    setPage((prevPage) => prevPage - 1);
    updateData(page - 1);
  };
  useEffect(() => {
    updateData();
    // setPage(1)
  }, [page]);
  return (
    <>
      <div className="w-fit mx-auto" style={{ fontFamily: "Georgia" }}>
        <Search></Search>

        <Carousel
          //   width={1200}
          showThumbs={false}
          autoPlay={true}
          transitionTime={5}
          infiniteLoop={true}
          showStatus={false}
          useKeyboardArrows={true}
        >
          {popularMovies?.map((movie, key) => {
            return (
              <>
                <Link
                  key={movie.id}
                  className="relative"
                  to={`/movie/${movie.id}`}
                >
                  <div className="h-[80vh] mx-auto">
                    <img
                      className="w-full"
                      src={`https://image.tmdb.org/t/p/original/${
                        movie && movie.backdrop_path
                      }`}
                      alt=""
                    />
                  </div>
                  <div className="w-[90%] absolute flex flex-col bottom-14 p-10 text-white bg-black mx-10 bg-opacity-20 rounded-lg">
                    <div className="flex flex-col items-start">
                      <span className="text-xl font-bold">
                        {movie && movie.title}
                      </span>
                      <div className="space-y-2">
                        <div className="space-x-6">
                          <span>{movie.release_date}</span>
                          <span>Vote({movie.vote_count})</span>
                        </div>
                      </div>
                      <div className="text-start">
                        {movie
                          ? movie.overview > 20
                            ? `${movie.overview.slice(0, 20)}...`
                            : movie.overview
                          : ""}
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
        </Carousel>

        <div className="my-6 mx-4 space-y-8">
          <div className="flex justify-between mx-1">
            <span className="text-3xl font-semibold">Popular Movies</span>
            <span className="shadow-sm shadow-black rounded-lg px-3 py-1">Page: {page}/{totalPages}</span>
            <div className="space-x-4 text-white">
              <button
                className={`shadow-sm shadow-black rounded-lg px-3 py-1 ${
                  page > 1 ? "bg-sky-700" : "bg-sky-900"
                } ${page>1?"cursor-pointer":"cursor-not-allowed"}`}
                disabled={page<=1}
                onClick={handlePreviousClick}
              >
                Previous
              </button>
              <button
                className={`shadow-sm shadow-black rounded-lg px-3 py-1 ${
                  page <= totalPages ? "bg-sky-700" : "bg-sky-900"
                } ${page<=totalPages?"cursor-pointer":"cursor-not-allowed"}`}
                disabled={page>=totalPages}
                onClick={handleNextClick}
              >
                Next
              </button>
            </div>
          </div>
          <div className="my-4 grid gap-6 grid-flow-row grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-col-6">
            {popularMovies &&
              popularMovies.map((movie) => {
                return (
                  <>
                    <div className="space-y-3">
                      <Link className="w-fit" to={`/movie/${movie.id}`}>
                        <div className="hover:scale-105 duration-500 ease-in-out ">
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
                              ? `${Math.round(movie.vote_average * 10) / 10}`
                              : 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
