"use client"
import Board from './Board';

const MinesweeperMain = ({
    rows = 9,
    cols = 9,
    totalMines = 10,
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

