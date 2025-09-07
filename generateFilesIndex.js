const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const basePath = './Demo-1.19.4';
const output = {};

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) walk(fullPath);
        else {
            const relativePath = path.relative(basePath, fullPath).replace(/\\/g, '/');
            const data = fs.readFileSync(fullPath);
            const hash = crypto.createHash('md5').update(data).digest('hex');
            output[relativePath] = hash;
        }
    });
}

walk(basePath);
fs.writeFileSync('filesIndex.json', JSON.stringify(output, null, 2));
console.log('filesIndex.json généré avec succès !');
