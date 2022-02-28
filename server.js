// required imports
const mysql = require('mysql2')
const inquirer = require('inquirer')
const cTable = require('console.table')
const util = require('util')

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
    if (err) console.table(err);
    console.table(`Connected to the employees_db database.`)
    init();
});

// Initialized inquirer with a list of prompts to help guide the user
function init() {
    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        choices: 
        [
        'View All Departments', 
        'View All Roles', 
        'View All Employees', 
        'Add A Department',
        'Add A Role',
        'Add An Employee',
        'Update An Employee Role',
        // "Update An Employee's Manager",
        // 'View Employees By Manager',
        // "View Employees By Department",
        // 'Delete Department',
        // 'Delete Role',
        // 'Delete Employee',
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
            // case "Update An Employee's Manager":
            //     updateEmployeeManager();
            // break;
            // case 'View Employees By Manager':
            //     viewEmployeesByManager();
            // break;
            // case '"View Employees By Department':
            //     viewEmployeesByDepartment();
            // break;
            // case 'Delete Department':
            //     deleteDepartment();
            // break;
            // case 'Delete Role':
            //     deleteRole();
            // break;
            // case 'Delete Employee':
            //     deleteEmployee();
            // break;
            case 'Exit':
                db.end()
                console.table('Thank you for using Employee Tracker!')
            break;
        }
    })
}

// Build Switch Case functions in order.

const viewAllDepartments = () => {
    db.query('SELECT department_name FROM employees_db.department', (err, result) => {
        if (err) {
            console.table(err)
        }
        console.table(result)
        init()
    })
}

const viewAllRoles = () => {
    db.query('SELECT title, salary FROM employees_db.role', (err, result) => {
        if (err) {
            console.table(err)
        }
        console.table(result)
        init()
    })
}

const viewAllEmployees = () => {
    db.query('SELECT employee.id, employee.first_name , employee.last_name, role.title, department.department_name , role.salary , employee.manager_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id', (err, result) => {
        if (err) {
            console.table(err)
        }
        console.table(result)
        init()
    })
}

const addDepartment = async () => {
    try {
        let question = await inquirer.prompt([
            {
                type: 'input',
                message: "What is the name of the department you'd like to add?",
                name: 'departmentName'
            }
        ])
        db.query('INSERT INTO department SET ?', { department_name: question.departmentName })
        console.table('Department Successfully Added!')
        init()
    } catch (err) {
        console.table(err)
        init()
    }
}


// Attempt at dynamically pulling department data vs hard coding.
// const addRole = async () => {
//     try {
//         db.query('SELECT * FROM department', (err, res) => {
//             const departmentView = res.map(( { id, department_name }) => ({
//                 value: id,
//                 name: `${id} ${department_name}`
//             }))
//         })
        
//         let question = await inquirer.prompt ([
//             {
//                 type: 'input',
//                 message: 'What is the title of the new role?',
//                 name: 'title'
//             },
//             {
//                 type: 'input',
//                 message: 'What is the salary of this new role?',
//                 name: 'salary'
//             },
//             {
//                 name: 'departmentId',
//                 type: 'list',
//                 choices: departmentView, 
//                 message: 'Which department is this role a part of?'
                
//             }
//         ])
//         db.query('INSERT INTO role SET ?', {
//             title: question.title,
//             salary: question.salary,
//             department_id: question.departmentId
//         })
//         console.table('Role Successfully Added!')
//         init()
//     } catch (err){
//         console.table(err)
//         init()
//     }
// }

const addRole = async () => {
    try {
        let question = await inquirer.prompt ([
            {
                type: 'input',
                message: 'What is the title of the new role?',
                name: 'title'
            },
            {
                type: 'input',
                message: 'What is the salary of this new role?',
                name: 'salary'
            },
            {
                name: 'departmentId',
                type: 'list',
                choices: ['1', '2', '3', '4', '5', '6'],
                message: 'Which department is this role a part of? 1: Game Design 2: Game Balance 3: Marketing 4: Art 5: Admin 6: Data' 
            }
        ])
        // console.log(question)
        db.query('INSERT INTO role SET title = ?, salary = ?, department_id = ?', [question.title, question.salary, question.departmentId])
        console.table('Role Successfully Added!')
        init();
    } catch (err) {
        console.table(err)
        init()
    }
}

const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the employee's first name?",
                name: 'firstName',
            },
            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'lastName',
            },
            {
                type: 'list',
                message: "What is the employee's role? 1: Design Lead | 2: Game Designer | 3: Balance Lead | 4: Balance Developer | 5: Sales Lead | 6: Marketing Consultant | 7: Lead Artist | 8: Senior Artist | 9: Junior Artist | 10: Administrative Senior Specialist | 11: Administrative Assistant | 12: Senior Data Engineer | 13: Data Scientist",
                choices: ['1','2','3','4','5','6','7','8','9','10','11','12','13'],
                name: 'roleId',
            },
            {
                type: 'list',
                message: "Whp is the employee's manager? 1: John Gotts | 3: Adam Aboudi | 5: Max Dudek | 7: Sarah Vyne | 10: Jeff Blanda | 12: Darian Mbuut",
                choices: ['1', '3', '5', '7', '10', '12'],
                name: 'managerId',
            }
        ])
        .then((answer) => {
            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answer.firstName, answer.lastName, answer.roleId, answer.managerId], (err, res) => {
                if (err) {
                    console.table(err);
                }
                console.table('New Employee Successfully Added!')
                init()
            })
        })
}

const updateEmployeeRole = () => {
        inquirer.prompt ([
            {
                type: 'list',
                message: "Which employee's role would you like to update? 1: John Gotts | 2: Bill Jones | 3: Adam Aboudi | 4: Liam Mulhuhan | 5: Max Dudek | 6: Blair Cronc | 7: Sarah Vyne | 8: Samuel Jig | 9: Herah Keita | 10: Jeff Blanda | 11: Steven Kravitz | 12: Darian Mbuut | 13: DJ Jones",
                choices: ['1','2','3','4','5','6','7','8','9','10','11','12','13'],
                name: 'employeeId'
            },
            {
                type: 'list',
                message: 'What is their new role? 1: Design Lead | 2: Game Designer | 3: Balance Lead | 4: Balance Developer | 5: Sales Lead | 6: Marketing Consultant | 7: Lead Artist | 8: Senior Artist | 9: Junior Artist | 10: Administrative Senior Specialist | 11: Administrative Assistant | 12: Senior Data Engineer | 13: Data Scientist',
                choices: ['1','2','3','4','5','6','7','8','9','10','11','12','13'],
                name: 'roleId'
            }
        ])
        .then((answer) => {
            db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.roleId, answer.employeeId], (err, res) => {
                if(err) {
                    console.table(err);
                }
                console.table("Your employee's role has been updated!")
                init();
            })
        })
}
