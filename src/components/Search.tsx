"use client";

import React from "react";
import Image from "next/image";

const Search = ({
  search,
  setSearch,
  className,
}: {
  search: string;
  setSearch: (value: string) => void;
  className?: string;
}) => {
  return (
    <div className="relative">
      <input
        value={search}
        type="text"
        className={`border border-gray-200 ${className} w-full rounded-full text-xs lg:text-base`}
        placeholder="Search for healthcare by name, address or state"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2"
        onClick={() => {
          location.href = "/search";
        }}
      >
        <div className="relative h-5 w-5 lg:h-7 lg:w-7">
          <Image src="/search.png" alt="search" fill />
        </div>
      </button>
    </div>
  );
};

export default Search;
