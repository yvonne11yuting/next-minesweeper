import { render, screen, fireEvent } from '@testing-library/react';
import GameStatus from '../GameStatus';
import { GameStatusEnum } from '@/utils/minesweeperUtils';

describe('GameStatus', () => {
    const mockResetGame = jest.fn();
    it('should reset game after clicking the restart button', () => {
        render(<GameStatus status={GameStatusEnum.WIN} resetGame={mockResetGame} />);
        const RESTART_BTN = screen.getByTestId('RESTART_BTN');
        fireEvent.click(RESTART_BTN);
        expect(mockResetGame).toBeCalled();
    });
});
