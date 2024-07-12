"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import GlobalSearchDelegate from "./GlobalSearchDelegate";
import { Search, X } from "lucide-react";

const GlobalSearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const handleSearchClick = () => {
    setIsSearching(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim() !== "") {
      router.push(`/search-results?query=${query}`); // Redirect to search results page
    }
  };

  return (
    <div className="relative h-12 w-full">
      <div className="flex h-full w-full items-center rounded-lg border border-gray-200 bg-gray-100 px-2">
        <Search className="text-primary" strokeWidth={3} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={handleSearchClick}
          onKeyPress={handleKeyPress} // Add event listener for key press
          className="max-w-[270px] flex-grow bg-transparent px-2 outline-none sm:max-w-none"
          placeholder="Search for products, stores ..."
        />
        {query !== "" && (
          <span
            className="mr-2 h-6 w-4 cursor-pointer"
            onClick={() => {
              setQuery("");
              setIsSearching(false);
            }}
          >
            <X />
          </span>
        )}
      </div>
      {isSearching && (
        <div className="absolute left-0 right-0 top-16 z-50 rounded-lg border border-gray-200 bg-white shadow-lg">
          <GlobalSearchDelegate
            query={query}
            onClose={() => setIsSearching(false)}
          />
        </div>
      )}
    </div>
  );
};

export default GlobalSearchBar;
