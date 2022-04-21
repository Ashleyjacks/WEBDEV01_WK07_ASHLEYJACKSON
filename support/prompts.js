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

const promptConfirm = async (message) => {
    return await inq.prompt({
        type: 'confirm',
        name: 'answer',
        message
    })
}

const confirmRecursively = async (message) => {
    const result = await promptConfirm(message)
    if (result.answer) {
        return true;
    }

    return await confirmRecursively(message)
}
exports.promptInput = promptInput;
exports.promptList = promptList;
exports.promtCheckbox = promtCheckbox;
exports.promptConfirm = promptConfirm;
exports.confirmRecursively = confirmRecursively;