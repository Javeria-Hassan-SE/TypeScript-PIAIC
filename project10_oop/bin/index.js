#!/user/bin/env node
import inquirer from 'inquirer';
import chalkAnimation from "chalk-animation";
const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
};
async function welcome() {
    let title = chalkAnimation.rainbow("JH OOP Class\n");
    await sleep();
    title.stop();
}
await welcome();
class Person {
    _personality;
    constructor() {
        this._personality = "Mystery";
    }
    askQuestion(answer) {
        if (answer == 1) {
            this._personality = "Extravert";
        }
        else if (answer == 2) {
            this._personality = "Introvert";
        }
        else {
            this._personality = "You're still a Mystery!";
        }
    }
    getPersonality() {
        return this._personality;
    }
}
class Student extends Person {
    _name;
    constructor() {
        super();
        this._name = "";
    }
    setName(name) {
        this._name = name;
    }
    getName() {
        return this._name;
    }
}
const answers = await inquirer
    .prompt([
    /* Pass your questions in here */
    {
        type: "name",
        name: "name",
        message: "What is your name?",
    },
    {
        type: "list",
        name: "type",
        message: "Check Your personality type:\n Select Type1 if you want to talk to other else\n Select Type2 if you keep your things within yourself",
        choices: ["Type 1", "Type 2"]
    },
]);
let pType = 0;
if (answers.type == "Type 1") {
    pType = 1;
}
else if (answers.type == "Type 2") {
    pType = 2;
}
else {
    console.log(`Invalid Type`);
}
const student = new Student();
student.setName(answers.name);
student.askQuestion(pType);
console.log(`Dear ${student.getName()}, You have an ${student.getPersonality()} personality.`);
