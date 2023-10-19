import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { domUtils } from '@/utils/domUtils'
import { Minesweeper } from '@/utils/minesweeperUtils'

import MinesweeperMain from '../MinesweeperMain'

/* Test cases
    1. should flag a square when flag mode is on
**/

describe('MinesweeperMain', () => {
    const user = userEvent.setup()
    const mockGatDataSquare = jest.spyOn(domUtils, 'getDataSquare')
    const mockGenerateMine = jest.spyOn(Minesweeper.prototype, 'generateMine')

    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should flag a square when flag mode is on', async () => {
        generateMockMines(['0-1', '2-3', '3-2', '4-0', '4-1', '5-0', '5-1', '5-2', '5-2', '5-4'])
        render(<MinesweeperMain />)

        const gameBoard = screen.getByTestId('GAME_BOARD')
        const flagModeBtn = screen.getByTestId('FLAG_MODE_BTN')

        expect(screen.queryByTestId('FLAG_0-0')).not.toBeInTheDocument()
        setMockSquareIds(['0-2', '0-0', '0-0'])
        await user.click(gameBoard)
        await user.click(flagModeBtn)
        await user.click(gameBoard)
        expect(screen.getByTestId('FLAG_0-0')).toBeInTheDocument()
        expect(screen.getByTestId('SQUARE_0-0')).toHaveTextContent('')
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
