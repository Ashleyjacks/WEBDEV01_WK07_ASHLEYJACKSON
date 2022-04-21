const inq = require('inquirer')

const promptInput = async (message) => {
    return await inq.prompt({
        type: 'input',
        name: 'answer',
        message
    })
}

exports.promptInput = promptInput;