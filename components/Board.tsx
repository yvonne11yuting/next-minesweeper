"use client"
import { Bomb, Flag } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"

import { GAME_LEVEL } from "@/constants/minesweeperConstants"
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
    const [mines, setMines] = useState<string[]>([])
    const [flagged, setFlagged] = useState<string[]>([])
    const [squareStatus, setSquareStatus] = useState<SquareStatus>({})
    const [gameStatus, setGameStatus] = useState<GameStatusEnum>(GameStatusEnum.INIT)
    const mineSweeper = useMemo(() => new Minesweeper(rows, cols, mines, squareStatus), [rows, cols, mines, squareStatus])
    const board = mineSweeper.generateBoard
    const gameInProgress = gameStatus === GameStatusEnum.INIT || gameStatus === GameStatusEnum.PLAYING
    const resetGame = useCallback(() => {
        mineSweeper.resetGame()
        setMines([])
        setFlagged([])
        setSquareStatus({})
        setGameStatus(GameStatusEnum.INIT)
    }, [])

    useEffect(() => {
        resetGame()
    }, [level, resetGame])

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
                mineSweeper.checkAdjacentSquares(squareId, flagged)
            }
            if (isSingleClick) {
                mineSweeper.checkSquare(squareId)
            }
        } else {
            mineSweeper.initMines(squareId, totalMines)
            mineSweeper.checkSquare(squareId)
            setMines(mineSweeper.mines)
            setGameStatus(GameStatusEnum.PLAYING)
        }
        setSquareStatus({ ...squareStatus, ...mineSweeper.squareStatus })
        checkGameStatus()
    }

    const flagSquare = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        const squareId = domUtils.getDataSquare(e)
        if (squareStatus[squareId]) return
        if (flagged.includes(squareId)) {
            setFlagged(flagged.filter(id => id !== squareId))
        } else if (flagged.length < totalMines) {
            setFlagged([...flagged, squareId])
        }
    }

    const checkGameStatus = () => {
        if (mineSweeper.gameStatus === GameStatusEnum.LOSE) {
            setGameStatus(GameStatusEnum.LOSE)
        } else {
            const gameWin = mineSweeper.checkGameWin()
            if (gameWin) {
                setGameStatus(GameStatusEnum.WIN)
            }
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
                        board.map((squareId) => {
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
                            <GameStatus status={gameStatus} resetGame={resetGame} />
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Board
