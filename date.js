#!/usr/bin/env node

const currentDate = () => {
    today = new Date()
    if (argv.year)
        console.log(today.getFullYear())
    else if (argv.month)
        console.log(today.getMonth() + 1)
    else if (argv.date)
        console.log(`${today.getFullYear()}-${(today.getMonth()+1)}-${today.getDate()}`)
    else
        console.log(today.toISOString())
}

const addDate = (val) => {
    today = new Date()
    if (argv.year)
        console.log(new Date(today.setYear(today.getFullYear() + val)).toISOString())
    else if (argv.month)
        console.log(new Date(today.setMonth(today.getMonth() + val)).toISOString())
    else if (argv.date)
        console.log(new Date(today.setDate(today.getDate() + val)).toISOString())
}

const reduceDate = (val) => {
    today = new Date()
    if (argv.year)
        console.log(new Date(today.setYear(today.getFullYear() - val)).toISOString())
    else if (argv.month)
        console.log(new Date(today.setMonth(today.getMonth() - val)).toISOString())
    else if (argv.date)
        console.log(new Date(today.setDate(today.getDate() - val)).toISOString())
}  

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv))
.option('year', {
    alias: 'y',
    type: 'boolean',
    description: 'Current year',
    default: false
})
.option('month', {
    alias: 'm',
    type: 'boolean',
    description: 'Current month',
    default: false
})
.option('date', {
    alias: 'd',
    type: 'boolean',
    description: 'Current day',
    default: false
})
.argv

if (argv._.includes('add'))
    addDate(argv._[1])
else if (argv._.includes('sub'))
    reduceDate(argv._[1])
else
    currentDate()  