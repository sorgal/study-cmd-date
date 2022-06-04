#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
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
    const readerStream = fs.readFileSync(argv.filename, 'utf-8')
    let winsCount = 0
    let losesCount = 0
    let attemptsCount = 0
    readerStream.split(/\r?\n/).forEach(line =>  {
        if (line.includes('Верно'))
            winsCount++
        else if (line.includes('Неверно'))
            losesCount++
        if (line.length)    
            attemptsCount++
    });
    console.log(`Общее число попыток - ${attemptsCount}`)
    console.log(`Число побед - ${winsCount}`)
    console.log(`Число поражений ${losesCount}`)
}    