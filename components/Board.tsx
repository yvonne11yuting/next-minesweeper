"use client";
import { useEffect, useState } from "react";
import { Bomb } from "lucide-react";
import { initMines, getAdjacentSquares, generateBoard, checkGameOver, checkGameWin, SquareStatus } from "@/utils/minesweeperUtils";

interface BoardProps {
    rows: number;
    cols: number;
    totalMines: number;
}

const SQUARE_ID = 'data-square';

const Board = ({
    rows,
    cols,
    totalMines,
}: BoardProps) => {
    const [mines, setMines] = useState<string[]>([]);
    const [squareStatus, setSquareStatus] = useState<SquareStatus>({});
    const [gameStatus, setGameStatus] = useState<number>(0); // 0: playing, 1: win, -1: lose
    const board = generateBoard(rows, cols);

    useEffect(() => {
        if (gameStatus === 0) {
            const gameWin = checkGameWin(squareStatus, rows * cols, totalMines);
            if (gameWin) {
                setGameStatus(1);
            }
        }
    }, [gameStatus, squareStatus, rows, cols, totalMines]);

    const clickSquare = (e: React.MouseEvent<HTMLDivElement>) => {
        let tempStatus: SquareStatus = {};
        const squareId = (e.target as Element).closest(`[${SQUARE_ID}]`)?.getAttribute(SQUARE_ID) || '';
        const minesAreSet = mines.length > 0;
        if (!squareId || gameStatus !== 0) return;

        if (minesAreSet) {
            const isMine = checkGameOver(squareId, mines);
            if (isMine) {
                setGameStatus(-1)
            } else {
                checkMines(squareId, mines, squareStatus);
            }
        } else {
            const newMines = initMines({
                rows,
                cols,
                firstPosition: squareId,
                totalMines
            });
            checkMines(squareId, newMines, {});
            setMines(newMines);
        }
        setSquareStatus({ ...squareStatus, ...tempStatus });

        function checkMines(squareId: string, baseMines: string[], curStatus: SquareStatus) {
            const [row, col] = squareId.split('-').map(Number);
            if (row < 0 || row >= rows || col < 0 || col >= cols) return;
            if (curStatus[squareId]) return;

            const adjacentSquares = getAdjacentSquares(row, col);
            const minesAround = adjacentSquares.filter(key => baseMines.includes(key));
            tempStatus = { ...tempStatus, [squareId]: minesAround.length.toString() };

            if (minesAround.length > 0) return;

            for (let targetSquare of adjacentSquares) {
                checkMines(targetSquare, baseMines, tempStatus);
            }
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
        }} onClick={clickSquare}>
            {
                board.map((squareId) => {
                    const text = Number(squareStatus[squareId]) > 0 ? squareStatus[squareId] : '';
                    const bgColor = squareStatus[squareId] ? 'bg-lime-500' : 'bg-lime-300'
                    return (
                        <div
                            data-square={squareId}
                            key={squareId}
                            className={`flex justify-center items-center border border-lime-200 ${bgColor}`}
                        >
                            {
                                gameStatus === -1 && mines.includes(squareId) && (
                                    <Bomb color="#020617" />
                                )
                            }
                            {
                                text && (
                                    <span className="text-2xl">{text}</span>
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