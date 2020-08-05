const fs = require('fs');
const path = require('path');

const { ungzip } = require('node-gzip');
const chalk = require('chalk');

const {pad, fileExtensionMap} = require('./utils');

const getProfileData = async (fileBuffer) => {
    const fileContent = await ungzip(fileBuffer);
    return JSON.parse(fileContent.toString());
};

const getSubmissions = (profileData) => {
    // filter out submissions that are written in languages which are not included in fileExtensionMap and score is not perfect
    const languageSet = new Set(fileExtensionMap.keys());
    const submissions = profileData['submissions'].filter(submission => languageSet.has(submission.language) && submission['score'] === 1.0);

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

    return submissions;
};

// This function returns the file name for the given submission. By default it is the name of challenge. However, you can change it but ensure that it is unique.
// the submission obj has `contest`, `challenge`, `code`, `score` and `language` fields
const getFileName = (submission) => {
    const fileName = submission.challenge.match(/^[a-zA-Z0-9 ]*/)[0];
    return fileName + '.' + fileExtensionMap.get(submission.language).extension;
};

const createFile = (content, path) => {
    const fileWriteStream = fs.createWriteStream(path);
    fileWriteStream.write(content);
    fileWriteStream.close();
};

async function main() {
    const file = fs.readFileSync(path.join(process.cwd(), process.argv[2]));
    const profileData = await getProfileData(file);

    const SUBMISSIONS_FOLDER = './submissions';
    if (fs.existsSync(SUBMISSIONS_FOLDER)) {
        console.log(`${chalk.bold.red('Error! : A folder named submissions already exists. Delete this folder as it is going to be used for saving your code submissions.')}`);
        process.exit(0);
    }
    fs.mkdirSync(SUBMISSIONS_FOLDER);
    process.chdir(path.join(process.cwd(), SUBMISSIONS_FOLDER));

    console.log(`${chalk.bold.cyan('User')} : ${chalk.bold.green(profileData['name'])}\n`);

    const submissions = getSubmissions(profileData);
    for (let submission of submissions) {
        createFile(submission.code, path.join(process.cwd(), getFileName(submission)));
    }
}

main();
