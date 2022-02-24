INSERT INTO department(department_name)
VALUES 
('Game Design'), 
('Game Balance'),
('Marketing'), 
('Art'),
('Admin'), 
('Data');

INSERT INTO role(title, salary, department_id)
VALUES 
('Design Lead', 160000, 1),
('Game Designer', 100000, 1),
('Balance Lead', 150000, 2),
('Balance Developer', 110000, 2),
('Sales Lead', 125000, 3),
('Marketing Consultant', 95000, 3),
('Lead Artist', 110000, 4),
('Senior Artist', 90000, 4),
('Junior Artist', 60000, 4),
('Administrative Senior Specialist', 175000, 5),
('Administrative Assistant', 100000, 5),
('Senior Data Engineer', 155000, 6),
('Data Scientist', 120000, 6);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('John', 'Gotts', 1, NULL),
('Bill', 'Jones', 2, 1),
('Adam', 'Aboudi', 3, NULL),
('Liam', 'Mulhuhan', 4, 3),
('Max', 'Dudek', 5, NULL),
('Blair', 'Cronc', 6, 5),
('Sarah', 'Vyne', 7, NULL),
('Samuel', 'Jig', 8, 7),
('Herah', 'Keita', 9, 7),
('Jeff', 'Blanda', 10, NULL),
('Steven', 'Kravitz', 11, 10),
('Darian', 'Mbuut', 12, NULL),
('DJ', 'Jones', 13, 12);