// required imports
const mysql = require('mysql2')
const inquirer = require('inquirer')
const cTable = require('console.table')

// define database connection reqs
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Senitel330--",
    database: "employees_db"
},
)

// connect to db and launch inquirer function
db.connect(err => {
    if (err) console.log(err);
    console.log(`Connected to the employees_db database.`)
    init();
});

// Initialized inquirer with a list of prompts to help guide the user
function init() {
    console.log('Inquirer will start now')
    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        choices: [
        'View All Departments', 
        'View All Roles', 
        'View All Employees', 
        'Add A Department',
        'Add A Role',
        'Add An Employee',
        'Update An Employee Role',
        "Update An Employee's Manager",
        'View Employees By Manager',
        "View Employees By Department",
        'Delete Department',
        'Delete Role',
        'Delete Employee',
        'Exit'
    ],
        name: 'init'
    })
    .then (answer => {
        switch(answer.init){
            case 'View All Departments':
                viewAllDepartments();
            break;
            case 'View All Roles':
                viewAllRoles();
            break;
            case 'View All Employees':
                viewAllEmployees();
            break;
            case '':
                ();
            break;
            case 'Add A Department':
                addDepartment();
            break;
            case 'Add A Role':
                addRole();
            break;
            case 'Add An Employee':
                addEmployee();
            break;
            case 'Update An Employee Role':
                updateEmployeeRole();
            break;
            case "Update An Employee's Manager":
                updateEmployeeManager();
            break;
            case 'View Employees By Manager':
                viewEmployeesByManager();
            break;
            case '"View Employees By Department':
                viewEmployeesByDepartment();
            break;
            case 'Delete Department':
                deleteDepartment();
            break;
            case 'Delete Role':
                deleteRole();
            break;
            case 'Delete Employee':
                deleteEmployee();
            break;
        }
    })
}