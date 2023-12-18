// src/components/EuropeanaList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // ...
const [titleSearchTerm, settitleSearchTerm] = useState('');
const [uniqueCountries, setUniqueCountries] = useState([]);

// ...


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://www.europeana.eu/api/v2/search.json?wskey=amotians&query=art`
      );
  
      if (response.data && response.data.items) {
        const updatedItems = response.data.items.map((item) => ({
          ...item,
          title: item.title && item.title.length > 0 ? item.title[0] : 'No Title',
          dcCreator: item.dcCreator && item.dcCreator.length > 0 ? item.dcCreator[0] : 'No Title'
        }));
  
        updatedItems.sort((a, b) => a.title.localeCompare(b.title));
        setItems(updatedItems);
  
        // Extrai países exclusivos
        const countries = Array.from(new Set(updatedItems.map((item) => item.title)));
        setUniqueCountries(countries);
      } else {
        console.error('API response does not contain items');
      }
    } catch (error) {
      console.error('Error fetching data from Europeana', error);
    }
  };
  

  const handleSearch = () => {
    // Cria uma cópia dos itens originais
    let filteredItems = [...items];
  
    // Filtra os itens com base no termo de pesquisa por título
    if (searchTerm) {
      filteredItems = filteredItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    // Filtra novamente com base no termo de pesquisa por país
    if (titleSearchTerm) {
      filteredItems = filteredItems.filter((item) =>
        item.title && typeof item.title === 'string' &&
        item.title.toLowerCase().includes(titleSearchTerm.toLowerCase())
      );
    }
  
    // Atualiza a lista de itens com base no resultado da pesquisa
    setItems(filteredItems);
  };
  
  

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleReset = () => {
    // Reseta a lista de itens para a original
    fetchData();
    setSearchTerm('');
    settitleSearchTerm('');
  };
  

  return (
    <div>
      <h1>Europeana Resources</h1>
      {/* Adiciona campo de pesquisa */}
      <div className='search'>
  <input
    type="text"
    placeholder="Search by title"
    value={searchTerm}
    onChange={handleInputChange}
  />
<select onChange={(e) => settitleSearchTerm(e.target.value)}>
  <option key="all" value="">All Countries</option>
  {uniqueCountries.map((title) => (
    <option key={title} value={title}>
      {title}
    </option>
  ))}
</select>


  <button onClick={handleSearch} className='searchButton'>Search</button>
  <button onClick={handleReset}>Reset</button>
</div>


      {/* <div className="list">
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <p>{item.title}</p>
            </li>
          ))}
        </ul>
      </div> */}

<div className="list">
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <a href={item.edmIsShownAt} target="_blank" rel="noopener noreferrer">
          <img src={item.edmPreview} alt={item.title} />
        </a>
        <h3>{item.title}</h3>
        <p>From {item.country}</p>
        <p>{item.provider}</p>
        <p>{item.dcCreator}</p>
      </li>
    ))}
  </ul>
</div>

    </div>
  );
};

export default App;
