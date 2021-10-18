INSERT INTO department (id, name)
VALUES (001, "Pop"),
       (002, "R&B"),
       (003, "Indie"),
       (004, "Hyperpop"),
       (005, "Country");

INSERT INTO role (id, title, salary, department_id)
VALUES (001, "Singer", 100000, 002),
       (002, "Songwriter", 200000, 003),
       (003, "Vocalist", 85000, 001),
       (004, "Lip Syncer", 10, 004),
       (005, "Icon", 3000000, 005);

INSERT INTO employee (id, first_name, last_name, manager_id, role_id)
VALUES (001, "Stefani", "Germanotta", 005, 001),
       (002, "Beyonce", "Knowles", 001, 002),
       (003, "Rihanna", "Fenty", 003, 003),
       (004, "Britney", "Spears", 004, 004),
       (005, "Mariah", "Carey", 005, 005);

       