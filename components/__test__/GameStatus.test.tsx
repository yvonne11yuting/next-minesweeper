import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { GameStatusEnum } from '@/utils/minesweeperUtils'

import GameStatus from '../GameStatus'

describe('GameStatus', () => {
    const user = userEvent.setup()
    const mockResetGame = jest.fn()

    it('should reset game after clicking the restart button', async () => {
        render(<GameStatus status={GameStatusEnum.WIN} resetGame={mockResetGame} />)
        const RESTART_BTN = screen.getByTestId('RESTART_BTN')
        await user.click(RESTART_BTN)
        expect(mockResetGame).toBeCalled()
    })
})
