import filter from './filter'
import sort from './sort'

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