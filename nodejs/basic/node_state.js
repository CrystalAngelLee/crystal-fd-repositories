const os = require('os');
const cpuState = require('cpu-stat');

module.exports.getState = function() {
    const mem = os.freemem() / os.totalmem() * 100;
    console.log(`内存占用率${mem}%`);
    cpuState.usagePercent((err, percent) => {
        console.log(`CPU 占用${percent}%`)
    })
}