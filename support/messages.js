const { db } = require('./utility')

const messageTitle = (id = null) => {
    console.clear()
    if (id) {
        const entry = db().find(entry => entry.id == id)
        console.log(`Todo-list: ${entry.name}`)
    } else {
        console.log('Todo-List')
    }
    console.log(' ')
}

exports.messageTitle = messageTitle;