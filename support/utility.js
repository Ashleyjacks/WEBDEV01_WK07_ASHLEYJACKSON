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

exports.db = db;