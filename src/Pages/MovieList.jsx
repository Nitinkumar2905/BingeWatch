import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";

const MovieList = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { type } = useParams();

  const updateData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${
          type ? type : "popular"
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
        console.log(data.results);
        setMovieData(data.results);
        setLoading(false);
      } else {
        console.log("network error");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    updateData();
  }, [type]);

  return (
    <>
      {/* {!loading ? ( */}
        <div className="m-4 space-y-4" style={{ fontFamily: "georgia" }}>
          <span
            style={{ textTransform: "capitalize" }}
            className="text-3xl font-semibold"
          >
            {type ? type : "popular"}
          </span>
          <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movieData.map((data) => {
              return (
                <>
                <div>

                  {!data ? (
                    <SkeletonTheme
                    baseColor="#202020"
                    highlightColor="#444"
                    >
                      <Skeleton height={300} duration={2}></Skeleton>
                    </SkeletonTheme>
                  ) : (
                    <Link to={`/movie/${data.id}`}>
                      <img
                        className="shadow-sm h-84 shadow-black rounded-lg"
                        src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                        alt=""
                        />
                    </Link>
                  )}
                  <div className="my-3 flex flex-col">
                          <Link
                            to={`/movie/${data.id}-${data.title}`}
                            className="hover:underline duration-200"
                          >
                            {data.title
                              ? data.title.length > 30
                                ? `${data.title.slice(0, 30)}...`
                                : data.title
                              : ""}
                          </Link>
                          <div className="flex justify-between">
                            <span className="">{data.release_date}</span>
                            <span>
                              {data.vote_average
                                ? `${Math.round(data.vote_average * 10) / 10}`
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
      {/* ) : ( */}
        {/* <span className="flex justify-center items-center h-fit my-12"> */}
          {/* loadin.g data */}
        {/* </span> */}
      {/* )} */}
    </>
  );
};

export default MovieList;
