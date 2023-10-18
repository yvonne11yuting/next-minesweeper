export interface SquareStatus {
    [key: string]: string; // '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
}

export enum GameStatusEnum {
    INIT = 'INIT',
    PLAYING = 'PLAYING',
    WIN = 'WIN',
    LOSE = 'LOSE'
}

export class Minesweeper {
    rows: number;
    cols: number;
    squareStatus: { [key: string]: string };
    mines: string[];
    gameStatus: GameStatusEnum = GameStatusEnum.INIT;

    constructor(rows: number, cols: number, mines: string[], squareStatus: { [key: string]: string }) {
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;
        this.squareStatus = squareStatus;
    }

    get generateBoard(): string[] {
        let board: string[] = [];
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                board.push(`${r}-${c}`);
            }
        }
        return board;
    }

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

    private generateMine(): string {
        const row = Math.floor(Math.random() * this.rows);
        const col = Math.floor(Math.random() * this.cols);
        return `${row}-${col}`;
    }

    initMines(firstPosition: string, totalMines: number) {
        const newMines: string[] = [];
        while (newMines.length < totalMines) {
            const key = this.generateMine();
            if (!newMines.includes(key) && key !== firstPosition) {
                newMines.push(key);
            }
        }
        this.mines = newMines;
        this.gameStatus = GameStatusEnum.PLAYING;
    }

    checkSquare(squareId: string) {
        if (this.mines.includes(squareId)) {
            this.gameStatus = GameStatusEnum.LOSE;
            return;
        }
        if (this.squareStatus[squareId]) return;

        const [row, col] = squareId.split('-').map(Number);
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return;

        const adjacentSquares = this.getAdjacentSquares(row, col);
        const minesAround = adjacentSquares.filter(key => this.mines.includes(key));
        this.squareStatus = { ...this.squareStatus, [squareId]: minesAround.length.toString() };
        if (minesAround.length > 0) return;

        for (const targetSquare of adjacentSquares) {
            this.checkSquare(targetSquare);
        }
        this.checkGameWin();
    }

    checkAdjacentSquares(squareId: string, flagged: string[]) {
        const [row, col] = squareId.split('-').map(Number);
        const adjacentSquares = this.getAdjacentSquares(row, col);
        const adjacentFlags = adjacentSquares.filter(key => flagged.includes(key));
        if (adjacentFlags.length === Number(this.squareStatus[squareId])) {
            for (let targetSquare of adjacentSquares) {
                // by pass if square is flagged and is a mine
                if (adjacentFlags.includes(targetSquare) && this.mines.includes(targetSquare)) continue;
                this.checkSquare(targetSquare);
            }
        }
    }

    checkGameWin = () => {
        const totalOpened = Object.keys(this.squareStatus).length;
        if (totalOpened + this.mines.length === this.rows * this.cols) {
            this.gameStatus = GameStatusEnum.WIN;
            return true;
        }
        return false;
    }

    resetGame() {
        this.gameStatus = GameStatusEnum.INIT;
        this.mines = [];
        this.squareStatus = {};
    }
}
