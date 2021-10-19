const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

// const PORT = process.env.PORT || 3001;
// const app = express();
const queries = require('./queries.js');
const classes = require('./classes.js');
const { Department, Role } = require('./classes.js');

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'employees_db'
  },
//   console.log(`Connected to the classlist_db database.`)
);

// Query database
// db.execute('SELECT * FROM department', function (err, results) {
//   console.table(results);
// });

// db.execute('SELECT * FROM role', function (err, results) {
//   console.table(results);
// });

// db.query('SELECT * FROM employee', function (err, results) {
//   console.table(results);
// });

// db.execute('SELECT * FROM employee', function (err, results) {
//   console.table(results);
// });

// console.table(department);

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

initSystem = () => {
  inquirer
      .prompt([
          {
              type: 'list',
              message: "Welcome to the Employee Management System. What would you like to do?",
              name: 'employeeOptions',
              choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Create New Department', 'Quit']
          }
      ])
      .then((data) => {
        if (data.employeeOptions === 'View All Departments') {
          queries.getAllDepts();
        } else if (data.employeeOptions === 'View All Roles') {
          queries.getAllRoles();
        } else if (data.employeeOptions === 'View All Employees') {
          queries.getAllEmployees();
        } else if (data.employeeOptions === 'Create New Department') {
          askNewDept();
        }
      });
};

askNewDept = () => {
  inquirer
    .prompt([
        {
            type: 'input',
            message: "Wnat is the name of your company's new Department? (required)",
            name: 'newDept',
            validate: (input) => {
                if (input === '') {
                    return console.log('Please enter a new Department name.')
                } else {
                    return true;
                }
            }
        }
    ])
    .then((data) => {
      // if (data.newDept) {
        const newDepartment = new Department(data.newDept);
        newDepartment.createNewDept();
      // }
    });
    

      // initSystem();
}

initSystem();