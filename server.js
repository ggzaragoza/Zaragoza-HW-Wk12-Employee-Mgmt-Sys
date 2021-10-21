const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

const { Department, Role, Employee } = require('./classes.js');

const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    multipleStatements: true,
    database: 'employees_db'
  },
);


startMessage = () => {
  console.log("Welcome to your employee management system. Here you can view and organize your fellow employees within your company.");
  initSystem();
}


const initSystem = () => {
  inquirer
    .prompt([
        {
            type: 'list',
            message: "Please select an option.",
            name: 'employeeOptions',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Create New Department', 'Create New Role', 'Add New Employee', 'Quit']
        }
    ])
    .then((data) => {
      if (data.employeeOptions === 'View All Departments') {
        getAllDepts();
      } else if (data.employeeOptions === 'View All Roles') {
        getAllRoles();
      } else if (data.employeeOptions === 'View All Employees') {
        getAllEmployees();
      } else if (data.employeeOptions === 'Create New Department') {
        askNewDept();
      } else if (data.employeeOptions === 'Create New Role') {
        askNewRole();
      } else if (data.employeeOptions === 'Add New Employee') {
        askNewEmp();
      } else {
        process.exit;
      }
    })
};


function getDepartments() {
  return new Promise((resolve, reject) => {
    db.query(`SELECT name FROM department`, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}


const getAllDepts = () => {
  db.query('SELECT * FROM department', function (err, results) {
      console.log();
      console.table(results);
  });

  let promise = new Promise((resolve, reject) => {
    setTimeout(function() {
        resolve(initSystem());
    }, 500);
  });
  promise.then(function(data) {
    return data
  }); 
};


const getAllRoles = () => {
  db.query('SELECT * FROM role', function (err, results) {
      console.table(results);
  });

  let promise = new Promise((resolve, reject) => {
    setTimeout(function() {
        resolve(initSystem());
    }, 500);
  });
  promise.then(function(data) {
    return data
  });
};


const getAllEmployees = () => {
  db.query(`
  SELECT
    e1.id AS id,
    e1.first_name AS first_name,
    e1.last_name AS last_name,
    role.title AS title,
    department.name AS department,
    role.salary AS salary,
    CONCAT(e2.first_name, ' ', e2.last_name) AS manager
  FROM employee AS e1
  JOIN role ON e1.role_id = role.id
  JOIN department ON role.department_id = department.id
  LEFT OUTER JOIN employee AS e2 ON e2.id = e1.manager_id;`, function (err, results) {
      console.table(results);
  });

  let promise = new Promise((resolve, reject) => {
    setTimeout(function() {
        resolve(initSystem());
    }, 500);
  });
  promise.then(function(data) {
    return data
  });
};


const askNewDept = () => {
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
        const newDepartment = new Department(data.newDept);
        newDepartment.createNewDept();

        let promise = new Promise((resolve, reject) => {
          setTimeout(function() {
              resolve(initSystem());
          }, 2000);
        });
        promise.then(function(data) {
          return data
        });
    });
};


askNewRole = () => {

  getDepartments()
  .then(deptData =>

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
          const newRole = new Role(data.newTitle, data.newSalary, data.newRoleDept);
          newRole.createNewRole();

          let promise = new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve(initSystem());
            }, 2000);
          });
          promise.then(function(data) {
            return data
          });
      })
  );
};


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
          const newEmp = new Employee(data.empFirstName, data.empLastName, data.empRole, data.empManager);
          newEmp.addNewEmployee();

          let promise = new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve(initSystem());
            }, 2000);
          });
          promise.then(function(data) {
            return data
          });
      })
  });
};


startMessage();