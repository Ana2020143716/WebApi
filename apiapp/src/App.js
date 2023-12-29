import { useState } from 'react';

import { SearchBar } from './components/SearchBar.js';

import { SearchResultsList } from './components/SearchResultsList.js';

import './App.css';

function App() {

  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");

  return (
    <div className="App">
  
        <h1>Art Galery</h1>

      
      <div className="search-bar-container">
         <SearchBar setResults={setResults}/>
          
          <SearchResultsList results={results} input={input}/>


      </div>
    </div>
  );
}

export default App;
