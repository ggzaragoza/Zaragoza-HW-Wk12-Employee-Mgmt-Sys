INSERT INTO department (id, name)
VALUES (001, "Creative"),
       (002, "Account Management"),
       (003, "Office Management"),
       (004, "Executive");

INSERT INTO role (id, title, salary, department_id)
VALUES (001, "Graphic Designer", 40000, 001),
       (002, "Senior Graphic Designer", 60000, 001),
       (003, "Graphic Design Intern", 0, 001),
       (004, "Art Director", 90000, 001),
       (005, "Account Manager", 75000, 002),
       (006, "Account Executive", 100000, 002),
       (007, "Receptionist", 0, 003),
       (008, "Office Manager", 55000, 003),
       (009, "Media Coordinator", 70000, 003),
       (010, "Accountant", 110000, 003),
       (011, "Accounts Receivable", 80000, 003),
       (012, "HR Manager", 80000, 003),
       (013, "VP of Operations", 150000, 004),
       (014, "Creative Director", 125000, 004),
       (015, "President/CEO", 1500000, 004);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Stefani", "Germanotta", 014, null),
       (002, "Beyonce", "Knowles", 013, 001),
       (003, "Rihanna", "Fenty", 004, 002),
       (004, "Britney", "Spears", 007, 001),
       (005, "Mariah", "Carey", 015, null);

       