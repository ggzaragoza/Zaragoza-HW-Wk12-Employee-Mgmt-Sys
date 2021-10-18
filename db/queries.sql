SELECT
  employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title
FROM employee
JOIN role ON employee.role_id = role.id;

