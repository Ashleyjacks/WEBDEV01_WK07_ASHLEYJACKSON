// const fs = require('fs')
const inq = require('inquirer')
// const uuidv4 = require('uuid').v4
const colors = require('colors')
const Table = require('cli-table3')
const _ = require('lodash')

const { messageTitle } = require('./support/messages')
const { lookupTable } = require('./support/menu')
// const { db } = require('./support/utility')


const run = async (id = null) => {
    messageTitle(id)

    let result = await inq.prompt([
        // Entry menu
        {
            type: 'list',
            name: 'answer',
            message: 'Choose an option',
            when: id == null,
            choices: [
                { name: 'Create new list', value: 'new' },
                { name: 'Select list', value: 'select' },
                { name: 'Exit', value: 'exit' },
            ]
        },
        // submenu
        {
            type: 'list',
            name: 'answer',
            message: 'Choose an option',
            when: id != null,
            choices: [
                { name: 'Add item', value: 'add' },
                { name: 'Remove item', value: 'remove' },
                { name: 'Update status', value: 'update' },
                { name: 'View list', value: 'view' },
                { name: 'Go back', value: 'back' },
            ]
        }
    ])

    const returnedId = await lookupTable(result.answer, id)
    returnedId ? run(returnedId) : null
}

run()