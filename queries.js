const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: 'employees_db'
    },
);

const data = require('./server.js');

const getAllDepts = () => {
    db.execute('SELECT * FROM department', function (err, results) {
        console.table(results);
})};

const getAllRoles = () => {
    db.execute('SELECT * FROM role', function (err, results) {
        console.table(results);
})};

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
})};

// const createNewDept = () => {
//     db.query(`INSERT INTO department (name) VALUES (?)`, data, function (err, results) {
//         console.table(results);
// })};

module.exports = {
    getAllDepts,
    getAllRoles,
    getAllEmployees,
    // createNewDept
};