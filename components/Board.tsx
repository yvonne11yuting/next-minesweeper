"use client";
import { useMemo, useState } from "react";
import { Bomb, Flag } from "lucide-react";
import { SquareStatus, GameStatus, Minesweeper } from "@/utils/minesweeperUtils";

interface BoardProps {
    rows: number;
    cols: number;
    totalMines: number;
    flags: number
    setFlags: (flags: number) => void;
}

const SQUARE_ID = 'data-square';

const Board = ({
    rows,
    cols,
    totalMines,
    flags,
    setFlags
}: BoardProps) => {
    const [mines, setMines] = useState<string[]>([]);
    const [flagged, setFlagged] = useState<string[]>([]);
    const [squareStatus, setSquareStatus] = useState<SquareStatus>({});
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PLAYING);
    const mineSweeper = useMemo(() => new Minesweeper(rows, cols, mines, squareStatus), [rows, cols, mines, squareStatus])
    const board = mineSweeper.generateBoard;

    const clickSquare = (e: React.MouseEvent<HTMLDivElement>) => {
        const squareId = (e.target as Element).closest(`[${SQUARE_ID}]`)?.getAttribute(SQUARE_ID) || '';
        const isSingleClick = e.detail === 1;
        const isDoubleClick = e.detail === 2;

        const minesInitialized = mines.length > 0;
        const isFlagged = flagged.includes(squareId);
        const numberedSquare = squareStatus[squareId] && squareStatus[squareId] !== '0';
        if (!squareId || gameStatus !== GameStatus.PLAYING || isFlagged) return;

        if (minesInitialized) {
            if (isDoubleClick && numberedSquare) {
                mineSweeper.checkAdjacentSquares(squareId, flagged);
            }
            if (isSingleClick) {
                mineSweeper.checkSquare(squareId);
            }
            checkGameStatus();
        } else {
            mineSweeper.initMines(squareId, totalMines);
            mineSweeper.checkSquare(squareId);
            setMines(mineSweeper.mines);
        }
        setSquareStatus({ ...squareStatus, ...mineSweeper.squareStatus });
    }

    const flagSquare = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const squareId = (e.target as Element).closest(`[${SQUARE_ID}]`)?.getAttribute(SQUARE_ID) || '';
        if (squareStatus[squareId]) return;
        if (flagged.includes(squareId)) {
            setFlagged(flagged.filter(id => id !== squareId));
            setFlags(flags + 1);
        } else {
            setFlagged([...flagged, squareId]);
            setFlags(flags - 1);
        }
    }

    const checkGameStatus = () => {
        if (mineSweeper.gameStatus === GameStatus.LOSE) {
            setGameStatus(GameStatus.LOSE)
        } else {
            const gameWin = mineSweeper.checkGameWin();
            if (gameWin) {
                setGameStatus(GameStatus.WIN);
            }
        }
    }

    const resetGame = () => {
        setMines([]);
        setSquareStatus({});
        setGameStatus(GameStatus.PLAYING);
    }

    return (
        <div className="grid w-80 sm:w-[500px] h-80 sm:h-[500px]" style={{
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gridTemplateColumns: `repeat(${cols}, 1fr)`
        }} onClick={clickSquare} onContextMenu={flagSquare}>
            {
                board.map((squareId) => {
                    const text = Number(squareStatus[squareId]) > 0 ? squareStatus[squareId] : '';
                    const isMine = mines.includes(squareId);
                    const hasFlag = flagged.includes(squareId);
                    const bgColor = squareStatus[squareId] && !hasFlag ? 'bg-lime-500' : 'bg-lime-300'
                    const wrongFlagStyles = '-rotate-90 transition ease-out duration-1000';
                    return (
                        <div
                            data-square={squareId}
                            key={squareId}
                            className={`flex justify-center items-center border border-lime-200 ${bgColor}`}
                        >
                            {
                                gameStatus === GameStatus.LOSE && isMine && !hasFlag && (
                                    <Bomb color="#020617" size="1rem" />
                                )
                            }
                            {
                                text && !hasFlag && text
                            }
                            {
                                hasFlag && (
                                    <Flag className={`${text ? wrongFlagStyles : ''}`} color="#dc2626" />
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Board
