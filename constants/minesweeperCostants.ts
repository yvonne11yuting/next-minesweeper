export const LEVEL_OPTIONS = [
    { value: 'EASY', text: 'easy' },
    { value: 'MEDIUM', text: 'medium' },
    { value: 'HARD', text: 'hard' },
];

export const LEVEL_SETTING: {
    [key: string]: {
        rows: number;
        cols: number;
        totalMines: number;
    }
} = {
    EASY: { rows: 9, cols: 9, totalMines: 10 },
    MEDIUM: { rows: 12, cols: 10, totalMines: 25 },
    HARD: { rows: 15, cols: 12, totalMines: 40 },
}

export const GAME_CONTROL_TEXT = [{
    text: 'Left-click a square to reveal it.',
    icon: 'mouse'
}, {
    text: 'Right-click a square to flag it.',
    icon: 'mouse'
}, {
    text: 'Double-click the left mouse button on a numbered square if the number of flagged squares around it matches the number.',
    icon: 'mouse'
}, {
    text: '[Mobile] You can set flags on mobile by clicking the flag button in the bottom right corner.',
    icon: 'mouse'
}, {
    text: 'There\'s a timer to record how quickly you complete the game.',
    icon: 'timer'
}];