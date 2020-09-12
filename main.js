const fs = require('fs');
const path = require('path');

const { ungzip } = require('node-gzip');
const chalk = require('chalk');

const {
    pad,
    fileExtensionMap,
    createFile,
    writeCompletionPercentage
} = require('./utils');

const getProfileData = async (fileBuffer) => {
    const fileContent = await ungzip(fileBuffer);
    return JSON.parse(fileContent.toString());
};

// By default the script filters out submissions that are written in languages which are not included in fileExtensionMap or when score is not perfect.
// You may change the criteria of filtering submissions according to your need.
const getSubmissions = (profileData, optionCode) => {
    const languageSet = new Set(fileExtensionMap.keys());
    const submissions = profileData['submissions'].filter(submission => languageSet.has(submission.language));

    // When option `-all` is provided then optionCode is 1 otherwise 0.
    switch (optionCode) {
        case 0:
            return submissions.filter((submission) => submission['score'] === 1.0);
        case 1:
            return submissions;
    }
};

const printSubmissionsStats = (submissions) => {
    const submissionsStats = new Map();
    submissions.map(submission => {
        const langName = fileExtensionMap.get(submission.language).languageName;
        if (submissionsStats.has(langName)) {
            submissionsStats.set(langName, submissionsStats.get(langName) + 1);
        } else {
            submissionsStats.set(langName, 1);
        }
    });

    console.log(`Found a total of ${submissions.length} submissions. The breakdown with respect to language is as follows.\n`);
    for (let [languageName, languageSubmissions] of submissionsStats.entries()) {
        console.log(`${pad(chalk.bold.cyan(languageName), 30)} : ${chalk.bold.green(languageSubmissions)}`);
    }
    console.log();
};

// This function returns the file name for the given submission. By default it is the name of challenge. However, you can change it but ensure that it is unique.
// The submission obj has `contest`, `challenge`, `code`, `score` and `language` fields.
const getFileName = (submission) => {
    if (!getFileName.allFileNames) {
        getFileName.allFileNames = new Map();
    }

    let fileName = submission.challenge.split('').reduce((a, b) => {
        return a + (/[a-zA-Z0-9-_ ]/.test(b) ? b : '');
    }, '');

    let filePath;
    if (getFileName.allFileNames.has(fileName)) {
        filePath = fileName + `- ${getFileName.allFileNames.get(fileName)}`;
        getFileName.allFileNames.set(fileName, getFileName.allFileNames.get(fileName) + 1);
    } else {
        filePath = fileName;
        getFileName.allFileNames.set(fileName, 1);
    }

    return filePath + '.' + fileExtensionMap.get(submission.language).extension;
};

const getOptionCode = () => {
    if (!process.argv[3]) {
        return 0;
    } else if (process.argv[3] === '-all') {
        return 1;
    }
    console.log(chalk.bold.red(`Invalid option ${process.argv[3]}`));
    process.exit(0);
};

async function main() {
    if (!process.argv[2]) {
        console.log(`${chalk.bold.yellow(`Provide the path of profile data file. In case you don't have it, you can download it from https://www.hackerrank.com/settings/account`)}`);
        process.exit(0);
    }
    const optionCode = getOptionCode();

    const file = fs.readFileSync(path.join(process.cwd(), process.argv[2]));
    const profileData = await getProfileData(file);

    const SUBMISSIONS_FOLDER = path.join('submissions');
    if (fs.existsSync(SUBMISSIONS_FOLDER)) {
        console.log(`${chalk.bold.red('Error! : A folder named submissions already exists. Delete this folder as it is going to be used for saving your code submissions.')}`);
        process.exit(0);
    }
    fs.mkdirSync(SUBMISSIONS_FOLDER);
    process.chdir(path.join(process.cwd(), SUBMISSIONS_FOLDER));

    console.log(`${chalk.bold.cyan('User')} : ${chalk.bold.green(profileData['name'])}\n`);

    const submissions = getSubmissions(profileData, optionCode);
    printSubmissionsStats(submissions);
    for (let i = 0; i < submissions.length; i++) {
        const filePath = path.join(process.cwd(), getFileName(submissions[i]));
        createFile(submissions[i].code, filePath);
        writeCompletionPercentage(Math.ceil((i / submissions.length) * 100));
    }
}

main();
