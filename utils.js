const pad = (str, length) => {
    return str.length >= length ? str : str + ' '.repeat(length - str.length);
};

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

module.exports = {
    pad,
    fileExtensionMap
};
