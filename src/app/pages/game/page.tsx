'use client'

import {  useRef, FormEvent, useEffect } from 'react';
import './Game.css';
import { useGameStore } from '@/app/store/GameStoreState';
import { useRouter } from 'next/navigation';


const Game: React.FC= () => {

  const { 
    score, 
    pickedCategory, 
    guesses, 
    letters, 
    guessedLetters, 
    wrongLetters, 
    verifyLetter, 
    letter, 
    setLetter,
    startGame,
    checkForWin 
  } = useGameStore();

  const letterInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(letter){
      verifyLetter(letter);
    }else{
      console.log('letra não definida');
    }
    setLetter("");
    letterInputRef.current?.focus();
  };

  useEffect(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    checkForWin(); 
  }, [guessedLetters, checkForWin]);

  useEffect(() => {
    if (guesses <= 0) {
      localStorage.setItem('score', score.toString()); 
      router.push('/pages/gameover');
    }
  }, [guesses, router, score]);

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
          <input 
                  type="text" 
                  name="letter" 
                  maxLength={1} 
                  required 
                  onChange={(e) => setLetter(e.target.value)} 
                  value={letter} 
                  ref={letterInputRef} 
            />
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
