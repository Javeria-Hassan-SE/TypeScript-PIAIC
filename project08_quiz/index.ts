#!/user/bin/env node
import inquirer from 'inquirer';
import chalk from "chalk";
import chalkAnimation, { rainbow } from "chalk-animation";
import { type } from "os";


const sleep =()=>{
    return new Promise((resolve)=>
    {
        setTimeout(resolve, 1000);
    })
}

async function welcome() {
    let title = chalkAnimation.rainbow("Welcome to JH Quiz Application\n");
    await sleep();
    title.stop();
}
await welcome();


const questions = [
  {
    type: 'list',
    name: 'question1',
    message: 'What is the capital of Pakistan?',
    choices: [
      'Islamabad',
      'Karachi',
      'Lahore',
      'Quetta'
    ]
  },
  {
    type: 'list',
    name: 'question2',
    message: 'What is the currency of Pakistan?',
    choices: [
      'PKR',
      'Euro',
      'US Dollar',
      'British Pound'
    ]
  },
  {
    type: 'list',
    name: 'question3',
    message: 'What is the highest mountain peak in the world?',
    choices: [
      'Mount Everest',
      'K2',
      'Kangchenjunga',
      'Lhotse'
    ]
  }
];

const answers = {
  question1: 'Islamabad',
  question2: 'PKR',
  question3: 'Mount Everest'
};

let score = 0;

inquirer.prompt(questions).then(user_answers => {
  if (user_answers.question1 === answers.question1) {
    score++;
  }
  if (user_answers.question2 === answers.question2) {
    score++;
  }
  if (user_answers.question3 === answers.question3) {
    score++;
  }
  console.log(`You got ${score} out of ${questions.length} questions correct!`);
});

  
  






