export const domUtils = {
    getDataSquare: (e: any): string => {
        const SQUARE_ID = 'data-square'
        return e.target?.closest(`[${SQUARE_ID}]`)?.getAttribute(SQUARE_ID) || ''
    }
}