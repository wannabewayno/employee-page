
const validateArrayData = data => {
    // Can't sort data that isn't an array
    if (!Array.isArray(data)){
        throw new Error("Data is not an Array. Cannot sort data that doesn't have a defined order")
    }

    // check the type of data by checking the first element
    const dataType = typeof(data[0])

    //check all data has consistent data type
    const isConsistent = data.every(value => typeof(value) === dataType)
    if(!isConsistent) {
        throw new Error("The Data to sort has mixed data types: Can't sort data that doesn't have a consistent data type")
    }

    //if no errors were thrown send back the data
    return dataType;
}

const findCompareFunctional = ( dataType, category, sampleData ) => {

    let compareFunctional;

    switch(dataType){
        case 'string': 
            compareFunctional = category => {
                if (category) {
                    return (a,b) => a[category].localeCompare(b[category])
                } else {
                    return (a,b) => a.localeCompare(b)
                }
            }
            break;
        case 'object': // access the catergory and test the datatype
            //? we'll assume that the category is a path to the data to sort
            //? hence no need to keep recursively calling this
            //? typeof(sampleData[category]) won't be an object
            compareFunctional = findCompareFunctional(typeof(sampleData[category]));
            break;
        case 'number': 
            compareFunctional = category => {
                if (category) {
                    return (a,b) => a[category] - b[category]
                } else {
                    return (a,b) => a - b
                }
            }
            break;
        case 'boolean': 
            compareFunctional = category => {
                if (category) {
                    return (a,b) => {
                        a = a? 1:0
                        b = b? 1:0
                        return a[category] - b[category]
                    }
                } else {
                    return (a,b) => {
                        a = a? 1:0
                        b = b? 1:0
                        return a - b
                    }
                }
            }
            break;
        default: throw new Error(
            'An unsupported datatype was sent to the sort function',
            'Check the data type and try again'
            )
    }

    return compareFunctional
}

/**
 * 
 * @param  {Array<any>} data          - data to sort
 * @param  {String}     [catergory]   - category to sort by
 * @param  {Boolean}    [isAscending] - to sort catergory in ascending or descending order
 * @return {Array<any>}               - sorted data
 */
const sort = (data, conditions) => {
    if (!conditions) {
        return data;
    }
    
    let { isAscending, category } = conditions 
    // check that the array is sortable
    const dataType = validateArrayData(data);
   
    // if undefined set it to true
    isAscending = isAscending === undefined ? true : isAscending;

    // assign a compare function
    const compareFunctional = findCompareFunctional(dataType, category, data[0])

    let compareFunction
    if (dataType === 'object'){
        compareFunction = compareFunctional(category);
    } else {
        compareFunction = compareFunctional();
    }

    data = data.sort(compareFunction);

    // reverse the array if necessary and return it
    return isAscending? data : data.reverse()  
}



const filter = (data, conditions) => {
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
                            if(item[key] === 'string') {
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

        // case 2: filter via a catergory // will need to check if a catergory can be passed before hand
        if (conditions.category){

            const { category, type, threshold } = conditions.category

            data = data.filter(item => {

                switch (typeof(item[category])){
                    case 'string':  return item[category] === type ? true : false;
                    case 'number':  return testNumber(item[category],threshold);
                    case 'boolean': return item[category] === type ? true : false;
                    default: return new Error(`Data of type:${typeof(item[category])} can't be filtered`);
                }
            })
        }

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

/**
 * 
 */
function useArrange(){
    /**
     * this function sorts and filters data
     */
    const sortAndFilterData = (data, sortConditions, filterConditions) => {
        const filteredData = filter(data, filterConditions);
        const sortedData = sort(filteredData, sortConditions);

        return sortedData
    }

    return sortAndFilterData
}

export { useArrange };