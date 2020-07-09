function randomNumberWithinRange(range,roundToNearest){
    return Math.round((Math.random()*(range[1] - range[0]) + range[0])/roundToNearest)*roundToNearest;
}

export default randomNumberWithinRange;