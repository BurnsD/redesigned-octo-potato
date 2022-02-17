USE employees_db;

INSERT INTO department (name)
VALUES 
('HR'),
('Sales'),
('Engineering'),
('Legal'),
('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES
('HR Mangaer', 65000, 1);
('HR Specialist', 55000, 1);
('Sales Manager', 73500, 2);
('Sales Team', 55000, 2);
('Software Engineer', 120000, 3);
('Lawyer', 175000, 4);
('Marketing Specialist', 120000, 5)


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Doe', 1, 007),
('Jane', 'Doe', 5, 007),
('Alex', 'Smith', 3, 808),
('Eric', 'Garcia', 4, 303),
('Dwight', 'Anderson', 6, 303),
('Andrea', 'Cortez', 2, 777),