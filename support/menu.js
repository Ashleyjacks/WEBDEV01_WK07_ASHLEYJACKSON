const fs = require('fs')
const uuidv4 = require('uuid').v4
const Table = require('cli-table3')
const { db, getTodoList } = require('./utility')
const { promptInput, promptList, promtCheckbox, promptConfirm, confirmRecursively } = require('./prompts')

const dbPath = './database/db.json'

const lookupTable = async (answer, id) => {
    return await {
        new: addNewEntry,
        exit: exitApp,
        add: addItemToList,
        remove: removeItemsFromList,
        update: updateListStatus,
        view: viewList,
        back: goBackOneLevel
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

// submenu



const addItemToList = async (id) => {
    const todoList = getTodoList(id)
    const text = await promptInput('Item: ')
    const entry = {
        id: uuidv4(),
        text: text.answer,
        complete: false
    }

    const modifiedTodoList = { ...todoList, items: [...todoList.items, entry] }
    const modifiedDB = [...db().filter(list => list.id != id), modifiedTodoList]
    fs.writeFileSync(dbPath, JSON.stringify(modifiedDB), { encoding: 'utf-8' })
    return id
}

const removeItemsFromList = async (id) => {
    const todoList = getTodoList(id)
    const items = todoList.items.map(item => {
        return { name: item.text, value: item.id }
    })
    const result = await promptList('Select the item to delete.', items)

    const modifiedTodoList = { ...todoList, items: todoList.items.filter(item => item.id != result.answer) }
    const modifiedDB = [...db().filter(list => list.id != id), modifiedTodoList]
    fs.writeFileSync(dbPath, JSON.stringify(modifiedDB), { encoding: 'utf-8' })
    return id
}

const updateListStatus = async (id) => {
    const todoList = getTodoList(id)
    const items = todoList.items.map(item => {
        return { name: item.text, value: item.id, checked: item.complete }
    })
    const result = await promtCheckbox('Select completed items.', items)
    const modifiedItems = todoList.items.map(item => {
        if (result.answer.includes(item.id)) {
            return { ...item, complete: true }
        }

        return { ...item, complete: false }
    })

    const modifiedTodoList = { ...todoList, items: modifiedItems }
    const modifiedDB = [...db().filter(list => list.id != id), modifiedTodoList]
    fs.writeFileSync(dbPath, JSON.stringify(modifiedDB), { encoding: 'utf-8' })
    return id
}

const viewList = async (id) => {
    const todoList = getTodoList(id)
    const items = todoList.items.map(item => [item.text, item.complete])

    const table = new Table({
        head: ['Item', 'Complete']
        , colWidths: [20, 10]
    });

    items.forEach(item => {
        table.push(item);
    })

    console.log(table.toString());
    await confirmRecursively('Are you ready to move on')
    return id
}

const goBackOneLevel = async (id) => {
    // const todoList = getTodoList(id)
}

exports.lookupTable = lookupTable;