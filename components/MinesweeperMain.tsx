"use client"
import { useState } from 'react';
import Board from './Board';

const MinesweeperMain = ({
    rows = 9,
    cols = 9,
    totalMines = 5,
}) => {
    return (
        <div>
            <Board
                rows={rows}
                cols={cols}
                totalMines={totalMines}
            />
        </div>
    )
}

export default MinesweeperMain

