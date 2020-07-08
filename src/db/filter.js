function filter(data, conditions){
    if (!conditions){
        return data
    }
    // case 1: filter via a string
    if (conditions.query){
        const re = new RegExp(conditions.query,'gi');
        
        data = data.filter(item => {

            const matches = [];

            switch(typeof(item)) {
                case'object':
                    for (const key in item) {
                        if(typeof(item[key]) === 'string') {
                            matches.push(...item[key].match(re)||[])
                        } 
                    }
                    break;
                case 'string':
                    matches.push(...item.match(re)||[])
                    break;
                default: return false;
            }

            // if any matches, return true. Otherwise return false
            return matches.length > 0 ? true : false
        })
    }
    console.log(data);
    // case 2: filter via a catergory // will need to check if a catergory can be passed before hand
    if (conditions.category){

        const { category, type, threshold } = conditions.category
        
        data = data.filter(item => {
            
            switch (typeof(item[category])){
                case 'string':  return item[category] === type;
                case 'number':  return testNumber(item[category],threshold);
                case 'boolean': return item[category] === type;
                default: return new Error(`Data of type:${typeof(item[category])} can't be filtered`);
            }
        })
    }
    console.log(data);
    return data
}

/**
*  Tests a number for a range of conditions
* @param  {Number}  number             - number to test
* @param  {Object}  threshold          - object containing conditions to test for
* @param  {Number}  [threshold.upper]  - tests if number is below this number
* @param  {Number}  [threshold.lower]  - tests if number is above this number
* @param  {Number}  [threshold.exact]  - tests if number is exactly this number
* @return {Boolean}                    - if number passes all tests returns true
*/
function testNumber(number,threshold){
    gaurdType(threshold,'!object')()

    const { exact, lower, upper } = threshold;

    if (exact) {
        return number === exact? true : false;
    } else {
        if (lower) if (number < lower) return false;
        if (upper) if (number > upper) return false;
        return true;
    }
}

/**
* returns a gaurd clause validating the typeof a value
* 
* @param  {*}        value -    
* @param  {String}   type  - checks that typeof(value) is of type. use ! to negate
*                            ?Example: type -> '!object'
*                            ? if (typeof(value) !== 'object') // if true return early from the function 
* @return {Function}       - call this function to activate the gaurdclause
*/
function gaurdType(value,type) {
    const negation = (type.match('!')||[]).length > 0
    if (negation){
        return  () => { 
            if ( typeof(value) !== type.slice(1)) {
                return // new Error(`${value} must be: ${type}`) 
            } 
        }
    } else {
        return  () => { 
            if ( typeof(value) === type ) {
                return // new Error(`${value} can't be: ${type}`) 
            } 
        }
    }
}

export default filter