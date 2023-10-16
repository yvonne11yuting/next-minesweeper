"use client"
import { useState } from 'react';
import { Flag } from 'lucide-react';
import Board from './Board';

const Minesweeper = ({
    rows = 9,
    cols = 9,
    totalMines = 10,
}) => {
    const [flags, setFlags] = useState<number>(totalMines);
    return (
        <div>
            <div>
                <span className="inline-flex gap-2">
                    {/* TODO: Need to change to flag remaining number */}
                    <Flag color="#dc2626" />{flags}
                </span>
            </div>
            <Board
                rows={rows}
                cols={cols}
                totalMines={totalMines}
                flags={flags}
                setFlags={setFlags}
            />
        </div>
    )
}

export default Minesweeper

