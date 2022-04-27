// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

function getDirectories(pathname){
    return fs.readdirSync(pathname, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
}

function scopes(){
    const pagesPath = path.resolve(__dirname, "../src/pages");

    return getDirectories(pagesPath);
}

function directoriesInPath(pathname){
    const directoriesPath = path.resolve(__dirname, pathname);

    return getDirectories(directoriesPath);
}

module.exports ={
    scopes,
    directoriesInPath
}
