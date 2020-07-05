// this file mimics results from an API call
import { v4 as uuidv4 } from 'uuid';
const faker = require('faker');

const generateEmail = (fullName) => {
    fullName = fullName.split(' ').filter(name => {
        return name.match(/^Mrs.$|^Dr.$|^Mr.$|^Miss$|^Ms.$|^Sr.$|^Mr.$|^I$|^II$|^III$|^IV$|^V$|^VI$|^VII$|^Jr.$|^DDS$|^DVM$/g)||[].length > 0 ? false : true
    }).map(name => name.toLowerCase());

    const emailSuffix = ['@hotmail.com','@gmail.com','@yahoo.com'];

    return fullName.join('.') + emailSuffix[Math.floor(Math.random()*emailSuffix.length)];
}

const generateSalary = range => {
    return Math.round((Math.random()*(range[1] - range[0]) + range[0])/1000)*1000;
}

export const generateData = N => {
    const data = [];
    for (let index = 0; index < N ; index++) {
        const randomNumber = Math.floor(Math.random()*69)+1
        const fullName = faker.name.findName();
        data.push({
            id: uuidv4(),
            name: fullName,
            role: faker.name.title(),
            salary: generateSalary([40_000,160_000]),
            email: generateEmail(fullName),
            image: `https://i.pravatar.cc/200img=${randomNumber}`,
            department: faker.commerce.department()
        })
    }
    return data;
}
