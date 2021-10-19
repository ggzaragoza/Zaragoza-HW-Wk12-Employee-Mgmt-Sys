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
        // this.id = id;
        // this.email = email;
    }

    createNewDept () {
        db.query(`INSERT INTO department (id, name) VALUES (id, ?)`, this.name);
        db.query('SELECT * FROM department', function (err, results) {
            console.table(results);
        })
    };
    //     const getAllDepts = () => {
    //         db.execute('SELECT * FROM department', function (err, results) {
    //             console.table(results);
    //     })};
    // }

    // getName() {
    //     return this.name;
    // }

    // getId() {
    //     return this.id;
    // }
    
    // getEmail() {    
    //     return this.email;
    // }
    
    // getRole() {
    //     return 'Employee';
    // }
}

class Role {
    constructor(name) {
        this.name = name;
        // this.id = id;
        // this.email = email;
    }

    createNewDept () {
        db.query(`INSERT INTO department (name) VALUES (?)`, this.name);
        db.query('SELECT * FROM department', function (err, results) {
            console.table(results);
        })
    };
    //     const getAllDepts = () => {
    //         db.execute('SELECT * FROM department', function (err, results) {
    //             console.table(results);
    //     })};
    // }

    // getName() {
    //     return this.name;
    // }

    // getId() {
    //     return this.id;
    // }
    
    // getEmail() {    
    //     return this.email;
    // }
    
    // getRole() {
    //     return 'Employee';
    // }
}

module.exports = {
    Department,
    Role
}

// const newEmp = new Employee("Greg", 1, "greg.g.zaragoza@gmail.com");
// console.log(newEmp);
// console.log(newEmp.getRole());
// console.log(newEmp.getName());