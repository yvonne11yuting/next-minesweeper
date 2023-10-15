"use client";
import { useState } from "react";
import { Bomb } from "lucide-react";
import { initMines, getAdjacentSquares } from "@/utils/minesweeperUtils";

interface BoardProps {
    rows: number;
    cols: number;
    totalMines: number;
}

interface SquareStatus {
    [key: string]: string; // key: row-col, value: tempStatus
}

const SQUARE_ID = 'data-square';

const Board = ({
    rows,
    cols,
    totalMines,
}: BoardProps) => {
    const [mines, setMines] = useState<string[]>([]);
    const [squareStatus, setSquareStatus] = useState<SquareStatus>({});
    const [gameStatus, setGameStatus] = useState(0); // 0: playing, 1: win, -1: lose

    const clickSquare = (e: React.MouseEvent<HTMLDivElement>) => {
        let tempStatus: SquareStatus = {};
        const squareId = (e.target as Element).closest(`[${SQUARE_ID}]`)?.getAttribute(SQUARE_ID) || '';
        if (!squareId) return;

        if (!mines.length) {
            const newMines = initMines({
                rows,
                cols,
                firstPosition: squareId,
                totalMines
            });
            checkMines(squareId, newMines, {});
            setMines(newMines);
        } else {
            const isEndGame = checkGameStatus(squareId);
            if (!isEndGame) {
                checkMines(squareId, mines, squareStatus);
            }
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

            adjacentSquares.forEach(key => {
                checkMines(key, baseMines, tempStatus);
            })
        }
    }

    const checkGameStatus = (squareId: string) => {
        if (mines.includes(squareId)) {
            setGameStatus(-1)
            return true;
        }
        // TODO: Need to check success case
        return false;
    }

    return (
        <div className="grid w-80 sm:w-[500px] h-80 sm:h-[500px]" style={{
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gridTemplateColumns: `repeat(${cols}, 1fr)`
        }} onClick={clickSquare}>
            {
                Array(rows).fill(0).map((_, rowIdx) => (
                    Array(cols).fill(0).map((_, colIdx) => {
                        const key = `${rowIdx}-${colIdx}`;
                        const text = Number(squareStatus[key]) > 0 ? squareStatus[key] : '';
                        const bgColor = squareStatus[key] && squareStatus[key] !== 'flagged' ? 'bg-lime-500' : 'bg-lime-300'
                        return (
                            <div
                                data-square={key}
                                key={key}
                                className={`flex justify-center items-center border border-lime-200 ${bgColor}`}
                            >
                                {
                                    gameStatus === -1 && mines.includes(key) && (
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
                ))
            }
        </div>
    )
}

export default Board