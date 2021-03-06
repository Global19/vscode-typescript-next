// @ts-check
const fs = require('fs');
const path = require('path');

const json = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json')).toString());
const jsonLock = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package-lock.json')).toString());

// Set version to TS Version
const version = jsonLock['dependencies']['typescript']['version'].replace(/0?\-\w*\./g, '');
if (version === json['version']) {
    console.log(`Already at latest version ${version}`);
    process.exit(1);
}

console.log(`Bumping to version ${version}`);
json['version'] = version;
fs.writeFileSync('./package.json', JSON.stringify(json, null, 2));

process.exit(0);