import './GameOver.css';

interface GameOverProps {
  retry: () => void;
  score: number;
}

const GameOver = ({ retry, score }: GameOverProps) => {
  return (
    <div>
      <h1>Fim de jogo!</h1>
      <h2>A sua pontuação foi: <span>{score}</span></h2>
      <button onClick={retry}>Reiniciar</button>
    </div>
  );
}

export default GameOver;
