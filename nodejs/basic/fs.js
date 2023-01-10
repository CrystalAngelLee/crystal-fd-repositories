// const fs = require('fs');
// const data = fs.readFileSync('../package.json'); // Buffer
// console.log(data.toString()) // toString 默认使用utf-8格式：toString('utf-8)

// const fs = require('fs');
// fs.readFile('../package.json', (err, data) => {
//     console.log(data.toString())
// })

// const fs = require('fs');
// const { promisify } = require('util')
// const readFile = promisify(fs.readFile);
// readFile('../package.json').then(data => {
//     console.log(data.toString())
// })

(async () => {
    const fs = require('fs');
    const { promisify } = require('util')
    const readFile = promisify(fs.readFile);
    const data = await readFile('../package.json')
    console.log("file:", data.toString())
})()