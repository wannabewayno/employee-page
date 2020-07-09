// this file mimics results from an API call
import { v4 as uuidv4 } from 'uuid';
import findDataOfType from './findDataOfType';
import generatePastel from '../lib/generatePastel';
import randomNumberWithinRange from '../lib/randomNumberWithinRange';

const faker = require('faker');

const generateEmail = (fullName) => {
    fullName = fullName.split(' ').filter(name => {
        return name.match(/^Mrs.$|^Dr.$|^Mr.$|^Miss$|^Ms.$|^Sr.$|^Mr.$|^I$|^II$|^III$|^IV$|^V$|^VI$|^VII$|^Jr.$|^DDS$|^DVM$/g)||[].length > 0 ? false : true
    }).map(name => name.toLowerCase());

    const emailSuffix = ['@hotmail.com','@gmail.com','@yahoo.com'];

    return fullName.join('.') + emailSuffix[Math.floor(Math.random()*emailSuffix.length)];
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
            roleColour:'hsla(0,0,0%,0)',
            salary: randomNumberWithinRange([30_000,250_000],1000),
            email: generateEmail(fullName),
            image: `https://i.pravatar.cc/200img=${randomNumber}`,
            department: faker.commerce.department()
        })
    }

    // find all uniaue roles
    const allRoles = findDataOfType(data,'role');

    //for each role, generate a random pastel colour and associate it with that role
    const roleColours = {}
    allRoles.forEach(role => roleColours[role] = generatePastel());

    data.map(item => {
        const { role } = item
        item.roleColour = roleColours[role];
        return item 
    })

    return data;
}

