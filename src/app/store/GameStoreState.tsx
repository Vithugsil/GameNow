// src/store/useGameStore.ts
import { create } from 'zustand';
import { wordsList } from '../data/words';

interface GameStoreState {
    letter: string;
    pickedWord: string;
    pickedCategory: string;
    letters: string[];
    guessedLetters: string[];
    wrongLetters: string[];
    guesses: number;
    score: number;
    words: { [key: string]: string[] };
    verifyLetter: (letter: string) => void;
    resetGame: () => void;
    startGame: () => void;
    clearLetterStates: () => void;
    pickedWordAndCategory: () => void;
    setLetter: (letter: string) => void;
    setLetters: () => void;
    checkForWin: () => void;
}

export const useGameStore = create<GameStoreState>((set, get) => ({
    letter: '',
    pickedWord: '',
    pickedCategory: '',
    letters: [],
    guessedLetters: [],
    wrongLetters: [],
    guesses: 3,
    score: 0,
    words: wordsList,
    verifyLetter: (letter: string) => {
        const normalizedLetter = letter.toLowerCase();
        const { guessedLetters, wrongLetters, letters, guesses } = get();

        if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
            alert("Letra ja utilizada");
            return;
        }

        if (letters.includes(normalizedLetter)) {
            set({ guessedLetters: [...guessedLetters, normalizedLetter] });
        } else {
            set({ wrongLetters: [...wrongLetters, normalizedLetter], guesses: guesses - 1 });
        }
    },
    resetGame: () => {
        set({ guessedLetters: [], wrongLetters: [], guesses: 3, score: 0, letter: '', pickedWord: '', pickedCategory: '' });
    },
    startGame: () => {
        const { setLetters, pickedWordAndCategory, score } = get();
        setLetters();
        pickedWordAndCategory();
        set({ guessedLetters: [], wrongLetters: [], guesses: 3, score: score });
    },

    clearLetterStates: () => set({ guessedLetters: [], wrongLetters: [], letters: [] }),

    pickedWordAndCategory: () => {
        const { words, setLetters } = get();
        const categories = Object.keys(words);
        const category = categories[Math.floor(Math.random() * categories.length)];
        const word = words[category][Math.floor(Math.random() * words[category].length)];
        set({ pickedWord: word, pickedCategory: category });
        setLetters();
    },
    setLetter: (newLetter: string) => set({ letter: newLetter }),
    setLetters: () => {
        const { pickedWord } = get();
        set({ letters: pickedWord.toLowerCase().split('') });
    },
    checkForWin: () => {
        const { letters, guessedLetters, startGame, score } = get();
        const uniqueLetters = Array.from(new Set(letters));
        if (guessedLetters.length === uniqueLetters.length && uniqueLetters.length > 0) {
            set({ score: score + 100 });
            startGame();
        }
    }
}));
