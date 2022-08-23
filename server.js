const express = require('express');
const DB = require('./config/connection');
const { prompt } = require('inquirer');
const { printTable } = require('console-table-printer');

const mainMenu = () => {
  prompt({
    type: 'list',
    name: 'direction',
    message: 'What would you like?',
    choices: ['view depts', 'view roles', 'view employees', 'view company', 'add department', 'add role', 'add employee'],
  }).then(answer => {
    if (answer.direction === 'view depts') {
      viewDepts();
    } else if (answer.direction === 'view roles') {
      viewRoles();
    } else if (answer.direction === 'view employees') {
      viewEmploy();
    } else if (answer.direction === 'view company') {
      viewComp();
    } else if (answer.direction === 'add department') {
      addDept();
    } else if (answer.direction === 'add employee') {
      addEmp();
    } else if (answer.direction === 'add role') {
      addRole();
    }
  })
};
const viewDepts = () => {
  DB.promise().query('SELECT * FROM department').then(([results]) => {
    printTable(results)
    mainMenu();
  });
};
const viewRoles = () => {
  DB.promise().query('SELECT * FROM role').then(([results]) => {
    printTable(results)
    mainMenu();
  });
};
const viewEmploy = () => {
  DB.promise().query('SELECT * FROM employee').then(([results]) => {
    printTable(results)
    mainMenu();
  });
};
const viewComp = () => {
  DB.promise().query('SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id').then(([results]) => {
    printTable(results)
    mainMenu();
  });
};

const addDept = () => {
  prompt({
    type: 'input',
    name: 'depts',
    message: 'What department would you Like to add?',
  }).then(answer => {
    console.log(answer.depts);
    DB.promise().query('INSERT INTO department (name) VALUES (?)', answer.depts)
      viewDepts();  
  });
};

const addEmp = () => {
  prompt([{
    type: 'input',
    name: 'firstName',
    message: 'What is the new Employee First Name?',
  },
  {
    type: 'input',
    name: 'lastName',
    message: 'What is the new Employee Last Name?',
  },
  {
    type: 'input',
    name: 'newRole',
    message: 'What is the new Employee Role ID?',
  },
  {
    type: 'input',
    name: 'manager',
    message: 'What is the new Employee Manager ID',
  },
]).then(answer => {
    const newEmployee = [answer.firstName, answer.lastName, answer.newRole, answer.manager
    ];
    DB.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', newEmployee)
      viewEmploy();  
  });
};

const addRole = () => {
  prompt([{
    type: 'input',
    name: 'roleName',
    message: 'What is the new Role Title?',
  },
  {
    type: 'input',
    name: 'newSalary',
    message: 'What is the Salary for the new Role?',
  },
  {
    type: 'input',
    name: 'deptID',
    message: 'What is the new Roles department ID?',
  },
]).then(answer => {
    const newRole = [answer.roleName, answer.newSalary, answer.deptID
    ];
    DB.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', newRole)
      viewRoles();  
  });
};





mainMenu();
