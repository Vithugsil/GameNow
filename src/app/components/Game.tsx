'use client'

import { useState, useRef, FormEvent } from 'react';
import './Game.css';

interface GameProps {
  verifyLetter: (letter: string) => void;
  pickedWord: string;
  pickedCategory: string;
  letters: string[];
  guessedLetters: string[];
  wrongLetters: string[];
  guesses: number;
  score: number;
}

const Game: React.FC<GameProps> = ({
  verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score,
}) => {
  const [letter, setLetter] = useState<string>("");
  const letterInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    verifyLetter(letter);
    setLetter("");
    letterInputRef.current?.focus();
  };

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
          <button>Jogar!</button>
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
