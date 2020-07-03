import { useState, useEffect } from 'react'
const testStrings = ['Bananas','Strawberries','Peaches','Mangos','Kiwi fruits','Strawberries','Apples'];
const testNumbers = [1,5,70,1002,34,56,1,3,13,456];

console.log(testStrings);
console.log(testStrings.sort())
console.log(testNumbers.sort( (a,b) => a - b ));
console.log(testNumbers.sort( (a,b) => b - a ));


/**
 * 
 */
function useArrange(data){

    return [data, setData] = useState(data);
}