#! /usr/bin/env node

const { program } = require('commander')

// console.log('执行了')
// program.option('-p --port', 'set server port')

// 配置信息
let options = {
  '-p, --port <dir>': {
    description: 'init server port',
    example: 'live_server -p 3306',
  },
  '-d, --directory <dir>': {
    description: 'init server directory',
    example: 'live_server -d c:',
  },
}

function formatConfig(configs, cb) {
  Object.entries(configs).forEach(([key, val]) => {
    cb(key, val)
  })
}

formatConfig(options, (cmd, val) => {
  program.option(cmd, val.description)
})

program.on('--help', () => {
  console.log('Examples: ')
  formatConfig(options, (cmd, val) => {
    console.log(val.example)
  })
})

program.name('live_server')
const version = require('../package.json').version
program.version(version)

const cmdConfig = program.parse(process.argv)
console.log(cmdConfig.port)

let Server = require('../main.js')
new Server(cmdConfig).start()
