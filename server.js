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
        message: 'Select one of the following.',
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
    var employeeQuery = 'SELECT * FROM employee';
      connection.query(employeeQuery, function(err, res) {
          if (err) throw err;
          console.table('All Employees:', res); 
          showOptions();
      })
  }
  // viewDepartments
  function viewDepartments() {
    var departmentQuery = 'SELECT * FROM department';
      connection.query(departmentQuery, function(err, res) {
          if(err)throw err;
          console.table('All Departments:', res);
          showOptions();
    })
  }

  //viewRoles
  function viewRoles() {
    var roleQuery = 'SELECT * FROM role';
      connection.query(roleQuery, function(err, res){
          if (err) throw err;
          console.table('All Roles:', res);
          showOptions();
      })
  }

  // addEmployee
function addEmployee() {
  inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'What is their first name?',
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'What is their last name?',
      },
      {
        name: 'manager_id',
        type: 'input',
        message: 'Who is this employees manager?',
      },
      {
        name: 'role',
        type: 'input',
        message: 'What is this employees role id?',
      }
    ]).then(function (answer){
      connection.query('INSERT INTO employee SET ?',
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        manager_id: answer.manager_id,
        role_id: answer.role,
      });
      var employeeQuery = 'SELECT * FROM employee';
      connection.query(employeeQuery, function(err, res){
        if (err) throw err;
        console.table('All Employees:', res);
        showOptions();
      })
    })
}

  // addDepartment
  function addDepartment() {
    inquirer
      .prompt([
        {
          name: 'newDepartment', 
          type: 'input', 
          message: 'Name of new department?'
        }
        ]).then(function (answer) {
          connection.query('INSERT INTO department SET ?',
              {
                  name: answer.newDepartment
              });

          var departmentQuery = 'SELECT * FROM department';
          connection.query(departmentQuery, function(err, res){
            if (err) throw err;
            console.table('All Departments:', res);
            showOptions();
          })              
        })
  }
  // addRole
function addRole() {
  inquirer
    .prompt([
      {
        name: 'newRole', 
        type: 'input', 
        message: 'Name of new role?'
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is Employees Salary?'
      },
      {
        name: 'Department',
        type: 'input',
        message: 'What department does this Employee work for? (Insert Department ID)'
      }
      ]).then(function (answer) {
        connection.query('INSERT INTO role SET ?',
          {
            title: answer.newRole,
            salary: answer.salary,
            department_id: answer.Department
          });
          var roleQuery = 'SELECT * FROM role';
          connection.query(roleQuery, function(err, res){
            if (err) throw err;
            console.table('All Roles:', res);
            showOptions();
          })
        })
  };
  // updateRole
  function updateRole() {

}