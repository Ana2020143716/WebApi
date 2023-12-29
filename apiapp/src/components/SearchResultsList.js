import React from "react";

import './SearchResultsList.css';

export const SearchResultsList = ({ results }) => {
    return (
        <div className="results-list">
            {
                results && Array.isArray(results) &&
                results.map((result, id) => (
                    <div key={id} className="result">
                        <p className="title">{result.title}</p>
                 
                        <a href={result.edmIsShownAt} target="_blank" rel="noopener noreferrer">
                            <img src={result.edmPreview} alt={result.title} />
                        </a>
                        <p>{result.provider}</p>
                        <p>{result.country}, {result.timestamp_created}</p>
                
                    </div>
                ))
            }
        </div>
    );
};
