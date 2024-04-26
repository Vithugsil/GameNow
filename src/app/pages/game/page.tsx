'use client'

import { useState, useRef, FormEvent, useCallback, useEffect } from 'react';
import './Game.css';
import { wordsList } from '@/app/data/words';
import { useRouter } from 'next/navigation';


interface WordList {
  [key: string]: string[];
}

const Game: React.FC = () => {

  const router = useRouter();
  const [letter, setLetter] = useState<string>("");
  const letterInputRef = useRef<HTMLInputElement>(null);
  const [letters, setLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [words] = useState<WordList>(wordsList);
  const [pickedWord, setPickedWord] = useState<string>("");
  const [pickedCategory, setPickedCategory] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<number>(3);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (guesses <= 0) {
      localStorage.setItem('score', score.toString()); // Salva a pontuação no Local Storage
      router.push('/pages/gameover');
    }
  }, [guesses, router, score]);
  


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    verifyLetter(letter);
    setLetter("");
    letterInputRef.current?.focus();
  };

  const pickedWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    return { word, category };
  }, [words]);

  const startGame = useCallback(() => {
    const { word, category } = pickedWordAndCategory();
    let wordLetters = word.split("").map(l => l.toLowerCase());
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGuessedLetters([]);
    setWrongLetters([]);
    setGuesses(3);  // Reset guesses
  }, [pickedWordAndCategory]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  const verifyLetter = (letter: string) => {
    const normalizedLetter = letter.toLowerCase();
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters(actualGuessedLetters => [...actualGuessedLetters, normalizedLetter]);
    } else {
      setWrongLetters(actualWrongLetters => [...actualWrongLetters, normalizedLetter]);
      setGuesses(actualGuesses => actualGuesses - 1);
    }
  };

  useEffect(() => {
    const uniqueLetters = Array.from(new Set(letters));
    if (guessedLetters.length === uniqueLetters.length && uniqueLetters.length > 0) {
      setScore(actualScore => actualScore + 100);
      startGame();
    }
  }, [guessedLetters, letters]);


  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Advinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
        <p>Você ainda tem {guesses} tentativas...</p>
      </h3>
      <div className="wordContainer">
        {letters.map((l, i) => (
          guessedLetters.includes(l) ? (
            <span key={i} className="letter">{l}</span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        ))}
      </div>
      <div className="letterContainer">
        <p>Tente advinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="letter" maxLength={1} required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef} />
          <button>jogar</button>
        </form>
      </div>
      <div className="wrongLetterContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((l, i) => (
          <span key={i}>{l}, </span>
        ))}
      </div>
    </div>
  );
}

export default Game;
