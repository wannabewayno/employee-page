/**
 * Constructs sort and filter conditions from the submitted formData
 * 
 * @param  {Object} formData - data from the form container
 * @return {Object} - and object of objects { sortConditions, filterConditions };
 */
function constructConditions (formData) {
    const { isAscending, category, query, role, department, salary } = formData
    const filterConditions = { query, role, department, salary }
    
    console.log(filterConditions);
    const sortConditions = { isAscending, category };
    console.log(sortConditions);

    return { sortConditions, filterConditions }
}

export default constructConditions;