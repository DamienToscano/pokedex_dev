export const getSwipeDirection = (start: number, end: number) => {
    const swipeDistance = end - start
    const swipeDistanceAbs = Math.abs(swipeDistance)

    if (swipeDistanceAbs > 100) {
        if (swipeDistance > 0) {
            return 'right'
        } else {
            return 'left'
        }
    }
    
    return null
}