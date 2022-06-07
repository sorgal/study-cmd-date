#!/usr/bin/env node

const http = require('http')
const yargs = require('yargs/yargs')
var config = require('./config');
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv)).argv

const city = argv._.join(' ')

if (!city.length) {
    console.log('Ошибка: не введено название города')
} else {
    const myAPIKey = config.myAPIKey
    const url = `http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${argv._[0]}`
    http.get(url, (res) => {
        const {statusCode} = res
        if (statusCode !== 200){
            console.log(`statusCode: ${statusCode}`)
            return
        }
    
        res.setEncoding('utf8')
        let rowData = ''
        res.on('data', (chunk) => rowData += chunk)
        res.on('end', () => {
            let parseData = JSON.parse(rowData)
            if (!parseData.current)
                console.log(`Ошибка на стороне сервиса: ${parseData.error.code} - ${parseData.error.info}`)
            else
                console.log(parseData.current)
        })
    }).on('error', (err) => {
        console.error(err)
    })
}    