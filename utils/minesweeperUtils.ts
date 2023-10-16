export interface SquareStatus {
    [key: string]: string; // '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
}

export const checkGameWin = (squareStatus: SquareStatus, totalSquares: number, totalMines: number) => {
    const totalOpened = Object.keys(squareStatus).length;
    if (totalOpened + totalMines === totalSquares) {
        console.log('win')
        return true;
    }
    return false;
}

export class MineSweeper {
    rows: number;
    cols: number;
    squareStatus: { [key: string]: string; };
    mines: string[];
    gameStatus: 'playing' | 'win' | 'lose' = 'playing';

    constructor(rows: number, cols: number, mines: string[], squareStatus: { [key: string]: string; }) {
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;
        this.squareStatus = squareStatus;
    }

    get generateBoard(): string[] {
        let board: string[] = [];
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++)
                board.push(`${r}-${c}`);
        }
        return board;
    };

    private getAdjacentSquares(row: number, col: number): string[] {
        return [
            `${row - 1}-${col - 1}`, // left top
            `${row - 1}-${col}`,     // top
            `${row - 1}-${col + 1}`, // right top
            `${row}-${col - 1}`,     // left
            `${row}-${col + 1}`,     // right
            `${row + 1}-${col - 1}`, // left bottom
            `${row + 1}-${col}`,     // bottom
            `${row + 1}-${col + 1}`, // right bottom
        ].filter(key => /^\d+-\d+$/.test(key));
    }

    initMines(firstPosition: string, totalMines: number) {
        const newMines: string[] = [];
        while (newMines.length < totalMines) {
            const row = Math.floor(Math.random() * this.rows);
            const col = Math.floor(Math.random() * this.cols);
            const key = `${row}-${col}`;
            if (!newMines.includes(key) && key !== firstPosition) {
                newMines.push(key);
            }
        }
        this.mines = newMines;
    }

    checkSquare(squareId: string) {
        if (this.mines.includes(squareId)) {
            this.gameStatus = 'lose';
            return;
        };
        if (this.squareStatus[squareId]) return;

        const [row, col] = squareId.split('-').map(Number);
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return;

        const adjacentSquares = this.getAdjacentSquares(row, col);
        const minesAround = adjacentSquares.filter(key => this.mines.includes(key));
        this.squareStatus = { ...this.squareStatus, [squareId]: minesAround.length.toString() };
        if (minesAround.length > 0) return;


        for (let targetSquare of adjacentSquares) {
            this.checkSquare(targetSquare);
        }
    }

    checkAdjacentSquares(squareId: string, flagged: string[]) {
        const [row, col] = squareId.split('-').map(Number);
        const adjacentSquares = this.getAdjacentSquares(row, col);
        const adjacentFlags = adjacentSquares.filter(key => flagged.includes(key));
        if (adjacentFlags.length === Number(this.squareStatus[squareId])) {
            for (let targetSquare of adjacentSquares) {
                this.checkSquare(targetSquare);
            }
        }
    }

    checkGameOver(squareId: string) {
        if (this.mines.includes(squareId)) {
            this.gameStatus = 'lose';
        }
    }
}
