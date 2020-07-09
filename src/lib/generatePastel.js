import randomNumberWithinRange from './randomNumberWithinRange';

/**
 * A pastel is a colour with a saturation and lightness within 70%-90% range 
 */
function generatePastel(){
    const hue        = randomNumberWithinRange([0,360],1);
    const saturation = randomNumberWithinRange([70,90],1);
    const lightness  = randomNumberWithinRange([70,90],1);
    console.log(hue,saturation,lightness);
    return `hsla(${hue},${saturation}%,${lightness}%,1)`
}

export default generatePastel;