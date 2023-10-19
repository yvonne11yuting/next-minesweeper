import { GameStatusEnum } from "@/utils/minesweeperUtils"

interface GameStatusProps {
    status: GameStatusEnum;
    resetGame: () => void;
}

const GAME_STATUS_TEXT = {
    [GameStatusEnum.INIT]: '',
    [GameStatusEnum.LOSE]: 'Game Over 😭',
    [GameStatusEnum.WIN]: 'You Win! 🥳',
    [GameStatusEnum.PLAYING]: '',
}

const GameStatus = ({
    status,
    resetGame
}: GameStatusProps) => {
    return (
        <div className="flex flex-col gap-8 items-center justify-center w-full h-[inherit] bg-lime-200 bg-opacity-70">
            <span data-testid="GAME_RESULT" className="title-shadow text-3xl sm:text-4xl font-bold text-slate-50">{GAME_STATUS_TEXT[status]}</span>
            <button data-testid="RESTART_BTN" onClick={resetGame} className="hover:bg-lime-500 font-semibold py-2 px-4 border border-lime-600 text-lime-800 hover:border-transparent rounded">Restart Game</button>
        </div>
    )
}

export default GameStatus