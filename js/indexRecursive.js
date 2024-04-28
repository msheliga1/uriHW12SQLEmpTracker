// MJS URI HW 12 2.15.24 - from HW 10 SVG Logo generator - using inquirier
// Include packages needed for this app.  
// See Act 13-10 (taught after this was due!) for async, await. 
const fs = require('fs');
const inq = require('inquirer');
const mysql = require('mysql2');
const uuid = require('./uuid'); // for primary key
require('dotenv').config();

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
  const questions = getMainPrompts(); 
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
      user: process.env.DB_USER,
      // MySQL password
      password: process.env.DB_PASSWORD,
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
  while (!done && (count < 10)) { 
      count++; 
      ans = inq.prompt(questions)
      // display or modify the db..
          log("Beginning .then " + count + " ... Answer selection is " + ans.selection);
          switch (ans.selection) { 
              case viewEmpString: 
                  log("view All Employees selected");
                  viewEmployees(db);
                  break;
              case addEmpString: 
                  log("Add Employee selected");
                  console.log("Not Yet Implemented");
                  break;
              case updateEmpRoleString: 
                  log("Update Employee Role selected.");
                  console.log("Not Yet Implemented");
                  break;
              case viewRoleString: 
                  log("view All Roles selected");
                  viewRoles(db);
                  break;
              case addRoleString: 
                  log("Add Role selected");
                  addRole(db); // calls mainMenu
                  break;
              case viewDeptString: 
                  log("view All Departents selected");
                  viewDepartments(db);
                  break;
              case addDeptString: 
                  log("Add Department selected");
                  addDepartment(db); // also recalls mainMenu
                  break;  
              case quitString: 
                  log("Quitting ... "); // Used to be done = true;
                  done = true; 
                  break;                 
              default:
                  log("Selection not found: " + ans.selection);   
          } // end switch
  // } // end while not done and count < maxCounts
} // end function mainMenu

// ====== All Menu Methods Next =========================
// main inquirer .prompt routine. MJS 2.15.24
function mainMenuRecursive(questions, db) {
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
                    mainMenu(questions, db); 
                    break;
                case addEmpString: 
                    log("Add Employee selected");
                    console.log("Not Yet Implemented");
                    mainMenu(questions, db); 
                    break;
                case updateEmpRoleString: 
                    log("Update Employee Role selected.");
                    console.log("Not Yet Implemented");
                    mainMenu(questions, db); 
                    break;
                case viewRoleString: 
                    log("view All Roles selected");
                    viewRoles(db);
                    mainMenu(questions, db); 
                    break;
                case addRoleString: 
                    log("Add Role selected");
                    addRole(db); // calls mainMenu
                    break;
                case viewDeptString: 
                    log("view All Departents selected");
                    viewDepartments(db);
                    mainMenu(questions, db); 
                    break;
                case addDeptString: 
                    log("Add Department selected");
                    addDepartment(db); // also recalls mainMenu
                    break;  
                case quitString: 
                    console.log("Quitting ... "); // Used to be done = true;
                    break;                 
                default:
                    log("Selection not found: " + ans.selection);   
            } // end switch
            // if (!done) {     // Used recursion here - Must
            //     mainMenu(questions, db);  // cant use a for loop as it never stops!
            // }
            // fileXML += `<text x="75" y="175" fill="${ans.color}">${shape.getInitials()}</text> \n`; 
        });  // end .then(ans)
    // } // end while not done
} // end function mainMenuRecursive

// ========== SQL Routines ================
// ---------- VIEW Routes (Emp, Role, Dept) ----------------
// Simple view entire employee table from the db.
function viewEmployees(db) {
  // db2 = myCreateConnection(); // FIXED! Missing Recursive Param. Was cant use db more than once => recreate
  db.query(`SELECT * FROM employee`, (err, result) => {
    // db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(" ");  // avoid line break issue
    console.table(result);
  });
} // end viewEmployees(db)

