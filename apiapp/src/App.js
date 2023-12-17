// src/components/EuropeanaList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.europeana.eu/api/v2/search.json?wskey=amotians&query=art`
        );
        console.log(items);

        if (response.data && response.data.items) {
          const updatedItems = response.data.items.map((item) => ({
            ...item,
            title: item.title && item.title.length > 0 ? item.title[0] : 'No Title',
          }));

          // Ordena os itens pelo título em ordem alfabética
          updatedItems.sort((a, b) => a.title.localeCompare(b.title));

          setItems(updatedItems);
        }else {
          console.error('API response does not contain items');
        }
      } catch (error) {
        console.error('Error fetching data from Europeana', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Europeana Resources</h1>
      <div className="list">
        <ul>

          {items.map((item) => (
            <li key={item.id}>
              <img src={item.edmPreview} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.country}, {item.provider}</p>
              <p>{item.dataProvider}</p>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default App;
