import { Reducer, useReducer } from "react"

import { GameStatusEnum, Minesweeper } from "@/utils/minesweeperUtils"

enum MinesweeperActionEnum {
    INIT_MINES = 'INIT_MINES',
    SET_BOARD = 'SET_BOARD',
    SET_FLAGGED = 'SET_FLAGGED',
    SET_SQUARE = 'SET_SQUARE',
    SET_GAME_STATUS = 'SET_GAME_STATUS',
    RESET_GAME = 'RESET_GAME'
}

interface USE_MINESWEEPER_STATE {
    mines: string[];
    flagged: string[];
    squareStatus: { [key: string]: string };
    gameStatus: GameStatusEnum;
    board: string[];
}

interface USE_MINESWEEPER_ACTION {
    type: MinesweeperActionEnum;
    payload?: unknown;
}

const useMinesweeper = ({
    minesweeper
}: {
    minesweeper: Minesweeper
    }): [USE_MINESWEEPER_STATE, any] => {
    const [state, dispatch] = useReducer<Reducer<USE_MINESWEEPER_STATE, USE_MINESWEEPER_ACTION>>((state: USE_MINESWEEPER_STATE, action: USE_MINESWEEPER_ACTION ) => {
        switch (action.type) {
            case MinesweeperActionEnum.INIT_MINES:
                return {
                    ...state,
                    mines: action.payload as string[]
                }
            case MinesweeperActionEnum.SET_BOARD:
                return {
                    ...state,
                    board: action.payload as string[]
                }
            case MinesweeperActionEnum.SET_FLAGGED:
                return {
                    ...state,
                    flagged: action.payload as string[]
                }
            case MinesweeperActionEnum.SET_SQUARE:
                return {
                    ...state,
                    squareStatus: action.payload as { [key: string]: string }
                }
            case MinesweeperActionEnum.SET_GAME_STATUS:
                return {
                    ...state,
                    gameStatus: action.payload as GameStatusEnum
                }
            case MinesweeperActionEnum.RESET_GAME:
                return {
                    ...state,
                    mines: [],
                    flagged: [],
                    squareStatus: {},
                    gameStatus: GameStatusEnum.INIT
                }
            default:
                return state
        }
    }, {
        mines: [],
        flagged: [],
        squareStatus: {},
        gameStatus: GameStatusEnum.INIT,
        board: minesweeper.generateBoard(minesweeper.rows, minesweeper.cols)
    })

    return [state, {
        initMines: (firstPosition: string, totalMines: number) => {
            minesweeper.initMines(firstPosition, totalMines)
            dispatch({
                type: MinesweeperActionEnum.INIT_MINES,
                payload: minesweeper.mines
            })
        },
        setFlagged: (flagged: string[]) => {
            dispatch({
                type: MinesweeperActionEnum.SET_FLAGGED,
                payload: flagged
            })
        },
        resetGame: ({ rows, cols }: { rows: number, cols: number }) => {
            minesweeper.resetGame()
            dispatch({
                type: MinesweeperActionEnum.RESET_GAME
            })
            dispatch({
                type: MinesweeperActionEnum.SET_BOARD,
                payload: minesweeper.generateBoard(rows, cols)
            })
        },
        checkAdjacentSquares: (squareId: string, flagged: string[]) => {
            minesweeper.checkAdjacentSquares(squareId, flagged)
            minesweeper.checkGameWin()
            dispatch({
                type: MinesweeperActionEnum.SET_SQUARE,
                payload: minesweeper.squareStatus,
            })
            dispatch({
                type: MinesweeperActionEnum.SET_GAME_STATUS,
                payload: minesweeper.gameStatus,
            })
        },
        checkSquare: (squareId: string) => {
            minesweeper.checkSquare(squareId)
            minesweeper.checkGameWin()
            dispatch({
                type: MinesweeperActionEnum.SET_SQUARE,
                payload: minesweeper.squareStatus,
            })
            dispatch({
                type: MinesweeperActionEnum.SET_GAME_STATUS,
                payload: minesweeper.gameStatus,

            })
        }
    }]
}


export default useMinesweeper