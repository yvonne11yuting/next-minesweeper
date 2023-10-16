"use client";
import { useEffect, useState } from "react";
import { Bomb, Flag } from "lucide-react";
import { getAdjacentSquares, checkGameOver, checkGameWin, SquareStatus, MineSweeper } from "@/utils/minesweeperUtils";

enum GameStatus {
    playing = 0,
    win = 1,
    lose = -1
}

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
    const [gameStatus, setGameStatus] = useState<GameStatus>(0);
    const mineSweeper = new MineSweeper(rows, cols, mines, squareStatus)
    const board = mineSweeper.generateBoard;

    useEffect(() => {
        if (gameStatus === 0) {
            const gameWin = checkGameWin(squareStatus, rows * cols, totalMines);
            if (gameWin) {
                setGameStatus(1);
            }
        }
    }, [gameStatus, squareStatus, rows, cols, totalMines]);

    const clickSquare = (e: React.MouseEvent<HTMLDivElement>) => {
        const squareId = (e.target as Element).closest(`[${SQUARE_ID}]`)?.getAttribute(SQUARE_ID) || '';
        const minesAreSet = mines.length > 0;
        const isFlagged = flagged.includes(squareId);
        if (!squareId || gameStatus !== 0 || isFlagged) return;

        if (minesAreSet) {
            const isMine = checkGameOver(squareId, mines);
            if (isMine) {
                setGameStatus(-1)
            } else {
                const isClick = e.detail === 1;
                const isDoubleClick = e.detail === 2;
                if (isClick) {
                    mineSweeper.checkSquare(squareId);
                }
                if (isDoubleClick && squareStatus[squareId] && squareStatus[squareId] !== '0') {
                    const [row, col] = squareId.split('-').map(Number);
                    const adjacentSquares = getAdjacentSquares(row, col);
                    const adjacentFlags = adjacentSquares.filter(key => flagged.includes(key));
                    if (adjacentFlags.length === Number(squareStatus[squareId])) {
                        for (let targetSquare of adjacentSquares) {
                            if (flagged.includes(targetSquare)) continue;
                            mineSweeper.checkSquare(targetSquare);
                        }
                    }
                }
            }
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
        if (squareStatus[squareId] || gameStatus !== 0) return;
        if (flagged.includes(squareId)) {
            setFlagged(flagged.filter(id => id !== squareId));
            setFlags(flags + 1);
        } else {
            setFlagged([...flagged, squareId]);
            setFlags(flags - 1);
        }
    }

    const resetGame = () => {
        setMines([]);
        setSquareStatus({});
        setGameStatus(0);
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
                    return (
                        <div
                            data-square={squareId}
                            key={squareId}
                            className={`flex justify-center items-center border border-lime-200 ${bgColor}`}
                        >
                            {
                                gameStatus === -1 && isMine && !hasFlag && (
                                    <Bomb color="#020617" />
                                )
                            }
                            {
                                text && (
                                    <span className="text-2xl">{text}</span>
                                )
                            }
                            {
                                hasFlag && (
                                    <Flag color="#dc2626" />
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
