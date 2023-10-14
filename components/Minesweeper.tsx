import { Flag } from 'lucide-react';
import Board from './Board';

const Minesweeper = ({
    rows = 10,
    cols = 10,
    totalMines = 10,
}) => {
    return (
        <div>
            <div>
                <span className="inline-flex gap-2">
                    {/* TODO: Need to change to flag remaining number */}
                    <Flag color="#dc2626" />{totalMines}
                </span>
            </div>
            <Board rows={rows} cols={cols} totalMines={totalMines} />
        </div>
    )
}

export default Minesweeper

