import { useState, useEffect } from 'react'

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

const filter = () => {
    const filteredData = '';
    return filteredData
}

/**
 * 
 * @param  {Array<any>} data          - data to sort
 * @param  {String}     [catergory]   - category to sort by
 * @param  {Boolean}    [isAscending] - to sort catergory in ascending or descending order
 * @return {Array<any>}               - sorted data
 */
const sort = (data, isAscending, category) => {
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

    const sortedData = data.sort(compareFunction);

    // reverse the array if necessary and return it
    return isAscending? sortedData : sortedData.reverse()  
}



/**
 * 
 */
function useArrange(){
    /**
     * this function sorts and filters data
     */
    const sortAndFilterData = (data, isAscending, category) => {
        // const filteredData = filter(data);
        const sortedData = sort(data, isAscending, category);

        return sortedData
    }

    return sortAndFilterData
}

export { useArrange };