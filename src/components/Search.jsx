import React from "react";
import searchImg from "../assets/search.svg";

function Search({ search, setSearch }) {
  return (
    <div className="search">
      <div>
        <img src={searchImg} alt="" />
        <input
          type="text"
          placeholder="Search fore a movie"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Search;
