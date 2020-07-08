import filter from "./filter";

/**
 * Constructs sort and filter conditions from the submitted formData
 * 
 * @param  {Object} formData - data from the form container
 * @return {Object} - and object of objects { sortConditions, filterConditions };
 */
function constructConditions (formData) {
    const { isAscending, sortCategory, role, department, salary } = formData
    let { query } = formData
    let filterCondition;
    if (!query) query = '';
    if (role) filterCondition = { category:{ ...role } }
    if (department) filterCondition = { category:{ ...department }  }
    if (salary) filterCondition = { category:{ ...salary } }

    const filterConditions = { query, ...filterCondition }
    console.log(filterConditions);

    const sortConditions = { isAscending, sortCategory };
    console.log(sortConditions);

    return { sortConditions, filterConditions }
}

export default constructConditions;