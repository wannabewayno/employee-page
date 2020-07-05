export function booleanParse(testString) {
    if (typeof(testString) === 'boolean'){
        return testString
    } else {
        switch (testString) {
            case 'true':  return true;
            case 'false': return false;
            default: return new Error ('not a boolean'); 
        }
    } 
}