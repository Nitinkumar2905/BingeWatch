import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation()
    

  return (
    <>
      <div className="sticky top-0 z-50 flex items-center shadow-sm shadow-black bg-sky-700 h-20 w-full" style={{fontFamily:"Georgia"}}>
        <div className="text-white w-[95%] flex mx-auto items-center h-16 justify-between">
            {/* logo */}
            <div className="">
                {/* <img src="" alt="logo" /> */}
                <Link to="/"><span className="text-2xl">BingeWatch</span></Link>
            </div>
            {/* navlinks */}
            <div className="space-x-5 text-lg">
                <Link className={`hover:text-black duration-300 ease-in-out ${location.pathname==="/movies/popular"?"underline":""} underline-offset-[5px]`} to="/movies/popular">Popular</Link>
                <Link className={`hover:text-black duration-300 ease-in-out ${location.pathname==="/movies/top_rated"?"underline":""} underline-offset-[5px]`} to="/movies/top_rated">Top rated</Link>
                <Link className={`hover:text-black duration-300 ease-in-out ${location.pathname==="/movies/upcoming"?"underline":""} underline-offset-[5px]`} to="/movies/upcoming">Upcoming</Link>
            </div>
            {/* search bar */}
            <div className="flex items-center">
                <div className="space-x-4">
                    <input className="text-black w-60 py-2 px-4 rounded-lg outline-none focus-within:placeholder:text-sky-700" type="text" id="search" placeholder="Type here to search"/>
                    <button className="border-[1px] border-black py-2 px-4 rounded-lg shadow-sm shadow-black">Search</button>
                </div>
                {/* modes */}
                {/* <div className=""></div> */}
            </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
