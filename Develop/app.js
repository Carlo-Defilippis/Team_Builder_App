const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

inquirer.prompt([
   {
       type: "list",
       choices: ["Manager", "Engineer", "Intern"],
       message:"What is your role in the company?",
       name: "position",
   },
   {
       type: "input",
       message:"What is your full name?",
       name: "name",
   },
   {
       type: "input",
       message:"What is your ID number?",
       name: "id",
   },
   {
       type: "email",
       message:"What is your email address?",
       name: "email",
   },
]).then(function(response){
    this.position = response.position;
    this.name = response.name;
    this.id = response.id;
    this.email = response.email;

    // test code
    const emailSymbol = "@";
    const comSymbol = ".com";
    function checkEmail() {
        let email = this.email.split("");

            if (email.includes(emailSymbol) && email.includes(comSymbol)) {
                return;
            } else {
                return console.log("Please enter a valid email address.");
            }
    }
    checkEmail();
    //test code

    if (this.position === "Manager") {
        inquirer.prompt([
            {
                type: "input",
                message: "What is your office number?",
                name: "officeNumber",
            }
        ]).then(function(response) {
            fs.appendFile("main.html", new Manager(response), function(error){
                if (error) {
                    console.log(error);
                    return;
                }
                console.log("Success! The team has a manager.");
            }) 
        })
    } else if (this.position === "Engineer") {
        inquirer.prompt([
            {
                type: "input",
                message: "What is your GitHub account name?",
                name: "GitHub",
            }
        ]).then(function(response) {
            fs.appendFile("engineer.html", new Engineer(response), function(error){
                if (error) {
                    console.log(error);
                    return;
                }
                console.log("Success! Added an Engineer to the team.");
            }) 
        })
    } else if (this.position === "intern") {
        inquirer.prompt([
            {
                type: "input",
                message: "What is your GitHub account name?",
                name: "GitHub",
            }
        ]).then(function(response) {
            fs.appendFile("intern.html", Intern(response), function(error){
                if (error) {
                    console.log(error);
                    return;
                }
                console.log("Success! Added an intern to the team.");
            }); 
        }); 
    }
});


const newEmployee = new Employee("this.name", 4, "name@name.com");



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!