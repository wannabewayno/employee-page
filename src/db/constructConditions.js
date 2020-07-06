/**
 * Constructs sort and filter conditions from the submitted formData
 * 
 * @param  {Object} formData - data from the form container
 * @return {Object} - and object of objects { sortConditions, filterConditions };
 */
function constructConditions (formData) {
    const { isAscending, category, query } = formData
    const filterConditions = { query }
    const sortConditions = { isAscending, category };
    return { sortConditions, filterConditions }
}

export default constructConditions;