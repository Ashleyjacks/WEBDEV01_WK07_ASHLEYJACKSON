const fs = require('fs')

const db = () => {
    return JSON.parse(fs.readFileSync('./database/db.json', 'utf-8', (err, json) => {
        if (err) {
            console.log(err)
            return;
        }

        return json
    }))
}

const getTodoList = (id) => {
    return db().find(list => list.id == id)
}

exports.db = db;
exports.getTodoList = getTodoList;