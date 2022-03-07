// Dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
require('dotenv').config();

const connection = mysql.createConnection(
  {
      host: 'localhost',
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PW

  },
  console.log("You have connected to the database for the BK Employee Tracker: " + process.env.DB_Name)
);
connection.connect(function(err){
  if (err) throw err;
  start();
});

module.exports = connection;

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
    }])
        // Attempt 1

        //   ]).then(function (answer) {
        //           switch (answer.action) {
        //             case 'VIEW_EMPLOYEES':
        //                 viewEmployees();
        //                 break;
        //             case 'VIEW_DEPARTMENTS':
        //                 viewDepartments();
        //                 break;
        //             case 'VIEW_ROLES':
        //                 viewRoles();
        //                 break;
        //             case 'ADD_EMPLOYEE':
        //                 addEmployee();
        //                 break;
        //             case 'ADD_DEPARTMENT':
        //                 addDepartment();
        //                 break;
        //             case 'ADD_ROLE':
        //                 addRole();
        //                 break;
        //             case 'UPDATE_ROLE':
        //                 updateRole();
        //                 break;
        //           }
        //     });
        // };
        .then(answer => {
          console.log("Looking for an answer");
          switch (answer.option) {
            case "VIEW_DEPARTMENTS":
              connection.query('SELECT * FROM department', function (err, results) {
                console.table(results);
                confirmCont();
              });
              break;
            case "VIEW_ROLES":
              connection.query('SELECT * FROM roles', function (err, results) {
                console.table(results);
                confirmCont();
              });
              break;
            case "viewEmployees":
              connection.query('SELECT * FROM employee', function (err, results) {
                console.table(results);
                confirmCont();
              });
              break;
            case "addDepartment":
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
                    confirmCont();
                  });
                })
              break;
            case "addRole":
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
                    confirmCont();
                  });
                })
              break;
            case "addEmployee":
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
                      confirmCont();
                    });
                })
              break;
            case "updateEmployee":
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
                      confirmCont();
                    });
                })
              break;
            default:
              console.log("No valid option chosen.");
          }
        });
};
function confirmCont() {
  confirm("Would you like to continue?")
    .then(function confirmed() {
      askQuestions();
    }, function cancelled() {
      console.log("Have a great day!  Goodbye!");
    });
};


// Original Functions


//  // View all employees
// function viewEmployees() {
//   db.findAllEmployees()
//     .then(([rows]) => {
//       let employees = rows;
//       console.log("\n");
//       console.table(employees);
//     })
//     .then(() => start());
// }

//   // viewDepartments
//   function viewDepartments() {
//     var departmentQuery = 'SELECT * FROM department';
//       connection.query(departmentQuery, function(err, res) {
//           if(err)throw err;
//           console.table('All Departments:', res);
//           confirmCont();
//     })
//   }

//   //viewRoles
//   function viewRoles() {
//     var roleQuery = 'SELECT * FROM role';
//       connection.query(roleQuery, function(err, res){
//           if(err)throw err;
//           console.table('All Roles:', res);
//           confirmCont();
//       })
//   }

//   // addEmployee
// function addEmployee() {
//   inquirer
//     .prompt([
//       {
//         name: 'first_name',
//         type: 'input',
//         message: 'What is their first name?',
//       },
//       {
//         name: 'last_name',
//         type: 'input',
//         message: 'What is their last name?',
//       },
//       {
//         name: 'manager_id',
//         type: 'input',
//         message: 'Who is this employees manager?',
//       },
//       {
//         name: 'role',
//         type: 'input',
//         message: 'What is this employees role id?',
//       }
//     ]).then(function (answer){
//       connection.query('INSERT INTO employee SET ?',
//       {
//         first_name: answer.first_name,
//         last_name: answer.last_name,
//         manager_id: answer.manager_id,
//         role_id: answer.role,
//       });
//       var employeeQuery = 'SELECT * FROM employee';
//       connection.query(employeeQuery, function(err, res){
//         if (err) throw err;
//         console.table('All Employees:', res);
//         confirmCont();
//       })
//     })
// }

//   // addDepartment
//   function addDepartment() {
//     inquirer
//       .prompt([
//         {
//           name: 'newDepartment', 
//           type: 'input', 
//           message: 'Name of new department?'
//         }
//         ]).then(function (answer) {
//           connection.query('INSERT INTO department SET ?',
//               {
//                   name: answer.newDepartment
//               });

//           var departmentQuery = 'SELECT * FROM department';
//           connection.query(departmentQuery, function(err, res){
//             if (err) throw err;
//             console.table('All Departments:', res);
//             confirmCont();
//           })              
//         })
//   }
//   // addRole
// function addRole() {
//   inquirer
//     .prompt([
//       {
//         name: 'newRole', 
//         type: 'input', 
//         message: 'Name of new role?'
//       },
//       {
//         name: 'salary',
//         type: 'input',
//         message: 'What is Employees Salary?'
//       },
//       {
//         name: 'Department',
//         type: 'input',
//         message: 'What department does this Employee work for? (Insert Department ID)'
//       }
//       ]).then(function (answer) {
//         connection.query('INSERT INTO role SET ?',
//           {
//             title: answer.newRole,
//             salary: answer.salary,
//             department_id: answer.Department
//           });
//           var roleQuery = 'SELECT * FROM role';
//           connection.query(roleQuery, function(err, res){
//             if (err) throw err;
//             console.table('All Roles:', res);
//             confirmCont();
//           })
//         })
//   };
//   // updateRole

// //   function updateRole() {

// // }
// function confirmCont() {
//   confirm("Would you like to continue?")
//       .then(function confirmed() {
//           askQuestions();
//       }, function cancelled() {
//           console.log("Goodbye!");
//       });
// };

// start();