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

class Department {
    constructor(name) {
        this.name = name;
    }

    createNewDept () {
        db.query(`INSERT INTO department (id, name) VALUES (id, ?)`, this.name);
        db.query('SELECT * FROM department', function (err, results) {
            console.table(results);
        })
    };
}

class Role {
    constructor(title, salary, department_id) {
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }

    createNewRole () {
        db.query(`SELECT @department_id :=id FROM department WHERE name = ?`, this.department_id);
        db.query(`INSERT INTO role (id, title, salary, department_id) VALUES (id, ?, ?, @department_id)`, [this.title, this.salary]);
        db.query('SELECT * FROM role', function (err, results) {
            console.table(results);
        })
    };
}

class Employee {
    constructor(first_name, last_name, role_id, manager_id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }

    addNewEmployee () {
        // db.query(`SELECT @department_id :=id FROM department WHERE name = ?`, this.department_id);

        db.query(`SELECT @role_id :=id FROM role WHERE title = ?`, this.role_id);
        db.query("SELECT @manager_id :=id FROM employee WHERE first_name = SUBSTRING_INDEX(?, ' ', 1)", this.manager_id);
        db.query(`INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (id, ?, ?, @role_id, @manager_id)`, [this.first_name, this.last_name]);
        db.query('SELECT * FROM employee', function (err, results) {
            console.table(results);
        })
    };
}

module.exports = {
    Department,
    Role,
    Employee
}