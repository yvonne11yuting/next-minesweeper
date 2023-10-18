import { GameStatusEnum, Minesweeper } from '../minesweeperUtils';

describe('Minesweeper', () => {
    let minesweeper: Minesweeper;
    let mockGenerateMine: jest.SpyInstance;

    beforeEach(() => {
        mockGenerateMine = jest.spyOn(Minesweeper.prototype, 'generateMine');
        minesweeper = new Minesweeper(5, 5, [], {});
    });

    afterEach(() => {
        mockGenerateMine.mockClear();
        minesweeper.resetGame();
    });

    it('should generate the board correctly', () => {
        const board = minesweeper.generateBoard;

        expect(board.length).toBe(25);
        expect(board).toContain('0-0');
        expect(board).toContain('4-4');
        expect(board).not.toContain('5-5');
    });

    it('should initialize mines correctly', () => {
        generateMockMines(['0-0', '1-1', '2-2', '3-3']);
        minesweeper.initMines('1-1', 3);

        expect(mockGenerateMine).toHaveBeenCalledTimes(4);
        expect(minesweeper.mines.length).toBe(3);
        expect(minesweeper.mines).not.toContain('1-1');
        expect(minesweeper.mines).toContain('0-0');
        expect(minesweeper.mines).toContain('2-2');
        expect(minesweeper.mines).toContain('3-3');

        mockGenerateMine.mockRestore();
    });

    it('should lose when the target square is a mine', () => {
        minesweeper.mines = ['0-0', '1-1', '2-2']
        minesweeper.checkSquare('0-0');

        expect(minesweeper.squareStatus['0-0']).toBeUndefined();
        expect(minesweeper.gameStatus).toBe(GameStatusEnum.LOSE);
    });

    it('should record square status when there are mines around the target square', () => {
        minesweeper.mines = ['0-0', '1-1', '2-2']
        minesweeper.checkSquare('0-1');

        expect(minesweeper.squareStatus['0-1']).toBe('2');
    });

    it('should check adjacent squares correctly', () => {
        // |      |      |      |      |      |
        // |*mine |  1   |      |      |      |
        // |   1  |  2   |      |      |      |
        // |   0  |  1   | mine |      |      |
        // |   0  |  1   |      |      |      |
        minesweeper.mines = ['0-1', '2-3']
        minesweeper.squareStatus = {
            '0-2': '1'
        };

        minesweeper.checkAdjacentSquares('0-2', ['0-1']);
        expect(minesweeper.squareStatus['0-3']).toBe('0');
        expect(minesweeper.squareStatus['0-4']).toBe('0');
        expect(minesweeper.squareStatus['1-1']).toBe('1');
        expect(minesweeper.squareStatus['1-2']).toBe('2');
        expect(minesweeper.squareStatus['1-3']).toBe('1');
        expect(minesweeper.squareStatus['1-4']).toBe('1');
        expect(Object.keys(minesweeper.squareStatus).length).toBe(7);
    });

    it('should check game win correctly', () => {
        expect(minesweeper.checkGameWin()).toBeFalsy();

        minesweeper.mines = ['0-0', '1-1', '2-2'];
        minesweeper.generateBoard.forEach(key => {
            if (!minesweeper.mines.includes(key)) {
                minesweeper.squareStatus[key] = '1';
            }
        });
        expect(minesweeper.checkGameWin()).toBeTruthy();
    });

    it('should reset the game correctly', () => {
        generateMockMines(['0-0', '1-1', '2-2', '3-3']);
        minesweeper.initMines('1-1', 3);

        minesweeper.checkSquare('0-2');

        minesweeper.resetGame();

        expect(minesweeper.mines.length).toBe(0);
        expect(minesweeper.squareStatus).toEqual({});
        expect(minesweeper.gameStatus).toBe(GameStatusEnum.INIT);
    });

    function generateMockMines(mockMines: string[]) {
        for (let mockMine of mockMines) {
            mockGenerateMine.mockReturnValueOnce(mockMine);
        };
    }
});
