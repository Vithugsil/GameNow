import Link from "next/link"
export default function Home() {
    return (
        <>
            <div className='start'>
                <h1>Jogo de Palavras</h1>
                <p>Clique no botão abaixo para começar a jogar</p>
                <Link href={"/game"}>
                    <button>Começar o jogo</button>
                </Link>
            </div>
        </>
    )
}