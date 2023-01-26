#! /user/bin/env node
import inquirer from 'inquirer';
import chalkAnimation from "chalk-animation";
const exchangeRates = {
    PKR: 1,
    USD: 227.60,
    EUR: 270.7,
    GBP: 308
};
// Function to convert currency
function convertCurrency(amount, from, to) {
    if (!(from in exchangeRates) || !(to in exchangeRates)) {
        throw new Error("Invalid currency code");
    }
    return (amount / exchangeRates[to]) * exchangeRates[from];
}
async function main() {
    // Get user input using inquirer
    const answers = await inquirer.prompt([
        {
            name: 'amount',
            message: 'Enter amount you want to convert:',
            validate: (input) => {
                if (!input) {
                    return 'Please enter a valid amount';
                }
                if (isNaN(parseFloat(input))) {
                    return 'Please enter a number';
                }
                return true;
            }
        },
        {
            name: 'from',
            message: 'Enter currency to convert from (PKR, USD, EUR, GBP):',
            validate: (input) => {
                if (!input) {
                    return 'Please enter a valid currency code';
                }
                if (!(input in exchangeRates)) {
                    return 'Invalid currency code';
                }
                return true;
            }
        },
        {
            name: 'to',
            message: 'Enter currency to convert to (PKR, USD, EUR, GBP):',
            validate: (input) => {
                if (!input) {
                    return 'Please enter a valid currency code';
                }
                if (!(input in exchangeRates)) {
                    return 'Invalid currency code';
                }
                return true;
            }
        }
    ]);
    // Perform conversion and display result
    try {
        console.log(`${answers.amount} ${answers.from} is equal to ${convertCurrency(parseFloat(answers.amount), answers.from, answers.to)} ${answers.to}`);
    }
    catch (error) {
        console.log(error.message);
    }
}
const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
};
async function welcome() {
    let title = chalkAnimation.rainbow("JH Currency Converter\n");
    await sleep();
    title.stop();
}
await welcome();
main();
