import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [joke, setJoke] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchRandomJoke = () => {
    triggerAnimation();
    fetch('/jokes/random')
      .then(response => response.json())
      .then(data => {
        setJoke(data);
        setHasLiked(false); // Resetujemy informację o polubieniu przy każdym nowym losowaniu żartu
        resetAnimation();
      })
      .catch(error => {
        console.error('Błąd:', error);
        resetAnimation();
      });
  };

  const likeJoke = (id) => {
    if (!hasLiked) { // Sprawdzamy, czy użytkownik już polubił ten żart w tej sesji
      triggerAnimation();
      fetch(`/jokes/${id}/like`, {
        method: 'POST',
      })
        .then(response => response.json())
        .then(updatedJoke => {
          setJoke(updatedJoke);
          setHasLiked(true); // Ustawiamy, że użytkownik polubił żart
          resetAnimation();
        })
        .catch(error => {
          console.error('Błąd:', error);
          resetAnimation();
        });
    }
  };

  const triggerAnimation = () => {
    setIsAnimating(true);
  };

  const resetAnimation = () => {
    setTimeout(() => setIsAnimating(false), 300); // Reset animacji po 300ms
  };

  useEffect(() => {
    fetchRandomJoke();
  }, []);

  return (
    <div className={`App ${isAnimating ? 'animating' : ''}`}>
      <h1>Losowy Żart</h1>
      {joke && (
        <div>
          <p className="fade-in">{joke.content}</p>
          <p>Liczba polubień: {joke.likes}</p>
          <button 
            onClick={() => likeJoke(joke.id)} 
            disabled={hasLiked} // Przycisk jest wyłączony, jeśli użytkownik już polubił ten żart
          >
            Polub
          </button>
          <button onClick={fetchRandomJoke}>Pokaż inny żart</button>
        </div>
      )}
    </div>
  );
}

export default App;
