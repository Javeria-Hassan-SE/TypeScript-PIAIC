#!/user/bin/env node
import inquirer from  "inquirer";
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
    let title = chalkAnimation.rainbow("JH Bank Application");
    await sleep();
    title.stop();
}
await welcome();

class Customer{

    private _firstName : string;
    private _lastName : string;
    private _gender : string;
    private _age : number;
    private _mobileNumber : string;
    private _bankAccount : BankAccount;

    constructor(){
        this._firstName = "";
        this._lastName = "";
        this._gender="";
        this._age=0;
        this._mobileNumber="";
        this._bankAccount= new BankAccount();
    }
    public get FirstName(): string {
        return this._firstName;
    }
    public set FirstName(value: string) {
        this._firstName = value;
    }
    public get LastName(): string {
        return this._lastName;
    }
    public set LastName(value: string) {
        this._lastName = value;
    }
    public get Gender(): string {
        return this._gender;
    }
    public set Gender(value: string) {
        this._gender = value;
    }
    public get Age(): number {
        return this._age;
    }
    public set Age(value: number) {
        this._age = value;
    }
    public get MobileNumber(): string {
        return this._mobileNumber;
    }
    public set MobileNumber(value: string) {
        this.MobileNumber = value;
    }
    
    
    public CustomerInfo(): string {
        return `Name: ${this._firstName + this._lastName} \n  Age: ${this._age} 
        \n Gender: ${this._gender}
        \n Mobile: ${this._mobileNumber}
        \n Account Balance: ${this._bankAccount.balance}`;
    }

}

interface IBankAccount {
    debit(amount: number): string;
    credit(amount: number): string;
}

class BankAccount implements IBankAccount {
    private _balance: number;

    constructor() {
        this._balance = 100;
    }

    public get balance(): number {
        return this._balance;
    }

    public debit(amount: number): string {
        if (this._balance >= amount) {
            this._balance -= amount;
            return `Debited ${amount} successfully. Current balance: ${this._balance}`;
        } else {
            return `Insufficient funds. Current balance: ${this._balance}`;
        }
    }

    public credit(amount: number): string {
        this._balance += amount;
        return `Credited ${amount} successfully. Current balance: ${this._balance}`;
    }
}

const bank = new BankAccount();

const debit = async () => {
    const { debit_ans} = await inquirer.prompt([
      {
        type: 'number',
        name: 'debit_ans',
        message: 'Enter the amount you want to debit: ',
      }
    ]);
  
    return debit_ans;
    
  };
  const credit = async () => {
    const { credit_ans} = await inquirer.prompt([
      {
        type: 'number',
        name: 'credit_ans',
        message: 'Enter the amount you want to Credit: ',
      }
    ]);
     return credit_ans;
    
  };


const mainMenu = async () => {
    const {answers} = await inquirer.prompt([
  /* Pass your questions in here */
  {
    type:"list",
    name:"answers",
    message:"Which Operation you want to perform?",
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
          var result= bank.credit(r2);
          console.log(result);
          break;
      }
  
    mainMenu();
  };
  
  mainMenu();