# Flow
## Overall
The mines should be set up after the first click since the first click can never be a mine. The timer, used to record the game duration, should be initialized at the beginning. When the user completes the game and clicks the new game button, the mines and timer will be reset.

```mermaid
flowchart LR
    start[Click `New Game` button] --> event(Click the first square)
    event --> genMines[Generate mines] --> play[Play Game \n Please refer to Game Essentials and \n Accessibility Enhancements for more info.]
    event --> startTimer[Start timer] --> play
    play --> complete[Game win/Game over] --> start
```

## Game Essentials
### Clicking a square
Clicking on a square is a fundamental aspect of the game. It allows us to determine whether the user has clicked on a mine, display the count of adjacent mines, and check if the user has successfully located all the mines

```mermaid
flowchart LR
    event(Click a square) --> isMine{Is a mine}
    subgraph Check_A_Square
    isMine -->|Yes| endGame[Game over]
    isMine -->|No| hasAdjacentMines{Has adjacent mines}
    hasAdjacentMines --> |Yes| actionClear[Tag square as clicked & \n show the number of mines touching it]
    hasAdjacentMines --> |No| actionTag[Tag square as clicked]
    actionTag --> checkAdjacent[Check adjacent squares]
    actionTag --> checkClicked[Check the number of clicked squares]
    checkClicked ---> isCleared{If the number of clicked squares \n matches the number of mines}
    isCleared --> |Yes| completeGame[Game Win]
    isCleared --> |No| endRound[End this round]
    checkAdjacent --> hasAdjacentMines
    end
```

## Accessibility Enhancements
Accessibility features include flagging and chording. Users can flag unclicked squares, indicating the presence of a mine beneath. If a user double-clicks a previously clicked square with a number, we check the number of flags on adjacent squares. If the number of flags matches the number on the clicked square, we check all remaining squares around that number.

### Flagging
```mermaid
flowchart LR
    event(Right click a square) --> checkState{Is not clicked}
    checkState --> |Yes| tagSquare[Tag the square as unclickable] --> endRound[End this round]
```

### Chording
```mermaid
flowchart LR
    event(Double click a clicked square with number) --> checkFlags{If `the number on the square` matches \n `the number of flags on adjacent squares`}
    checkFlags --> |Yes| checkSquare[Check all remaining squares around the number \n ref: Check_A_Square]
    checkSquare --> endRound[End this round]
```

