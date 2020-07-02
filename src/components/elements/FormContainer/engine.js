/**
 * through context, provides a soundOff function for form inputs, selects and textboxes.
 * Gives FormElement pre-context on what context to create and pass down to form elements
 * 
 */
const soundOff = input => {
    const { stateName, value } = input
    const tateName = stateName.slice(0)
    const stateFunctionName = `set${tateName.toUpperCase()}${tateName}`
    return {
        stateName: stateName,
        stateFunctionName: stateFunctionName,
        initialValue: value
    }
}

export default soundOff;