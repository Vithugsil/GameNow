import './StartScreen.css';

interface StartScreenProps {
  startGame: () => void;
}

const StartScreen = ({ startGame }: StartScreenProps) => {
  return (
    <div className='start'>
      <h1>Jogo de Palavras</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button onClick={startGame}>Começar o jogo</button>
    </div>
  );
}

export default StartScreen;
