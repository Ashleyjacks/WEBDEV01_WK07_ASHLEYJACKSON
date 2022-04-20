const fs = require('fs')
const inq = require('inquirer')
const uuidv4 = require('uuid').v4
const colors = require('colors')
const Table = require('cli-table3')
const _ = require('lodash')

const { messageTitle } = require('./support/messages')
const { db } = require('./support/utility')


const run = async () => {
    messageTitle()

    let result = await inq.prompt({
        type: 'list',
        name: 'answer',
        message: 'Choose an option',
        choices: [
            { name: 'Create new list', value: 'new' },
            { name: 'Select list', value: 'select' },
            { name: 'Exit', value: 'exit' },
        ]
    })

    if (result.answer == 'new') {
        const name = await inq.prompt({
            type: 'input',
            name: 'answer',
            message: 'List Name: '
        })
        // name, id, items
        const entry = {
            name: name.answer,
            id: uuidv4(),
            items: []
        }

        const modifiedDB = [...db(), entry]
        fs.writeFileSync('./database/db.json', JSON.stringify(modifiedDB), { encoding: 'utf-8' })
        console.log(db())
    }

    if (result.answer == 'exit') {
        console.clear()
        console.log('Thank you. See you again')
        console.log(' ')
    }
}

run()