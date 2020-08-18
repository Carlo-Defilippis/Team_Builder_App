const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
var validator = require("email-validator");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "main.html");

const render = require("./lib/htmlRenderer");
const team = [];

function addMore() {
    inquirer.prompt([{
        type: "list",
        choices: ["Yes", "No"],
        message:"Would you like to add more team members?",
        name: "addmore",
    }]).then(function(response){
        this.response = response.addmore;
        if (this.response === "Yes") {
            return askQuestions();
        } else {
            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdirSync(OUTPUT_DIR);
            } 
            fs.writeFile(outputPath, render(team), "utf8", function(error) {
                if (error) {
                    console.log(error);
                    return;
                }
            });
            return console.log("HTML has succesfully been created!");
        }
    });
}

function askQuestions() {

inquirer.prompt([
   {
       type: "list",
       choices: ["Manager", "Engineer", "Intern"],
       message:"What is your role in the company?",
       name: "role",
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
]).then(function(response){
    this.name = response.name;
    this.id = response.id;
    this.role = response.role;  

    function checkEmail() {
        inquirer.prompt([
            {
                type: "email",
                message:"What is your email address?",
                name: "email",
            }
         ]).then(function(response){
            this.email = response.email;
            if (validator.validate(this.email)) {
                this.email = response.email;
                if (this.role === "Manager") {
                    inquirer.prompt([
                        {
                            type: "input",
                            message: "What is your office number?",
                            name: "officeNumber",
                        }
                    ]).then(function(response) {
                            this.officeNumber = response.officeNumber;
                            const newManager = new Manager(this.name, this.id, this.email, this.officeNumber);
                            console.log("Success! The team has a manager.");
                            team.push(newManager);
                        }).then(function() {
                            addMore();
                        });
                } else if (this.role === "Engineer") {
                    inquirer.prompt([
                        {
                            type: "input",
                            message: "What is your GitHub account name?",
                            name: "GitHub",
                        }
                    ]).then(function(response) {
                            this.Github = response.Github;
                            const newEngineer = new Engineer(this.name, this.id, this.email, this.Github);
                            console.log("Success! Added an Engineer to the team.");
                            team.push(newEngineer);
                        }).then(function() {
                            addMore();
                        });
                } else if (this.role === "Intern") {
                    inquirer.prompt([
                        {
                            type: "input",
                            message: "What college did you go to?",
                            name: "school",
                        }
                    ]).then(function(response) {
                        this.school = response.school;
                        const newIntern = new Intern(this.name, this.id, this.email, this.school);
                        console.log("Success! Added an intern to the team.");
                        team.push(newIntern);
                        }).then(function() {
                            addMore();
                        });
                    
                    };
            } else {
                console.log("Please enter a valid email address.");
                checkEmail();
            }
        })
    };
    checkEmail();
    });
};
askQuestions();