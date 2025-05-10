const { json } = require('express');
const fs = require('fs');
require('dotenv').config();
const { pool } = require('../config/database.postgres');

csvFilePath = process.env.CSV_FILE_PATH;

// Converting the extracted value in required nested JSON object
function parseNestedObject(headers, values) {

    const result = {};

    headers.forEach((header, idx) => {
        const keys = header.split('.'); // spliting nested keys like "name.firstName"
        let current = result;

        keys.forEach((key, i) => {   // creating nested object according to dot(.) operator
            if (i === keys.length - 1) {
                current[key] = values[idx];
            } else {
                current[key] = current[key] || {};
                current = current[key]; 
            }
        });
    });
    return result;

}

// Reading the CSV file and passing the headers & values to another function for conversion to JSON
function readCSVToJson(filePath) {
  const lines = fs.readFileSync(csvFilePath, 'utf-8').trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim()); // Extracting the headers
  return lines.slice(1).map(line => { 
    const values = line.split(',').map(v => v.trim());  // Extracting the values one-by-one from lines array
    return parseNestedObject(headers, values);
  });
}


async function loadCsvDataTODB() {

    const jsondata = readCSVToJson();

    for(const row of jsondata) {
        
        const {firstname, lastname} = row.name;
        let { age, gender } = row;

        // Creating required values to be inserted in DB
        const name = `${firstname} ${lastname}`;
        age = parseInt(age);
        const address = JSON.stringify(row.address);
        const additional_info = JSON.stringify({ gender: gender });

        const load_users = await pool.query(`INSERT INTO users (name,age,address,additional_info) VALUES ($1,$2,$3,$4)`, [name,age,address,additional_info]);

        // 1. Get all users' ages from the database
        const users = await pool.query(`SELECT age from users`);

        // 2. Create age groups: <20, 20-40, 40-60, >60
        const ageGroups = {
            '< 20': 0,
            '20 to 40': 0,
            '40 to 60': 0,
            '> 60': 0,
        };

        const totalUsers = users.rows.length;

        // 3. Loop through the users' ages and classify into groups
        users.rows.forEach(row => {
            const age = row.age;
            if (age < 20) {
                ageGroups['< 20']++;
            } else if (age >= 20 && age <= 40) {
                ageGroups['20 to 40']++;
            } else if (age > 40 && age <= 60) {
                ageGroups['40 to 60']++;
            } else {
                ageGroups['> 60']++;
            }
        });

        // 4. Calculate the percentage distribution
        const distribution = {};
        for (const group in ageGroups) {
            distribution[group] = ((ageGroups[group] / totalUsers) * 100).toFixed(2);
        }

        // 5. Print the result in the requested format
        console.log('Age-Group % Distribution');
        for (const group in distribution) {
            console.log(`${group}: ${distribution[group]}%`);
        }

    }

    return jsondata;
    
}

module.exports = {
    loadCsvDataTODB
}