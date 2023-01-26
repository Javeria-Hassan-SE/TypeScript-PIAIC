#! /user/bin/env node
import inquirer from 'inquirer';
import chalk from "chalk";
import chalkAnimation, { rainbow } from "chalk-animation";
import { type } from "os";


// Define a function that prompts the user for a paragraph
async function getParagraph(): Promise<string> {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'paragraph',
            message: 'Please enter a paragraph (no more than 50 words):',
            validate: (input: string) => {
                // Split the input into words and check if the number of words is greater than 50
                const wordCount = input.split(' ').length;
                if (wordCount > 50) {
                    return 'The paragraph should not have more than 50 words.';
                }
                return true;
            }
        }
    ]);
    return answers.paragraph;
}

// Define a function that counts the number of characters and words without whitespaces in a paragraph
function countWordsAndCharacters(paragraph: string): {words: number, characters: number} {
    // Remove all whitespaces from the paragraph
    const withoutWhitespaces = paragraph.replace(/\s/g, '');
    // Split the paragraph into words and remove empty words
    const words = paragraph.split(' ').filter((word) => word !== '');
    // Return the count of words and characters
    return {words: words.length, characters: withoutWhitespaces.length};
}

async function main() {
    const paragraph = await getParagraph();
    const {words, characters} = countWordsAndCharacters(paragraph);
    console.log(`The paragraph has ${words} words and ${characters} characters.`);
}



const sleep =()=>{
    return new Promise((resolve)=>
    {
        setTimeout(resolve, 1000);
    })
}

async function welcome() {
    let title = chalkAnimation.rainbow("Welcome to JH Word-Counter Application\n");
    await sleep();
    title.stop();
}
await welcome();

main();




