"use client"
import { Bomb, Flag } from "lucide-react"
import { use, useCallback, useEffect, useMemo, useReducer, useState } from "react"

import { GAME_LEVEL } from "@/constants/minesweeperConstants"
import useMinesweeper from "@/hooks/useMinesweeper"
import { domUtils } from "@/utils/domUtils"
import { GameStatusEnum, Minesweeper,SquareStatus } from "@/utils/minesweeperUtils"

import GameInfo from "./GameInfo"
import GameStatus from "./GameStatus"

interface BoardProps {
    level: GAME_LEVEL;
    rows: number;
    cols: number;
    totalMines: number;
    flagMode: boolean;
}

const Board = ({
    level,
    rows,
    cols,
    totalMines,
    flagMode,
}: BoardProps) => {
    const minesweeper = useMemo(() => new Minesweeper(rows, cols, [], {}), [rows, cols]) as Minesweeper
    const [{
        board,
        mines,
        flagged,
        squareStatus,
        gameStatus,
    }, {
        checkAdjacentSquares,
        checkSquare,
        initMines,
        resetGame,
        setFlagged
        }] = useMinesweeper({ minesweeper })
    const gameInProgress = gameStatus === GameStatusEnum.INIT || gameStatus === GameStatusEnum.PLAYING


    useEffect(() => {
        resetGame({ rows, cols })
    }, [level])

    const clickSquare = (e: React.MouseEvent<HTMLDivElement>) => {
        const squareId = domUtils.getDataSquare(e)
        const isSingleClick = e.detail === 1
        const isDoubleClick = e.detail === 2
        const minesInitialized = mines.length > 0
        const isFlagged = flagged.includes(squareId)
        const numberedSquare = squareStatus[squareId] && squareStatus[squareId] !== '0'

        if (minesInitialized && flagMode) {
            flagSquare(e)
            return
        }
        if (!squareId || isFlagged) return

        if (minesInitialized) {
            if (isDoubleClick && numberedSquare) {
                checkAdjacentSquares(squareId, flagged)
            }
            if (isSingleClick) {
                checkSquare(squareId)
            }
        } else {
            initMines(squareId, totalMines)
            checkSquare(squareId)
        }
    }

    const flagSquare = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        const squareId = domUtils.getDataSquare(e)
        if (squareStatus[squareId]) return
        if (flagged.includes(squareId)) {
            setFlagged(flagged.filter((id: string) => id !== squareId))
        } else if (flagged.length < totalMines) {
            setFlagged([...flagged, squareId])
        }
    }

    return (
        <>
            <GameInfo
                remainingFlags={totalMines - flagged.length}
                startTimer={gameStatus === GameStatusEnum.PLAYING}
                pauseTimer={!gameInProgress}
                resetGame={resetGame}
            />
            <div className="relative">
                <div data-testid="GAME_BOARD" className="grid sm:w-full h-full cursor-default" style={{
                    gridTemplateRows: `repeat(${rows}, minmax(24px, 36px))`,
                    gridTemplateColumns: `repeat(${cols}, minmax(24px, 36px))`
                }} onClick={clickSquare} onContextMenu={flagSquare}>
                    {
                        board.map((squareId: string) => {
                            const text = Number(squareStatus[squareId]) > 0 ? squareStatus[squareId] : ''
                            const hasFlag = flagged.includes(squareId)
                            const isGameOver = gameStatus === GameStatusEnum.LOSE
                            const showMines = isGameOver && mines.includes(squareId) && !hasFlag
                            const isChecked = squareStatus[squareId]
                            const bgColor = isChecked && !hasFlag ? 'bg-lime-500' : 'bg-lime-300'
                            const wrongFlagStyles = isGameOver && text ? '-rotate-90 transition ease-out duration-1000' : ''
                            return (
                                <div
                                    data-square={squareId}
                                    data-testid={`SQUARE_${squareId}`}
                                    key={squareId}
                                    className={`flex justify-center text-lg sm:text-xl items-center text-slate-50 border border-lime-200 ${bgColor}`}
                                >
                                    {
                                        showMines && (<Bomb color="#020617" />)
                                    }
                                    {
                                        text && !hasFlag && (
                                            <span>{text}</span>
                                        )
                                    }
                                    {
                                        hasFlag && (
                                            <Flag
                                                data-testid={`FLAG_${squareId}`}
                                                className={wrongFlagStyles} color="#dc2626"
                                            />
                                        )
                                    }
                                    {
                                        flagMode && !isChecked && !hasFlag && (
                                            <Flag
                                                data-testid={`FLAG_HINT_${squareId}`}
                                                className="stroke-red-50 opacity-50"
                                            />
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                {
                    !gameInProgress && (
                        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
                            <GameStatus status={gameStatus} resetGame={() => resetGame({ rows, cols })} />
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Board
