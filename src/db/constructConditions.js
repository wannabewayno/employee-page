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
    if (role) filterCondition = { category:{ ...JSON.parse(role.trim()) } }
    if (department) filterCondition = { category:{ ...JSON.parse(department) }  }
    if (salary) {
        const { upper, lower, exact } = salary;
        if (exact === '') {
            filterCondition = { category:{ category:'salary',threshold:{ upper, lower } } }
        } else {
            filterCondition = { category:{ category:'salary',threshold:{ exact } } }
        }
    }

    const filterConditions = { query, ...filterCondition }
    const sortConditions = { isAscending, sortCategory };

    return { sortConditions, filterConditions }
}

export default constructConditions;