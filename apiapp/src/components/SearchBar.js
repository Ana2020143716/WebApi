import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

import './SearchBar.css';

export const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("");
    const [originalResults, setOriginalResults] = useState([]); //as obras mostradas por defeito
    const [orderBy, setOrderBy] = useState("original"); //ordem por defeito

    useEffect(() => {
        //para mostrar logo as obras
        fetchData();
    }, []);

    const fetchData = () => {
        let apiUrl = `https://www.europeana.eu/api/v2/search.json?wskey=amotians&query=art`;
        
        fetch(apiUrl)
            .then((response) => response.json())
            .then(json => {
                if (json && json.items && Array.isArray(json.items)) {
                    const results = json.items
                        .filter(item => item.title && Array.isArray(item.title) && item.title.length > 0)
                        .map(item => {
                          const date = new Date(item.timestamp_created);
                          const formattedDate = date.toLocaleDateString(); // Extracts and formats only the date
                  
                          return {
                              title: item.title[0],
                              provider: item.provider && Array.isArray(item.provider) ? item.provider[0] : 'Unknown Provider',
                              edmPreview: item.edmPreview && Array.isArray(item.edmPreview) ? item.edmPreview[0] : null,
                              edmIsShownAt: item.edmIsShownAt && Array.isArray(item.edmIsShownAt) ? item.edmIsShownAt[0] : null,
                              country: item.country && Array.isArray(item.country) ? item.country[0] : 'Unknown Country',
                              timestamp_created: formattedDate, // Use formatted date
                              // Add other properties you want to include
                          };
                      });

                    setResults(results);
                    setOriginalResults(results);//dar update depois dos filtros
  
                } else {
                    setResults([]);
                    setOriginalResults([]);
               
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setResults([]);
                setOriginalResults([]);
          
            });
    };

    const handleOrderByChange = (value) => {//a ordenação das obras
        setOrderBy(value);

        let sortedResults = [...originalResults];
        
        if (value === "alphabetical") { //por ordem alfabetica
            sortedResults = [...originalResults].sort((a, b) => a.title.localeCompare(b.title));
            setResults(sortedResults);
        }
        if (value === "date") {//por data
          sortedResults = [...originalResults].sort((a, b) => new Date(a.timestamp_created) - new Date(b.timestamp_created));
          setResults(sortedResults);
      }
        if (value === "original") {//ordem original
          setResults(originalResults);
      }

      setResults(sortedResults);

    };

    const handleChange = (value) => {//filtro do titulo
      setInput(value);

      let filteredResults = [...originalResults];

      if (value) {
          filteredResults = filteredResults.filter((result) =>
              result.title.toLowerCase().includes(value.toLowerCase())
          );
      }
      setResults(filteredResults);
    };

    return (
      <div className="filter">
        <div className="input-text">
            <FaSearch id="search-icon" />
            <input
                placeholder="Procura pelo título..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
            
        </div>
        <label className="order">
                Ordenar: 
                <select class="options" value={orderBy} onChange={(e) => handleOrderByChange(e.target.value)}>
                    <option value="original">Original</option>
                    <option value="alphabetical">Alfabeto</option>
                    <option value="date">Data</option>
                    
                </select>
            </label>
      </div>

    );
};
