const inq = require('inquirer')

const promptInput = async (message) => {
    return await inq.prompt({
        type: 'input',
        name: 'answer',
        message
    })
}

const promtCheckbox = async (message, choices) => {
    return await inq.prompt({
        type: 'checkbox',
        name: 'answer',
        message,
        choices
    })
}

const promptList = async (message, choices) => {
    return await inq.prompt({
        type: 'list',
        name: 'answer',
        message,
        choices
    })
}

exports.promptInput = promptInput;
exports.promptList = promptList;
exports.promtCheckbox = promtCheckbox;