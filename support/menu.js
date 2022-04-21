const fs = require('fs')
const uuidv4 = require('uuid').v4
const { db } = require('./utility')
const { promptInput } = require('./prompts')

const dbPath = './database/db.json'

const lookupTable = async (answer, id) => {
    return await {
        new: addNewEntry,
        exit: exitApp
    }[answer](id)
}

// Entry menu



const addNewEntry = async () => {
    const name = await promptInput('Name of List: ')

    const entry = {
        name: name.answer,
        id: uuidv4(),
        items: []
    }

    const modifiedDB = [...db(), entry]
    fs.writeFileSync(dbPath, JSON.stringify(modifiedDB), { encoding: 'utf-8' })
    return entry.id
}

const exitApp = () => {
    console.clear()
    console.log('Thank you. See you again')
    console.log(' ')
    return null;
}

exports.lookupTable = lookupTable;