const mysql = require('mysql2')
const inquirer = require('inquirer')
const cTable = require('console.table')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Senitel330--",
    database: "employees_db"
},
console.log(`Connected to the employees_db database.`))

db.connect(err => {
    if (err) console.log(err);
    init();
});

function init() {
    console.log('Inquirer will start now')
}