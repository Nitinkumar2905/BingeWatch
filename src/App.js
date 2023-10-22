import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import MovieList from "./Pages/MovieList";
import MovieCard from "./Components/MovieCard";

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route exact index element={<Home/>} />
          <Route exact path="/movies/:type" element={<MovieList/>} />
          <Route exact path="/movie/:id" element={<MovieCard/>}/>
        </Routes>
      </Router>
  );
}

export default App;
