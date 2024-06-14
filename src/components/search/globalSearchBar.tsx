"use client";
import React, { useState } from 'react';

import GlobalSearchDelegate from './GlobalSearchDelegate';
import { SalesProvider } from '~/providers/salesContext';


const GlobalSearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);


    const handleSearchClick = () => {
        setIsSearching(true);
    };

    return (
        <SalesProvider>
            <div className="w-full h-14">
                <div className="w-full h-full bg-gray-100 border border-gray-200 rounded-lg flex items-center px-2">
                    <img src="/assets/icons/search.png" alt="Search" className="w-6 h-6" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onClick={handleSearchClick}
                        className="flex-grow bg-transparent outline-none px-2"
                        placeholder="Search for products, stores ..."
                    />
                </div>
                {isSearching && (
                    <div className="absolute top-16 left-0 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <GlobalSearchDelegate query={query} onClose={() => setIsSearching(false)} />
                    </div>
                )}
            </div>
        </SalesProvider>
    );
};

export default GlobalSearchBar;
