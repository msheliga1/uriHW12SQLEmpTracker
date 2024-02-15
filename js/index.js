// MJS URI HW 12 2.15.24 - from HW 10 SVG Logo generator - using inquirier
// Include packages needed for this app
const fs = require('fs');
const inq = require('inquirer');
const mysql = require('mysql2');

// String constants - used in both prompt and checking for selection
const viewEmpString  = "View All Employees"; 
const addEmpString   = "Add Employee";
const updateEmpRoleString = "Update Employee Role";
const viewRoleString = "View All Roles";
const addRoleString  = "Add Role";
const viewDeptString = "View All Departments";
const addDeptString  = "Add Department";
const quitString     = "Quit";

// Log method to be able to turn all comments on-off at once
function log(str) { 
    console.log(str);
}

// Create a connection to the db MJS 2.15.24
function init() {
  log("MJS Starting init ... ")
  const questions = initQuestions(); 
  // Connect to database
  const db = myCreateConnection();

  // viewEmployees(db);  // this seems to work!
  // viewRoles(db); 
  // viewDepartments(db);  

  mainMenu(questions, db)
} // end function init

// Create a connection to the db MJS 2.15.24
function myCreateConnection() {
    // Connect to database
    const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'root',
      database: 'biz_db'
    }
    ); // end myCreateConnection
    return db; 
} // end function myCreateConnection

// Create the db link ... db.query fails if done mor than once interactively inside inquirer
// but works repeatedly if done before inquirer prompts!
// end function createDB


// ====== All Menu Methods Next =========================
// main inquirer .prompt routine. MJS 2.15.24
function mainMenu(questions, db) {
    let done = false;
    let count = 0; 
    // while (!done && (count < 10)) { 
        count++; 
        inq
        .prompt(questions)
        .then((ans) => {  // display or modify the db..
            log("Beginning .then " + count + " ... Answer selection is " + ans.selection);
            switch (ans.selection) { 
                case viewEmpString: 
                    log("view All Employees selected");
                    viewEmployees(db);
                    break;
                case addEmpString: 
                    log("Add Employee selected");
                    break;
                case updateEmpRoleString: 
                    log("Update Employee Role selected");
                    break;
                case viewRoleString: 
                    log("view All Roles selected");
                    viewRoles(db);
                    break;
                case addRoleString: 
                    log("Add Role selected");
                    break;
                case viewDeptString: 
                    log("view All Departents selected");
                    viewDepartments(db);
                    break;
                case addDeptString: 
                    log("Add Department selected");
                    addDepartment(db);
                    break;  
                case quitString: 
                    log("Quit selected");
                    done = true;
                    break;                 
                default:
                    log("Selection not found: " + ans.selection);   
            } // end switch
            if (!done) {     // Used recursion here
                mainMenu(questions, db);  // cant use a for loop as it never stops!
            }
            // fileXML += `<text x="75" y="175" fill="${ans.color}">${shape.getInitials()}</text> \n`; 
        });  // end .then(ans)
    // } // end while not done
} // end function mainMenu

// ========== SQL Routines ================
// Simple view entire employee table from the db.
function viewEmployees(db) {
  // db2 = myCreateConnection(); // FIXED! Missing Recursive Param. Was cant use db more than once => recreate
  db.query(`SELECT * FROM employee`, (err, result) => {
    // db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
} // end viewEmployees(db)

// Simple view entire role table from the db.
function viewRoles(db) {
  db.query(`SELECT * FROM role`, (err, result) => {
      err ? console.log(err) : console.log(result);
    });
  } // end viewRoles(db)

  // Simple view entire department table from the db.
  function viewDepartments(db) {
    db.query(`SELECT * FROM department`, (err, result) => {
      err ? console.log(err) : console.log(result);
    });
  } // end viewDepartments(db)

  // Add a new dept to the DB.
  function addDepartment(db) {
    const questions = getDepartmentQuestions();    
    const queryString = 'INSERT INTO department (id, name) VALUES (007, "Janitoring")';
    db.query(queryString, (err, result) => {
      err ? console.log(err) : console.log(result);
    });
  } // end addDepartment(db)

// Init Menus and Questions - Inquirer prompts 
  function initQuestions() {
    // Create main menu array of selection - Only one select from list here
    const questions = [
        // {   type: 'input', message: 'Please select a function:', name: 'funct',        },
        {  // don't see how an object (w/ name, link and badge) can be stored here 
                type: 'rawlist', message: 'Please select a function:', name: 'selection', 
                default: '1', choices: [viewEmpString,  addEmpString, updateEmpRoleString, 
                                        viewRoleString, addRoleString, 
                                        viewDeptString, addDeptString, 
                                        quitString],        }, 
    ];
  return  questions;
} // end initQuestions  

// Create questions for adding a new dept MJS 2.15.24
function getDeptQuestions() {
    // Create main menu array of selection - Only one select from list here
        const questions = [
            {   type: 'input', message: 'Enter new department name', name: 'deptName', }
        ];
      return  questions;
} // end addDeptQuestions

// =================== Begin the App by Calling Init ======================
// Function call to initialize app
init();
