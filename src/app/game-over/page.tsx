import React from 'react'
import Link from 'next/link'
import './GameOver.css'

const page = () => {
  return (
    <div>
      <h1>Fim de jogo!</h1>
      <h2>A sua pontuação foi: </h2>
      <Link href={"/game"}>
        <button>Reiniciar</button>
      </Link>
    </div>
  )
}

export default page