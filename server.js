const express = require('express');
const DB = require('./config/connection');
const { prompt } = require('inquirer');
const { printTable } = require('console-table-printer');

const mainMenu = () => {
  prompt({
    type: 'list',
    name: 'direction',
    message: 'What would you like?',
    choices: ['view depts', 'view roles', 'view employees', 'view company', 'add department'],
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
      mainMenu();  
  });
};

// const addDept = () => {
//   prompt({
//     type: 'input',
//     name: 'depts',
//     message: 'What department would you Like to add?',
//   }).then(answer => {
//     console.log(answer.depts);
//     DB.promise().query('INSERT INTO department (name) VALUES (?)', answer.depts)
//       mainMenu();  
//   });
// };






mainMenu();
