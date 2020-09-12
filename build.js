const {exec} = require('child_process');
const {promisify} = require('util');
const {existsSync, unlinkSync, rmdirSync, lstatSync, readdirSync, mkdirSync, renameSync, } = require('fs');
const path = require('path');

const promisifiedExec = promisify(exec);

const deleteDir = (dirPath) => {
    if (existsSync(dirPath)) {
        readdirSync(dirPath).forEach((file) => {
            const currentFilePath = path.join(dirPath, file);
            if (lstatSync(currentFilePath).isDirectory()) {
                deleteDir(currentFilePath);
            } else {
                unlinkSync(currentFilePath);
            }
        });
        rmdirSync(dirPath);
    }
};

async function build() {
    if (existsSync('executables')) {
        deleteDir('executables');
    }

    mkdirSync('executables');
    mkdirSync(path.join('executables', 'win-64'));
    mkdirSync(path.join('executables', 'linux-64'));
    mkdirSync(path.join('executables', 'macos-64'));

    const {stdout} = await promisifiedExec('pkg .');
    console.log(stdout);

    renameSync('hackerrank-solutions-extractor-win.exe', path.join('executables', 'win-64', 'hse.exe'));
    renameSync('hackerrank-solutions-extractor-linux', path.join('executables', 'linux-64', 'hse'));
    renameSync('hackerrank-solutions-extractor-macos', path.join('executables', 'macos-64', 'hse'));

}

build();
