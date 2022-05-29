#!/usr/bin/env node

const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

const number = Math.floor(Math.random() * 100);
console.log("Загадано число в диапазоне от 0 до 100")

rl.on('line', (answer) => {
    let answerInt = parseInt(answer)
    if (answerInt < number)
        console.log('Больше') 
    else if (answerInt > number)
        console.log('Меньше')
    else {
        console.log(`Отгадано число ${answerInt}`)
        rl.close()
    }
});