// Simple view entire role table from the db.
function viewRoles(db) {
  db.query(`SELECT * FROM role`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(" ");  // avoids annoying line break issue (terminal doesnt come back!)
        console.table(result);  // instead of console.log
      }  
    });
  } // end vkewRoles(db)


  // Simple view entire department table from the db.
  function viewDepartments(db) {
    db.query(`SELECT * FROM department`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(" ");  // avoids annoying line break issue (terminal doesnt come back!)
        console.table(result);  // instead of console.log
      }  
    });
  } // end viewDepartments(db)

  // ------------ ADD Routes (Dept, Role, Emp) ---------------
  // Add a new dept to the DB. Easy since dept does NOT pt to any other table. (No FK). 
  // Also recalls mainMenu, which is terrible, 
  // but I cant find a way arouond it due to .then synch issues.  Maybe await .... 
  async function addDepartment(db) {
    console.log("Starting add dept"); 
    const deptQuestions = getDeptQuestions();    
    inq
    .prompt(deptQuestions)
    .then((ans) => {  
      /* const queryString = `INSERT INTO department (id, name) VALUES ("` + uuid() + `", "${ans.deptName}")`; */ 
      const queryString = `INSERT INTO department (name) VALUES ("${ans.deptName}")`;
      log("addDepart queryString is: " + queryString);
      db.query(queryString, (err, result) => {
        err ? console.log(err) : console.log("Sucessfully created new department.");
      }); // end db.query()
      console.log("Done adding new dept!"); 
      // MUST put re-call to main menu here, or else synch problems!! 
      mainMenu(getMainPrompts(), db); 
    }); // end .then() 
    // anything here will run *BEFORE* the .then ... so we cant re-call mainMenu here ... 
  } // end addDepartment(db)

  function addDepartmentThen(db) {
    const deptQuestions = getDeptQuestions();    
    inq
    .prompt(deptQuestions)
    .then((ans) => {  
      const queryString = `INSERT INTO department (id, name) VALUES ("` + uuid() + `", "${ans.deptName}")`;
      log("addDepart queryString is: " + queryString);
      db.query(queryString, (err, result) => {
        err ? console.log(err) : console.log("Sucessfully created new department.");
      }); // end db.query()
      console.log("Done adding new dept!"); 
      // MUST put re-call to main menu here, or else synch problems!! 
      mainMenu(getMainPrompts(), db); 
    }); // end .then() 
    // anything here will run *BEFORE* the .then ... so we cant re-call mainMenu here ... 
  } // end addDepartmentThen(db)

  // Add a new role to the DB. A role pts to a dept. 
  // Also re-calls mainMenu, which is terrible, 
  // but I cant find a way around it due to .then synch issues.  Maybe await .... 
  function addRole(db) {
    // Now display the questions  
    const roleQuestions = getRoleQuestionsSimp(db);    
    inq
    .prompt(roleQuestions)
    .then((ans) => {  
      let queryString = `INSERT INTO role (id, title, salary, department_id)`;
      queryString += `VALUES ("` + uuid() + `", "${ans.roleName}", "${ans.roleSalary}", "${ans.dept_id}")`;
      log("addRole queryString is: " + queryString);
      db.query(queryString, (err, result) => {
        err ? console.log(err) : console.log(result);
      }); // end db.query()
      console.log("Done adding new role!"); 
      // MUST put re-call to main menu here, or else synch problems!! 
      mainMenu(getMainPrompts(), db); 
    }); // end .then() 
    // anything here will run *BEFRORE* the .then ... 
  } // end addRole(db)

//------------------------------
// Init Menus and Questions - Inquirer prompts 
  function getMainPrompts() {
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
} // end getMainPrompts  

// Create questions for adding a new employee. MJS 2.15.24
function getEmployeeQuestions() {
  // Create new employee prompts - first, last, roleId, managerId
      const questions = [
        {   type: 'input', message: 'Enter new employee first name', name: 'firstName', }, 
        {   type: 'input', message: 'Enter last Name', name: 'roleSalary', }, 
        {   type: 'input', message: 'Enter roleId', name: 'roleId', }, 
        {   type: 'input', message: 'Enter manager id', name: 'managerId', }
      ];
    return  questions;
} // end getEmployeeQuestions

// Create questions for adding a new role. MJS 2.15.24. MJS 4.28.24 
/* From SO async function dbCall(sql, arg) {
      let data = await db.query(sql, arg);
      console.log(data);
      data = data[0];
      return data;    } */
/* async function dbCall() {
    let data = await db.query(userSQL, username);
    console.log(data);
} */  
async function getRoleQuestionsSimp(db) {
  // gather the role names and IDs from the DB
  // Acccording to stackOverflow, this requries a callback method being passed it. 
  // My strong suggestion is to REQUIRE everyone to use await, as the alternative is much harder. 
  let queryString = `SELECT id, name FROM department`;
  // log("addRole get depts queryString is: " + queryString);
/*    let args = null; 
    let deptResults = []; 
    let data =  await db.query(queryString, args); 
    console.log(queryString, data);  */
    return "getRoleQuestionSimp Return goes here"; 
    /*
      (err, result) => {
      if (err) {
        console.log(err);
        return [];
      } else {
        log("AddRole get depts query worked! Found " + result.length);
        log(result);
        deptResults = [{"id": 3, "name": "bob"}]; // result;
        return result; 
      } // end if err else 
    }); // end db.query() - can't return anything from this inner method. Arghhh. */ 

} // end getRoleQuestionsSimp

// Create questions for adding a new role. MJS 2.15.24
/* async function getRoleQuestions(db) {
    // gather the role names and IDs from the DB
    // Acccording to stackOverflow, this requries a callback method being passed it. 
    // My strong suggestion is to REQUIRE everyone to use await, as the alternative is extremely painful. 
       let queryString = `SELECT id, name FROM department`;
    // log("addRole get depts queryString is: " + queryString);
       let deptResults = []; 
       let qr =  await db.query(queryString, (err, result) => {
        if (err) {
          console.log(err);
          return [];
        } else {
          log("AddRole get depts query worked! Found " + result.length);
          log(result);
          deptResults = [{"id": 3, "name": "bob"}]; // result;
          return result; 
        } // end if err else 
      }); // end db.query() - can't return anything from this inner method. Arghhh.

    // Create new role prompts
      let choicesStr = "";
      for (const i=0; i < deptResults.length; i++) {
        dept = deptResults[i];
        log("Id " + dept.id + " dept.name " + dept.name);
        choicesStr += dept.name + ", "; 
      } // end for 
      const questions = [
        {   type: 'input', message: 'Enter new role title', name: 'roleName', }, 
        {   type: 'input', message: 'Enter new role salary', name: 'roleSalary', }, 
        // {   type: 'rawlist', message: 'Please select department:', name: 'selection', 
        // default: '1', choices: [choicesStr],        }
        {   type: 'input', message: 'Enter new role dept', name: 'dept_id', }
      ];
      return  questions;
} // end getRoleQuestions */ 

// Create questions for adding a new dept. Name (title), Salary, Dept MJS 2.15.24
function getDeptQuestions() {
        const questions = [
          {   type: 'input', message: 'Enter new department name: ', name: 'deptName', }
        ];
      return  questions;
} // end addDeptQuestions

// =================== Begin the App by Calling Init ======================
// Function call to initialize app
init();
