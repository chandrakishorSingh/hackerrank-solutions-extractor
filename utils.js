const fs = require('fs');
const readline = require('readline');

const chalk = require('chalk');

// This map contains all the permissible languages. If any of your submission is written in other language then you can add it here.
// The key of the entry is `language` field of corresponding submission in `submissions` array field of the json file.
const fileExtensionMap = new Map([
    ['c', { extension: 'c', languageName: 'C' }],
    ['cpp', { extension: 'cpp', languageName: 'C++' }],
    ['cpp14', { extension: 'cpp', languageName: 'C++ 14' }],
    ['javascript', { extension: 'js', languageName: 'JavaScript' }],
    ['python3', { extension: 'py', languageName: 'Python 3' }],
    ['python', { extension: 'py', languageName: 'Python 2' }],
    ['java', { extension: 'java', languageName: 'JAVA' }],
    ['java8', { extension: 'java', languageName: 'JAVA' }],
    ['text', { extension: 'txt', languageName: 'Text' }],
    ['haskell', { extension: 'hs', languageName: 'Haskell' }],
    ['bash', { extension: 'sh', languageName: 'Bash' }],
    ['mysql', { extension: 'sql', languageName: 'MySQL' }]
]);

const pad = (str, length) => {
    return str.length >= length ? str : str + ' '.repeat(length - str.length);
};

const createFile = (content, path) => {
    const fileWriteStream = fs.createWriteStream(path);
    fileWriteStream.write(content);
    fileWriteStream.close();
};

const writeCompletionPercentage = (percentage) => {
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(chalk.bold.green(`Creating files... ${percentage}% completed`));
};

module.exports = {
    pad,
    fileExtensionMap,
    createFile,
    writeCompletionPercentage
};
