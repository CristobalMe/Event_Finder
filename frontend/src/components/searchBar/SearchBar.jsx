import React, { useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="topnav">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
