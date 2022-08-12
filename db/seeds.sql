USE business_db;
INSERT INTO department(name) VALUES ("accouting"), ("sales"), ("engineering"), ("legal");
INSERT INTO role(title, salary, department_id) VALUES ("Accountant", 95000, 1), ("Account Manager", 65000, 1), ("Sales Rep", 75000, 2), ("Sales Lead", 125000, 2), ("Junior Developer", 48000, 3), ("Senior Software Developer", 175000, 3 ), ("Legal Assistant", 35000, 4), ("Lawyer", 175000, 4);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Fred", "Willard", 1, NULL), ("Catherine", "O'Hara", 2, 1), ("Christopher", "Guest", 3,1), ("Parker", "Posey",4, 1)
