-- RETURNS ALL EMPLOYEES AND EMPLOYEE INFO
SELECT
  e1.id AS id
  e1.first_name AS first_name,
  e1.last_name AS last_name,
  role.title AS title,
  department.name AS department,
  role.salary AS salary,
  CONCAT(e2.first_name, ' ', e2.last_name) AS manager
FROM employee AS e1
JOIN role ON e1.role_id = role.id
JOIN department ON role.department_id = department.id
LEFT OUTER JOIN employee AS e2 ON e2.id = e1.manager_id;

