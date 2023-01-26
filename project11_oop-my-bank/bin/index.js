#!/user/bin/env node
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
};
async function welcome() {
    let title = chalkAnimation.rainbow("JH Bank Application");
    await sleep();
    title.stop();
}
await welcome();
class Customer {
    _firstName;
    _lastName;
    _gender;
    _age;
    _mobileNumber;
    _bankAccount;
    constructor() {
        this._firstName = "";
        this._lastName = "";
        this._gender = "";
        this._age = 0;
        this._mobileNumber = "";
        this._bankAccount = new BankAccount();
    }
    get FirstName() {
        return this._firstName;
    }
    set FirstName(value) {
        this._firstName = value;
    }
    get LastName() {
        return this._lastName;
    }
    set LastName(value) {
        this._lastName = value;
    }
    get Gender() {
        return this._gender;
    }
    set Gender(value) {
        this._gender = value;
    }
    get Age() {
        return this._age;
    }
    set Age(value) {
        this._age = value;
    }
    get MobileNumber() {
        return this._mobileNumber;
    }
    set MobileNumber(value) {
        this.MobileNumber = value;
    }
    CustomerInfo() {
        return `Name: ${this._firstName + this._lastName} \n  Age: ${this._age} 
        \n Gender: ${this._gender}
        \n Mobile: ${this._mobileNumber}
        \n Account Balance: ${this._bankAccount.balance}`;
    }
}
class BankAccount {
    _balance;
    constructor() {
        this._balance = 100;
    }
    get balance() {
        return this._balance;
    }
    debit(amount) {
        if (this._balance >= amount) {
            this._balance -= amount;
            return `Debited ${amount} successfully. Current balance: ${this._balance}`;
        }
        else {
            return `Insufficient funds. Current balance: ${this._balance}`;
        }
    }
    credit(amount) {
        this._balance += amount;
        return `Credited ${amount} successfully. Current balance: ${this._balance}`;
    }
}
const bank = new BankAccount();
const debit = async () => {
    const { debit_ans } = await inquirer.prompt([
        {
            type: 'number',
            name: 'debit_ans',
            message: 'Enter the amount you want to debit: ',
        }
    ]);
    return debit_ans;
};
const credit = async () => {
    const { credit_ans } = await inquirer.prompt([
        {
            type: 'number',
            name: 'credit_ans',
            message: 'Enter the amount you want to Credit: ',
        }
    ]);
    return credit_ans;
};
const mainMenu = async () => {
    const { answers } = await inquirer.prompt([
        /* Pass your questions in here */
        {
            type: "list",
            name: "answers",
            message: "Which Operation you want to perform?",
            choices: [
                {
                    name: 'Debit',
                    value: 'debit',
                },
                {
                    name: 'Credit',
                    value: 'credit',
                },
            ]
        },
    ]);
    switch (answers) {
        case 'debit':
            var r1 = await debit();
            var result = bank.debit(r1);
            console.log(result);
            break;
        case 'credit':
            var r2 = await credit();
            var result = bank.credit(r2);
            console.log(result);
            break;
    }
    mainMenu();
};
mainMenu();
