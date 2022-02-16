// Dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
require('dotenv').config();

// Start Application
connection.connect(function(err){
    if (err) throw err;
    start();
  })
  
// Show all options 
function start() {
    inquirer
      .prompt({
        name: 'list',
        type: 'option',
        message: '',
        choices: [
          'View all employees',
          'View all departments',
          'View all roles',
          'Add an employee',
          'Add a department',
          'Add a role',
          'Update employee role',
          ]
        }).then(function (answer) {
            switch (answer.action) {
              case 'View all employees':
                  viewEmployees();
                  break;
              case 'View all departments':
                  viewDepartments();
                  break;
              case 'View all roles':
                  viewRoles();
                  break;
              case 'Add an employee':
                  addEmployee();
                  break;
              case 'Add a department':
                  addDepartment();
                  break;
              case 'Add a role':
                  addRole();
                  break;
              case 'Update employee role':
                  updateRole();
                  break;
            }
      });
  };
  
  // viewEmployees
  function viewEmployees() {

}

  // viewDepartments
  function viewDepartments() {

}

  //viewRoles
  function viewRoles() {

}

  // addEmployee
  function addEmployee() {

}

  // addDepartment
  function addDepartment() {

}
  // addRole
  function addRole() {

}

  // updateRole
  function updateRole() {

}