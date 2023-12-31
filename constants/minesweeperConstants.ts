type LevelSetting = {
    rows: number;
    cols: number;
    totalMines: number;
}

export enum GAME_LEVEL {
    EASY, MEDIUM, HARD
}

export const LEVEL_OPTIONS = [
    { value: GAME_LEVEL.EASY, text: 'easy' },
    { value: GAME_LEVEL.MEDIUM, text: 'medium' },
    { value: GAME_LEVEL.HARD, text: 'hard' },
]

export const LEVEL_SETTING: Record<GAME_LEVEL, LevelSetting> = {
    [GAME_LEVEL.EASY]: { rows: 9, cols: 9, totalMines: 10 },
    [GAME_LEVEL.MEDIUM]: { rows: 12, cols: 10, totalMines: 25 },
    [GAME_LEVEL.HARD]: { rows: 15, cols: 12, totalMines: 40 },
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
    text: '[Mobile] You can set flags on mobile by clicking the flag button in the top right corner.',
    icon: 'mouse'
}, {
    text: 'There\'s a timer to record how quickly you complete the game.',
    icon: 'timer'
}]
