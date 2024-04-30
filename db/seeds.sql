-- MJS 2.15.24 URI hw 12 biz (businsess) db with 3 tables, employee, dept and role
INSERT INTO department (id, name) 
VALUES  (001, "Accounting"), 
        (002, "Engineering"), 
        (003, "Financing"),
        (004, "Maintainenece"), 
        (005, "Management"),
        (006, "Programming");
SELECT * FROM department;

INSERT INTO role (id, title, salary, department_id)
VALUE   (001, "Java Programmer", 8000, 006),
        (002, "Node Programmer",    5000, 006), 
        (003, "Big Boss",        9000, 005), 
        (004, "Mid Boss",        7000, 005);
SELECT * FROM role;

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE   (001, "Mike", "Sheliga", 001, 002), 
        (002, "Andrew", "Bautista", 002, 003), 
        (003, "Mom",  "Sheliga", 003, 003), 
        (004, "Bo",  "BoLast", 004, 003);
-- UPDATE employee SET first_name = "UpdateName"; 

SELECT * FROM employee;
