#!/user/bin/env node
import inquirer from 'inquirer';
import chalkAnimation from "chalk-animation";
class Todo {
    tasks;
    constructor() {
        this.tasks = [];
    }
    addTask(task) {
        this.tasks.push(task);
        console.log('Added ', task, 'to the list.');
    }
    completeTask(task) {
        const taskIndex = this.tasks.indexOf(task);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            console.log('Completed ', task);
        }
        else {
            console.log('Could not find ', task, 'in the list.');
        }
    }
    deleteTask(task) {
        const taskIndex = this.tasks.indexOf(task);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            console.log('Deleted', task);
        }
        else {
            console.log('Could not find ', task, 'in the list.');
        }
    }
    listTasks() {
        console.log("Tasks:");
        this.tasks.forEach((task, index) => {
            console.log(index + 1, '.', task);
        });
    }
}
const todo = new Todo();
const askForTask = async () => {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'command',
            message: 'What would you like to do?',
            choices: [
                'Add Task',
                'Complete Task',
                'Delete Task',
                'List Tasks',
                'Quit'
            ],
            filter: (val) => val.toLowerCase()
        },
        {
            type: 'input',
            name: 'task',
            message: 'Enter the task:',
            when: (answers) => answers.command !== 'list tasks',
            validate: (val) => val !== ''
        }
    ])
        .then((answers) => {
        const task = answers.task;
        switch (answers.command) {
            case 'add task':
                todo.addTask(task);
                break;
            case 'complete task':
                todo.completeTask(task);
                break;
            case 'delete task':
                todo.deleteTask(task);
                break;
            case 'list tasks':
                todo.listTasks();
                break;
            case 'quit':
                process.exit();
            default:
                console.log("Invalid command.");
        }
        askContinue();
    });
};
const askContinue = async () => {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'continue',
            message: 'Do you want to continue? (y/n)',
            validate: (val) => val === 'y' || val === 'n'
        }
    ])
        .then((answers) => {
        if (answers.continue === 'y') {
            askForTask();
        }
        else {
            process.exit();
        }
    });
};
const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
};
async function welcome() {
    let title = chalkAnimation.rainbow("Welcome to To-Do List\n");
    await sleep();
    title.stop();
    let labelAnim = chalkAnimation.rainbow('"The things that get listed on a to-do list are the things that get done." - Jill Konrath ');
    await sleep();
    labelAnim.stop();
}
await welcome();
await askForTask();
