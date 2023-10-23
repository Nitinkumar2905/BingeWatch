import React, { useEffect } from "react";

const Search = () => {
  const allMoviesData = async () => {
    try {
        const response = await fetch(
            "https://api.themoviedb.org/3/trending/all/day?language=en-US",
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
            const data = await response.json()
            console.log(data)
          }
    } catch (error) {
        
    }
  };

  useEffect(()=>{
    allMoviesData()
  },[])
  return <div></div>;
};

export default Search;
