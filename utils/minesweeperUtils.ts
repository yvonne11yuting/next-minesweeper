export interface SquareStatus {
    [key: string]: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | 'Flagged'; // key: row-col, value: tempStatus
}

export const generateBoard = (rows: number, cols: number): string[] => {
    let board: string[] = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++)
            board.push(`${r}-${c}`);
    }
    return board;
};

export const initMines = ({
    rows,
    cols,
    firstPosition,
    totalMines
}: {
    rows: number;
    cols: number;
    firstPosition: string;
    totalMines: number;
}) => {
    const newMines: string[] = [];
    while (newMines.length < totalMines) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        const key = `${row}-${col}`;
        if (!newMines.includes(key) && key !== firstPosition) {
            newMines.push(key);
        }
    }
    return newMines;
}

export const getAdjacentSquares = (row: number, col: number): string[] => {
    return [
        `${row - 1}-${col - 1}`,
        `${row - 1}-${col}`,
        `${row - 1}-${col + 1}`,
        `${row}-${col - 1}`,
        `${row}-${col + 1}`,
        `${row + 1}-${col - 1}`,
        `${row + 1}-${col}`,
        `${row + 1}-${col + 1}`,
    ].filter(key => /^\d+-\d+$/.test(key));
}

export const checkGameOver = (squareId: string, mines: string[]) => {
    if (mines.includes(squareId)) {
        console.log('game over')
        return true;
    }
    return false;
}

export const checkGameWin = (squareStatus: SquareStatus, totalSquares: number, totalMines: number) => {
    const totalOpened = Object.keys(squareStatus).length;
    if (totalOpened + totalMines === totalSquares) {
        console.log('win')
        return true;
    }
    return false;
}
