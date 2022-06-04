#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const fs = require('fs')

const argv = yargs(hideBin(process.argv))
.option('filename', {
    alias: 'f',
    type: 'string',
    description: 'File with log',
    default: ''
})
.argv

if (!argv.filename.length) {
    console.log("Не указан путь к файлу")
} else {
    const rl = readline.createInterface({ input, output });
    const writerSrt = fs.createWriteStream(argv.filename)

    console.log("Играем в орла и решку")
    console.log("Введите 0 или 1")
    console.log("Ввод любого другого символа означает конец игры")

    rl.on('line', (answer) => {
        let number = Math.round(Math.random())
        let answerInt = parseInt(answer)
        if (answerInt != 1 && answerInt != 0) {
            console.log('Игра прервана: введено недопустимое значение')
            writerSrt.end()
            rl.close()
        }
        else if (answerInt != number) {
            console.log(`Неверно, правильный ответ - ${number}`)
            writerSrt.write(`Неверно, правильный ответ - ${number} \n`, 'UTF8')
        }
        else {
            console.log(`Верно, ответ - ${number}`)
            writerSrt.write(`Верно, ответ - ${number} \n`, 'UTF8')
        }
    });

    rl.on('close', function(){
        writerSrt.end()
    });
}    
