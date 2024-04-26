'use client'
import Link from 'next/link';
import './GameOver.css';
import { useEffect, useState } from 'react';


const GameOver = () => {
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const scoreFromStorage = localStorage.getItem('score');
    if (scoreFromStorage) {
      setScore(parseInt(scoreFromStorage, 10));
    }
  }, []);

  return (
    <div className='container'>
      <h1>Fim de jogo!</h1>
      <h2>A sua pontuação foi: <span>{score}</span></h2>
      <Link href={"/pages/game"}>
        <button>Reiniciar</button>
      </Link>
    </div>
  );
}

export default GameOver;
