// 第三方库调用
const cpuState = require('cpu-stat');
cpuState.usagePercent((err, percent) => {
    console.log(`CPU 占用${percent}%`)
})