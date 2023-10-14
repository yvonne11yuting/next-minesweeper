
const Minesweeper = ({
    rows = 10,
    cols = 10,
    mines = 10,
}) => {
    return (
        <div>
            <div className="grid w-80 sm:w-[500px] h-80 sm:h-[500px]" style={{
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                gridTemplateColumns: `repeat(${cols}, 1fr)`
            }}>
                {
                    Array(rows).fill(0).map((_, rowIdx) => (
                        Array(cols).fill(0).map((_, colIdx) => {
                            const key = `${rowIdx}-${colIdx}`;
                            return (
                                <div data-square={key} key={key} className="bg-lime-300 border border-lime-200" />
                            )
                        })
                    ))
                }
            </div>
        </div>
    )
}

export default Minesweeper

