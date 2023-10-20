import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { GAME_LEVEL } from '@/constants/minesweeperConstants'
import { domUtils } from '@/utils/domUtils'
import { Minesweeper } from '@/utils/minesweeperUtils'

import Board from '../Board'

/* Test cases
    1. should render board with correct number of square elements
    2. clicking on a square triggers the clickSquare/flagSquare function correctly
    3. should show the game status after winning the game
    4. should show `how to play` when clicking on the game guide button
    5. should hint to users it's the flag mode when clicking on the flag mode button
**/

describe('Board', () => {
    const mockGatDataSquare = jest.spyOn(domUtils, 'getDataSquare')
    const mockGenerateMine = jest.spyOn(Minesweeper.prototype, 'generateMine')
    const user = userEvent.setup()
    const props = {
        level: GAME_LEVEL.EASY,
        rows: 5,
        cols: 5,
        totalMines: 5,
        flagMode: false,
    }

    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should render board with correct number of square elements', () => {
        render(<Board {...props} />)

        const squareElements = screen.getAllByTestId(/^SQUARE_\d+-\d+$/)
        expect(squareElements.length).toBe(props.rows * props.cols)
    })

    it('clicking on a square triggers the clickSquare/flagSquare function correctly', async () => {
        // |      |      |      |      | mine |
        // |*mine |  1   |      |      | mine |
        // |   1  |  2   |      | mine |      |
        // |   0  |  1   | mine |      |      |
        // |   0  |  1   |      |      |      |
        generateMockMines(['0-1', '2-3', '3-2', '4-0', '4-1'])
        const expectedSquareStatus = [
            ['0-2', '1'],
            ['1-1', '1'],
            ['1-2', '2'],
            ['1-3', '1'],
            ['1-4', '1'],
        ]

        render(<Board {...props} />)

        const gameBoard = screen.getByTestId('GAME_BOARD')
        const gameSquare = screen.getByTestId('SQUARE_0-2')
        const gameFlagsNum = screen.getByTestId('GAME_FLAGS_NUM')

        // Left-Click: Checking
        setMockSquareIds('0-2')
        await user.click(gameBoard)
        expect(mockGatDataSquare).toBeCalled()
        expect(gameSquare).toHaveTextContent('1')

        // Right-Click: Flagging
        setMockSquareIds('0-1')
        expect(gameFlagsNum).toHaveTextContent('5')
        await user.pointer({ target: gameBoard, keys: '[MouseRight]' })
        expect(screen.getByTestId('FLAG_0-1')).toBeInTheDocument()
        expect(gameFlagsNum).toHaveTextContent('4')

        // Double-Click: Chording
        setMockSquareIds(['0-2', '0-2'])
        await user.pointer({ target: gameBoard, keys: '[MouseLeft][MouseLeft]' })
        for (let [key, val] of expectedSquareStatus) {
            expect(screen.getByTestId(`SQUARE_${key}`)).toHaveTextContent(val)
        }

        // Click on a mine
        setMockSquareIds('4-0')
        await user.click(gameBoard)
        expect(screen.getByTestId('GAME_RESULT')).toHaveTextContent('Game Over 😭')

        // Restart game
        const restartBtn = screen.getByTestId('RESTART_BTN')
        await user.click(restartBtn)
        expect(screen.queryByTestId('GAME_RESULT')).not.toBeInTheDocument()
        expect(gameFlagsNum).toHaveTextContent('5')
        for (let [key] of expectedSquareStatus) {
            expect(screen.queryByTestId(`SQUARE_${key}`)).toHaveTextContent('')
        }
    })

    it('should show the game status after winning the game', async () => {
        generateMockMines(['2-2'])
        render(<Board rows={5} cols={5} totalMines={1} />)

        setMockSquareIds('0-0')
        const gameBoard = screen.getByTestId('GAME_BOARD')
        await user.click(gameBoard)
        expect(screen.getByTestId('GAME_RESULT')).toHaveTextContent('You Win! 🥳')

    })

    it('should show `how to play` when clicking on the game guide button', async () => {
        render(<Board {...props} />)

        const gameGuideBtn = screen.getByTestId('GAME_GUIDE_BTN')
        expect(screen.queryByTestId('GAME_GUIDE_CONTENT')).not.toBeInTheDocument()
        await user.click(gameGuideBtn)
        expect(screen.getByTestId('GAME_GUIDE_CONTENT')).toBeInTheDocument()
        await user.click(gameGuideBtn)
        expect(screen.queryByTestId('GAME_GUIDE_CONTENT')).not.toBeInTheDocument()
    })

    it('should hint to users it\'s the flag mode when clicking on the flag mode button', async () => {
        const flagTrueProps = { ...props, flagMode: true }
        const minesweeper = new Minesweeper(props.rows, props.cols, [], {})

        render(<Board {...flagTrueProps} />)
        for (let square of minesweeper.generateBoard) {
            const flagHint = screen.getByTestId(`FLAG_HINT_${square}`)
            expect(flagHint).toBeInTheDocument()
        }
    })

    function setMockSquareIds(mockSquareIds: string | string[]) {
        if (Array.isArray(mockSquareIds)) {
            for (let mockSquareId of mockSquareIds) {
                mockGatDataSquare.mockReturnValueOnce(mockSquareId)
            }
        } else {
            mockGatDataSquare.mockReturnValueOnce(mockSquareIds)
        }
    }

    function generateMockMines(mockMines: string[]) {
        for (let mockMine of mockMines) {
            mockGenerateMine.mockReturnValueOnce(mockMine)
        };
    }
})
