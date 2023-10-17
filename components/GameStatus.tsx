import { GameStatusEnum } from "@/utils/minesweeperUtils";

interface GameStatusProps {
    status: GameStatusEnum
    resetGame: () => void;
}

const GAME_STATUS_TEXT = {
    [GameStatusEnum.LOSE]: 'Game Over 😭',
    [GameStatusEnum.WIN]: 'You Win! 🥳',
    [GameStatusEnum.PLAYING]: '',
}

const GameStatus = ({
    status,
    resetGame
}: GameStatusProps) => {
    return (
        <div className="flex flex-col gap-8 items-center justify-center w-80 h-60 bg-lime-700 bg-opacity-70 rounded">
            <span className="title-shadow text-3xl font-bold">{GAME_STATUS_TEXT[status]}</span>
            <button onClick={resetGame} className="hover:bg-lime-500 font-semibold py-2 px-4 border border-slate-100 hover:border-transparent rounded">Restart Game</button>
        </div>
    )
}

export default GameStatus