#!/user/bin/env node
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
var label = `                                                                              
                                           88                                 
                                           88                                 
                                           88                                 
8b,dPPYba,  88       88 88,dPYba,,adPYba,  88,dPPYba,   ,adPPYba, 8b,dPPYba, ,adPPYba,
88P'   '"8a 88       88 88P'   "88"    "8a 88P'    "8a a8P_____88 88P'   "Y8 I8[    ""
88       88 88       88 88      88      88 88       d8 8PP""""""" 88         '"Y8ba,
88       88 "8a,   ,a88 88      88      88 88b,   ,a8" "8b,   ,aa 88         as     ]8I
88       88  '"YbbdP'Y8 88      88      88 8Y"Ybbd8"'   '"Ybbd8"' 88          '"YbbdP"' `;
const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
};
async function welcome() {
    let title = chalkAnimation.rainbow("Guess a Number between 1 to 10");
    await sleep();
    title.stop();
    let labelAnim = chalkAnimation.rainbow(label);
    await sleep();
    labelAnim.stop();
}
await welcome();
// generating a random integer from 1 to 10
async function askQuestion() {
    const random = Math.floor(Math.random() * 10) + 1;
    const answers = await inquirer
        .prompt([
        /* Pass your questions in here */
        {
            type: "number",
            name: "num1",
            message: "Enter number"
        },
    ]);
    if (answers.num1 == random) {
        console.log("Yup! You guess the right number");
    }
    else if (answers.num1 != random) {
        console.log("Oh! You guess wrong :(");
    }
}
async function restartGame() {
    do {
        await askQuestion();
        var again = await inquirer.prompt([
            {
                type: "input",
                name: "restart",
                message: "Do you want to continue? Press y or n"
            },
        ]);
    } while (again.restart == 'y' || again.restart == 'Y' || again.restart == 'yes' || again.restart == 'Yes' || again.restart == 'YES');
}
restartGame();
