import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';

function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    fetch('/jokes')
      .then(response => response.json())
      .then(data => setJokes(data))
      .catch(error => console.error('Błąd:', error));
  }, []);

  return (
    <div className="App">
      <h1>Lista żartów</h1>
      <ul>
        {jokes.map(joke => (
          <li key={joke.id}>{joke.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
