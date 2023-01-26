#! /user/bin/env node
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
    let title = chalkAnimation.rainbow("JH CountDown Timer\n");
    await sleep();
    title.stop();
}
await welcome();


inquirer.prompt([
  {
    type: 'input',
    name: 'countdown',
    message: 'Enter a date and time for the countdown timer (YYYY-MM-DD HH:mm:ss):',
  },
]).then((answers) => {
  const targetDate = new Date(answers.countdown);
  const currentDate = new Date();

  const diffTime = Math.abs(targetDate.getTime() - currentDate.getTime());
  let diffSeconds = Math.ceil(diffTime / 1000);

  let timer = setInterval(() => {
    diffSeconds -= 1;

    if (diffSeconds <= 0) {
      console.log('Countdown timer has ended!');
      clearInterval(timer);
    } else {
      console.log(`Time remaining: ${diffSeconds} seconds`);
    }
  }, 1000);
});



  
  






