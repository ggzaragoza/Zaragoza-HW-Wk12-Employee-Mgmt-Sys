const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

// const PORT = process.env.PORT || 3001;
// const app = express();
const queries = require('./queries.js');
const { Department, Role, Employee } = require('./classes.js');

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    multipleStatements: true,
    database: 'employees_db'
  },
//   console.log(`Connected to the classlist_db database.`)
);


initSystem = () => {
  inquirer
    .prompt([
        {
            type: 'list',
            message: "Welcome to the Employee Management System. What would you like to do?",
            name: 'employeeOptions',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Create New Department', 'Create New Role', 'Add New Employee', 'Quit']
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
      } else if (data.employeeOptions === 'Create New Role') {
        askNewRole();
      } else if (data.employeeOptions === 'Add New Employee') {
        askNewEmp();
      } else {
        process.exit;
      }
    });
};

function getDepartments() {
  return new Promise((resolve, reject) => {
    db.query(`SELECT name FROM department`, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

function getRoles() {
  return new Promise((resolve, reject) => {
    db.query(`SELECT title FROM `, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

// getRoles = () => {
//   let allRoles = [];

//   db.query('SELECT title FROM role', (err, results) => {
//     return allRoles.push(results)
//   });
// };

// function getRoles() {
//   return new Promise((resolve, reject) => {
//     db.query(`SELECT title FROM role`, (err, res) => {
//       if (err) reject(err);
//       resolve(res);
//     });
//   });
// }

// db.query('SELECT title FROM role', function (err, results) {
//   const getRoles = results.map(role => {
//     return `${role.title}`
//   })}
// )

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

askNewRole = () => {

  getDepartments().then(deptData =>

    inquirer
    .prompt([
        {
            type: 'input',
            message: "Wnat title will this new position hold? (required)",
            name: 'newTitle',
            validate: (input) => {
                if (input === '') {
                    return console.log('Please enter a title for this new position.')
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            message: "Please specify the projected salary for this new position. (required)",
            name: 'newSalary',
            validate: (input) => {
                if (input === '') {
                    return console.log('Please enter a salary number.')
                } else {
                    return true;
                }
            }
        },
        {
            type: 'list',
            message: 'In which department will this new role be created?',
            name: 'newRoleDept',
            choices: deptData
        }
    ])
    .then((data) => {
      // if (data.newDept) {
        const newRole = new Role(data.newTitle, data.newSalary, data.newRoleDept);
        newRole.createNewRole();
      // }
    })

  )

    
// initSystem();
}

askNewEmp = () => {
  const addRoleInfo = `SELECT title FROM role; SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS full_name FROM employee`

  db.query(addRoleInfo, (err, results) => {
    if (err) throw (err);

    inquirer
      .prompt([
          {
              type: 'input',
              message: "Wnat is the new employee's first name? (required)",
              name: 'empFirstName',
              validate: (input) => {
                  if (input === '') {
                      return console.log('A name for the employee is required.')
                  } else {
                      return true;
                  }
              }
          },
          {
              type: 'input',
              message: "What is the new employee's last name? (required)",
              name: 'empLastName',
              validate: (input) => {
                  if (input === '') {
                      return console.log('A name for the employee is required.')
                  } else {
                      return true;
                  }
              }
          },
          {
              type: 'list',
              message: 'What title will the new employee hold?',
              name: 'empRole',
              choices: function () {
                let roleChoices = results[0].map(role => role.title);
                return roleChoices;
              }
          },
          {
              type: 'list',
              message: "Who is the new employee's manager?",
              name: 'empManager',
              choices: function () {
                let mgrChoices = results[1].map(employee => employee.full_name);
                return mgrChoices;
              }
          }
      ])
      .then((data) => {
        // if (data.newDept) {
          const newEmp = new Employee(data.empFirstName, data.empLastName, data.empRole, data.empManager);
          newEmp.addNewEmployee();
        // }
      })
    


    })

  // getRoles().then(roleData =>

  // function getRoles() {
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT first_name FROM employee`, (err, res) => {
  //       if (err) reject(err);
  //       resolve(res);
  //     });
  //   });
  // }

  // function getEmployees() {
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT
  //     CONCAT(employee.first_name, ' ', employee.last_name)
  //     FROM employee`, (err, res) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(res);
  //       }
  //     });
  //   });
  // }


      // initSystem();
}

initSystem();