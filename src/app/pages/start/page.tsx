import Link from 'next/link';
import './StartScreen.css';



const StartScreen = () => {
  return (
    <div className='start'>
      <h1>Jogo de Palavras</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <Link href={'/pages/game'}>
        <button>Começar o jogo</button>
      </Link>
    </div>
  );
}

export default StartScreen;
