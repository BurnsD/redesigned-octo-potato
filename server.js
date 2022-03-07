// Dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
require('dotenv').config();
var confirm = require('inquirer-confirm');

const connection = mysql.createConnection(
  {
    host: 'localhost',
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PW

  },
);
console.log("You have connected to the database for the Employee Tracker: " + process.env.DB_NAME)

// Show all options 
function start() {
  console.log("app has started")
  inquirer.prompt(
    {
      type: 'list',
      name: 'option',
      message: 'Select one of the following.',
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        {
          name: "Update Role",
          value: "UPDATE_ROLE"
        },
        {
          name: "Update Employee",
          value: "UPDATE_EMPLOYEE"
        }
      ]
    }).then(answer => {
      console.log("Looking for an answer");
      switch (answer.option) {
        case "VIEW_EMPLOYEES":
          connection.query('SELECT * FROM employee', function (err, results) {
            console.table(results);
            Contapp();
          });
          break;
        case "VIEW_DEPARTMENTS":
          connection.query('SELECT * FROM department', function (err, results) {
            console.table(results);
            Contapp();
          });
          break;
        case "VIEW_ROLES":
          connection.query('SELECT * FROM roles', function (err, results) {
            console.table(results);
            Contapp();
          });
          break;
        case "ADD_DEPARTMENT":
          inquirer
            .prompt({
              type: 'input',
              message: 'What is the name of the department to add:',
              name: 'newDept'
            })
            .then((answers) => {
              newDept = answers.newDept
              connection.query(`INSERT INTO department (name) VALUES ("${newDept}");`, function (err, results) {
                console.log(newDept + " has been added to the department table");
                if (err) throw err;
                console.log("1 record inserted")
                Contapp();
              });
            })
          break;
        case "ADD_ROLE":
          inquirer
            .prompt([
              {
                type: 'input',
                message: 'What is the name of the role to add:',
                name: 'newRole',
              },
              {
                type: 'input',
                message: 'What is the salary for the role to add:',
                name: 'newSalary',
              },
              {
                type: 'input',
                message: 'What is the dept id for the role to add:',
                name: 'newDeptId',
              },
            ])
            .then((answers) => {
              newRole = answers.newRole
              newSalary = answers.newSalary
              newDeptId = answers.newDeptId
              connection.query(`INSERT INTO roles (title, salary, department_id) 
                        VALUES ("${newRole}", "${newSalary}", ${newDeptId});`, function (err, results) {
                console.log(newRole + " has been added to the role table");
                if (err) throw err;
                console.log("1 record inserted")
                Contapp();
              });
            })
          break;
        case "ADD_EMPLOYEE":
          inquirer
            .prompt([
              {
                type: 'input',
                message: 'What is the first name of the employee to add:',
                name: 'newFName',
              },
              {
                type: 'input',
                message: 'What is the last name for the employee to add:',
                name: 'newLName',
              },
              {
                type: 'input',
                message: 'What is the role id for the employee to add:',
                name: 'newRoleId',
              },
              {
                type: 'input',
                message: 'What is the manager id of the employee to add:',
                name: 'newMgrId',
              },
            ])
            .then((answers) => {
              newFName = answers.newFName
              newLName = answers.newLName
              newRoleId = answers.newRoleId
              newMgrId = answers.newMgrId
              connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                            VALUES ("${newFName}", "${newLName}",${newRoleId}, ${newMgrId});`,
                function (err, results) {
                  console.log(newFName + " " + newLName + " has been added to the employee table");
                  if (err) throw err;
                  console.log("1 record inserted")
                  Contapp();
                });
            })
          break;
        case "UPDATE_EMPLOYEE":
          inquirer
            .prompt([
              {
                type: 'input',
                message: 'Enter the id of an employee to update:',
                name: 'targetEmpId',
              },
              {
                type: 'input',
                message: 'What is the new role id for this employee:',
                name: 'newRoleId',
              },
            ])
            .then((answers) => {
              targetEmpId = answers.targetEmpId
              newRoleId = answers.newRoleId
              connection.query(`UPDATE employee 
                            SET role_id = ${newRoleId}
                            WHERE id = ${targetEmpId};`,
                function (err, results) {
                  console.log("Employee id " + targetEmpId + " has been updated with the new role " + newRoleId);
                  if (err) throw err;
                  console.log("1 record inserted")
                  Contapp();
                });
            })
          break;
        default:
          console.log("No valid option chosen.");
      }
    });
};

function Contapp() {
  confirm("Continue?")
    .then(function confirmed() {
      start();
    }, function cancelled() {
      console.log("Goodbye!");
    });
};

start();
