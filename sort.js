const { findAllByAltText } = require("@testing-library/react");

// import { useState, useEffect } from 'react'
const testStrings = ['Bananas','Strawberries','Peaches','Mangos','Kiwi fruits','Strawberries','Apples'];
const testNumbers = [1,5,70,1002,34,56,1,3,13,456];

console.log(testStrings);
console.log(testStrings.sort());
console.log(testNumbers.sort( (a,b) => a - b ));
console.log(testNumbers.sort( (a,b) => b - a ));

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

const findCompareFunction = ( dataType, catergory, sampleData ) => {

    let compareFunction;

    switch(dataType){
        case 'string': // do nothing sort will automatically sort strings alphabetically  
            break;
        case 'object': // access the catergory and test the datatype
            sampleData[catergory]
            break;
        case 'number':
            break;
        case 'boolean':
            break;
        default: throw new Error(
            'An unsupported datatype was sent to the sort function',
            'Check the data type and try again'
            )
    }

    return compareFunction
}

const filter = () => {

    return filteredData
}
/**
 * 
 * @param  {Array<any>} data          - data to sort
 * @param  {String}     [catergory]   - category to sort by
 * @param  {Boolean}    [isAscending] - to sort catergory in ascedning or descending order
 * @return {Array<any>}               - sorted data
 */
const sort = (data, category, isAscending) => {
    // check that the array is sortable
    const dataType = validateArrayData(data);

    // if undefined set it to true
    isAscending = !isAscending? true : isAscending;
    // create a placeholder
    const compareFunction = findCompareFunction(dataType, category, data[0])

   
    // assign a compare function
    // do operation based off this

    // reverse the array is necessary
    const sortedData = data.sort(compare)
    return isAscending? sortedData : sortedData.reverse()  
}

/**
 * 
 */
function useArrange(initalData){

    const [data, setData] = useState(initalData);

    /**
     * this function sorts and filters data
     */
    const arrangeData = () => {
        filteredData = filter(data);
        sortedAndFilteredData = sort(filteredData);

        return sortedAndFilteredData
    }

    useEffect(() => { 
        setData()
    },[])

    return [data, setData, arrangeData ]

}