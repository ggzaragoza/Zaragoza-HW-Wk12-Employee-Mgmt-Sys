const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
// const app = express();

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
db.query('SELECT * FROM students', function (err, results) {
  console.log(results);
});

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
