const os = require('os');
const cpuState = require('cpu-stat');

getState = () => {
    const mem = os.freemem() / os.totalmem() * 100;
    console.log(`内存占用率${mem}%`);
    cpuState.usagePercent((err, percent) => {
        console.log(`CPU 占用${percent}%`)
    })
}

setInterval(getState, 1200)

// 方法2
// const { getState } = require('./node_state');
// setInterval(getState, 1200)