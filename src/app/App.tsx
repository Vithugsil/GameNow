'use client'

import { useCallback, useEffect, useState } from 'react';
import StartScreen from './pages/start/page';
import Game from './pages/game/page';
import GameOver from './pages/gameover/page';
import './App.css';


const App = () => {
  
  return (
    <div >
      <StartScreen/>
    </div>
  );
};

export default App;
