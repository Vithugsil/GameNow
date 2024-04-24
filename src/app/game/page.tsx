'use client'

import React, { useState, useRef, useCallback } from 'react'
import { wordsList } from '../data/word';
import './Game.css';

const game = () => {
  const [letters, setLetters] = useState<string[]>([]);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setpickedCategory] = useState("");
  const [words] = useState<any>(wordsList);
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef<HTMLInputElement>(null);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);



  const verifyLetter = (inputLetter: string) => {
    const normalizedLetter = inputLetter.toLowerCase();

    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters, normalizedLetter]);
      setScore((currentScore) => currentScore + 10);
      console.log("Correct guess!"); // Debug: Indicate a correct guess
    } else {
      setWrongLetters((actualWrongLetters) => [...actualWrongLetters, normalizedLetter]);
      setGuesses((actualGuesses) => actualGuesses - 1);
      console.log("Wrong guess!"); // Debug: Indicate a wrong guess
    }
  };

  const pickedWordAndCategory = useCallback(() => {
    // pegando uma categoria aleatória
    const categories = Object.keys(words);
    console.log(categories);

    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // pegando uma palavra aleatória
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    console.log(word);

    return { word, category };
  }, [words]);



  const handleSubmit = (e: any) => {
    e.preventDefault();

    verifyLetter(letter)

    setLetter("");

    if (letterInputRef.current != null) {
      letterInputRef.current.focus();
    }
  }

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
        {letters.map((letter: string, i: number) => (
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"> </span>
          )
        ))}
      </div>
      <div className="letterContainer">
        <p>Tente advinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="letter" maxLength={1} required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef} />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLetterContainer">
        <p>Letras já utilizadas</p>
        {wrongLetters.map((letter: string, i: number) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  )
}

export default game