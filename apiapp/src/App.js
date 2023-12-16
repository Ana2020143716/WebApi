// src/components/EuropeanaList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
          setItems(response.data.items);
        } else {
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
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <img src={item.edmPreview} alt={item.title} />
            <p>{item.title}</p>
            <p>{item.country} {item.provider}</p>
            <p>{item.dcCreator}</p>
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
