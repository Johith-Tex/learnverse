const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(file));
        } else {
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walkDir(path.join(__dirname, 'src'));
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Protect eslint-disable
    content = content.replace(/\/\/\s*eslint-disable/g, 'ESLINT_DISABLE_TOKEN');
    
    // Protect http:// and https://
    content = content.replace(/https?:\/\//g, match => match === 'http://' ? 'HTTP_TOKEN' : 'HTTPS_TOKEN');
    
    // Remove multi-line comments
    content = content.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Remove single line comments (with leading space or at start of string)
    content = content.replace(/(^|\s)\/\/[^\n]*\n/g, '\n');
    
    // Restore
    content = content.replace(/ESLINT_DISABLE_TOKEN/g, '// eslint-disable');
    content = content.replace(/HTTP_TOKEN/g, 'http://');
    content = content.replace(/HTTPS_TOKEN/g, 'https://');
    
    fs.writeFileSync(file, content);
});
console.log('Stripped comments from ' + files.length + ' files.');
