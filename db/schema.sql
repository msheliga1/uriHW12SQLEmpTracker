-- MJS 2.15.24 URI hw 12 biz (businsess) db with 3 tables, employee, dept and role
DROP DATABASE IF EXISTS biz_db;
CREATE DATABASE biz_db;

USE biz_db;
SELECT DATABASE();

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL, 
    role_id INT,
    manager_id INT
);

CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY, 
    title VARCHAR(30), 
    salary DECIMAL, 
    department_id INT
);

CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

SHOW TABLES;

