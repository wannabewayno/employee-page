/**
 * finds all data of type
 * @param  {Array<objects>} data - an array of data objects
 * @param  {String}         type - key of data to find
 * @return {Array<any>}          - array of unique data 
 */
function findDataOfType(data,type){
    const dataTypes = [ ...new Set(data.map(item => item[type])) ];
    return dataTypes;
}

export default findDataOfType;