// 1. 工具包测试
const lib = require('scaffold-demo-utils')

// console.log(lib.sum(1, 2))

// 2. 注册命令
const argv = require('process').argv

const command = argv[2]

// 3. 极简版参数解析 --name **
const options = argv.slice(2)
if (options.length > 1) {
  let [option, param] = options

  option = option.replace('--', '')

  if (command) {
    if (lib[command]) {
      lib[command]({ option, param })
    } else {
      console.log('请输入有效命令')
    }
  } else {
    console.log('请输入命令')
  }
}

// 解析 --version || -V
if (command.startsWith('--') || command.startsWith('-')) {
  const globalOption = command.replace(/--|-/g, '')
  if (['version', 'V'].includes(globalOption)) {
    console.log('0.1.0')
  }
}
