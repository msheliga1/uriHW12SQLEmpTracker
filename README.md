# uriHW12SQLEmpTracker
uri bootcamp HW 12 SQL Employee Tracker MJS 2.15.24
Michael Sheliga - This repo is for the University of Richmond (URI) coding bootcamp.   

## Link to Repo, Screenshot(s) and/or Video(s)  
Link to GitHub Repo: https://github.com/msheliga1/uriHW12SQLEmpTracker    
<!---  Link to deployed github.io site. https://msheliga1.github.io/uriHW9NodeReadmeGen --->  
<!-- Link to logo.svg: https://github.com/msheliga1/uriHW10OOPLogoGenerator/blob/main/examples/logo.svg  --->  
Link to Video on Google Drive: https://drive.google.com/file/d/1NqSNz5vp7zit4KaUKGl09QM4u58gx9wA/view  
<!-- Link to Video on GitHub [Link](./examples/hw10LogoGenSheliga.webm)   Note that this video may be too large to play in GitHub, so you will need to download and play from your computer. WindowsMediaPlayer worked for me.  -->

[Link to Acceptance Criteria ](#acceptance-criteria)   

## Project Goals     
Use node, inquirer and SQL to create an 3 table employee-role-department database.  

========================================================   
## Technical Project Details    
========================================================    
## Github:   
    Create Repo (github, repositories => New)   
        - Dont Make this a shared repo.  
    Copy directories and sample files from prior project (or create from scratch).  
        -- No starter code. No need for copying one file at a time via command line.  
        -- Alternate: Go to Demo (root) folder, download zip, moving to local repo, unzip - likely fastest method.     
        -- Could not find a better way to copy over all files.    
    OR ... create HTML, Node, Develop, CSS and javascript, etc. from scratch, and copy sample files ... worked well.
        Branches (Optional for single programmer projects)  
        - Could do work in branches. (new branch inside gitHub)    
        - All branch names will begin with the initials of the main person working on the branch.  
        - Must update local repo after adding a branch  
        - Switch to branch: From cmd line git switch <branchname>   
        - Once changes committed, git push origin <branchname>  
            - for pushing to remote test branch: git push origin local_branch:remote_branch  
        - Issue a pull request in gitHub.  
        - Click "Pull Requests" in top menu bar (3rd from left).  
        - Click "review Required" in small font below pull request name.  
        - You may approve your own request.  
    Clone to local machine (Copy https, then git clone paste).    
    Create a nice long READ.md file!!  (Modify prior projects.)   
    NPM: Do "npm init --y" BEFORE "npm install" to avoide ENOENT err.
         Do "npm install inquirer@8.2.4" (with old version) to avoid require error.
         Do "npm install mySQL2" 
    Commit and push files back to gitHub/branch. (For multi-programming: Issue pull request, approve, merge).  
    Deploy code (Settings...CodeAndAnimation->Pages on left, GitHub Pages->Branch->main, save)  
        - Deployed code name always msheliga1/github.io/RepoName !!  
    Make Sure it Works   
    Insert Screencastify (Chrome) Video and/or Screenshot X2 of deployment into readme file. 
  
## Tools and Technologies Used   
    Github - Branches not needed, but could use.  
        - GitIgnore to keep NPM libraries out of gitHub repo.  
    NPM - Node Package Manager  
        fs - fileSystem    
        inquirer - Used for prompts (text, list, checkboxes, editor, etc.)   
    mySQL - install is from the DEVIL!
    SQL - Standard Query Language 
    Agile - Try to assign a little work at a time.   

## Acceptance Criteria   
-----------------------   
SQL DB with departments, roles, and employees.  
  
CLI inquirer app:  
Start options: view departments, roles and employees, add department, role or employee, and update employee-role  
View all depts shows a formatted table showing dept names ids  
View all roles shows the job title, role id, the dept the role belongs to, and role-salary  
View all employees shows a formatted table with employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to  
Add a department, prompts to enter the dept name, and dept is added to the db  
Add a role, prompts to enter the role name, salary and dept, and role is added to the db  
Add an employee, prompts to enter the emps first name, last name, role and manager, and emp is added to the db  
Update an employee role, prompts to select an employee to update and their new role and this info is updated in the db  

Tables:  
    department  
        id: INT PRIMARY KEY  
        name: VARCHAR(30) to hold department name  
    role  
        id: INT PRIMARY KEY  
        title: VARCHAR(30) to hold role title  
        salary: DECIMAL to hold role salary  
        department_id: INT to hold reference to department role belongs to    
    employee  
        id: INT PRIMARY KEY  
        first_name: VARCHAR(30) to hold employee first name  
        last_name: VARCHAR(30) to hold employee last name  
        role_id: INT to hold reference to employee role  
        manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)  

You might want to use a separate file that contains functions for performing specific SQL queries you'll need to use.   
A constructor function or class could be helpful for organizing these.   
You might also want to include a seeds.sql file to pre-populate your database, making the development of individual features much easier.  

