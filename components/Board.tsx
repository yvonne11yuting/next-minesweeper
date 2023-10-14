"use client";
import { useState } from "react";

interface BoardProps {
    rows: number;
    cols: number;
    totalMines: number;
}

const Board = ({
    rows,
    cols,
    totalMines,
}: BoardProps) => {
    const [mines, setMines] = useState<string[]>([]);
    const clickSquare = (e: React.MouseEvent<HTMLDivElement>) => {
        const squareId = (e.target as Element).closest('[data-square]')?.getAttribute('data-square') || '';
        if (!squareId) return;

        console.log(squareId);
        console.log(mines);

        if (mines.length === 0) {
            initMines(squareId);
        }
    }

    const initMines = (firstPosition: string) => {
        const newMines: string[] = [];
        while (newMines.length < totalMines) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            const key = `${row}-${col}`;
            if (!newMines.includes(key) && key !== firstPosition) {
                newMines.push(key);
            }
        }
        setMines(newMines);
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
                        return (
                            <div data-square={key} key={key} className="bg-lime-300 border border-lime-200" />
                        )
                    })
                ))
            }
        </div>
    )
}

export default Board