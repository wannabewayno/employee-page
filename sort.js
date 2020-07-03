// import { useState, useEffect } from 'react'
const testStrings = ['Bananas','Strawberries','Peaches','Mangos','Kiwi fruits','Strawberries','Apples'];
const testNumbers = [1,5,70,1002,34,56,1,3,13,456];

const randomNumber = range => {
    return Math.floor(range[0] + Math.random()*(range[1] - range[0])) 
}
const testNames = ['Stacy','Lena','Andrea','Micheal','West','Cameron','Wayne','Lewis','Happyius','Mikal','Ivan','Sandra','Emma']
const createObject = (strings) => {
    return strings.map(string => {return {name:string} })
}
const testObjects = () => {
    test = [];
    for (let index = 0; index < 20; index++) {
        const randomNumber1 = randomNumber([0,200_000]);
        const randomNumber2 = randomNumber([20,80]);
        test.push({
            age: randomNumber2,
            salary: randomNumber1
        })
    }
    return test;
}

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

const findCompareFunctional = ( dataType, catergory, sampleData ) => {

    let compareFunctional;

    switch(dataType){
        case 'string': // do nothing sort will automatically sort strings alphabetically  
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
            compareFunctional = findCompareFunctional(typeof(sampleData[catergory]));
            break;
        case 'number': compareFunctional = category => {
            if (category) {
                return (a,b) => a[category] - b[category]
            } else {
                return (a,b) => a - b
            }
        }
            break;
        case 'boolean': compareFunctional = category => {
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
 * @param  {Boolean}    [isAscending] - to sort catergory in ascedning or descending order
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
// function useArrange(initalData){

//     const [data, setData] = useState(initalData);

//     /**
//      * this function sorts and filters data
//      */
//     const arrangeData = () => {
//         const filteredData = filter(data);
//         constsortedAndFilteredData = sort(filteredData);

//         return sortedAndFilteredData
//     }

//     useEffect(() => { 
//         setData()
//     },[])

//     return [data, setData, arrangeData ]

// }