// Dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
require('dotenv').config();
var confirm = require('inquirer-confirm');

const connection = mysql.createConnection(
  {
      host: 'localhost',
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PW

  },
  console.log("You have connected to the database for the Employee Tracker: " + process.env.DB_Name)
);


// Show all options 
function start() {
    inquirer
      .prompt([
        {
        name: 'option',
        type: 'list',
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
        ]
      }
    ]).then(function (answer) {
      console.log('here is answer:', answer)
            switch (answer.option) {
              case 'VIEW_EMPLOYEES':
                  viewEmployees();
                  break;
              case 'VIEW_DEPARTMENTS':
                  viewDepartments();
                  break;
              case 'VIEW_ROLES':
                  viewRoles();
                  break;
              case 'ADD_EMPLOYEE':
                  addEmployee();
                  break;
              case 'ADD_DEPARTMENT':
                  addDepartment();
                  break;
              case 'ADD_ROLE':
                  addRole();
                  break;
              case 'UPDATE_ROLE':
                  updateRole();
                  break;
            }
      });
  };
  
 // View all employees
function viewEmployees() {
  connection.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => start());
}

  // viewDepartments
  function viewDepartments() {
    var departmentQuery = 'SELECT * FROM department';
      connection.query(departmentQuery, function(err, res) {
          if(err)throw err;
          console.table('All Departments:', res);
          confirmCont();
    })
  }

  //viewRoles
  function viewRoles() {
    var roleQuery = 'SELECT * FROM role';
      connection.query(roleQuery, function(err, res){
          if(err)throw err;
          console.table('All Roles:', res);
          confirmCont();
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
        confirmCont();
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
            confirmCont();
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
            confirmCont();
          })
        })
  };
  
  
  // updateRole

//   function updateRole() {

// }
function confirmCont() {
  confirm("Continue?")
      .then(function confirmed() {
          askQuestions();
      }, function cancelled() {
          console.log("Goodbye!");
      });
};

start();