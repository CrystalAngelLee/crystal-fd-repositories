import path from 'path'
import fs from 'fs-extra'

// 清空目标目录
fs.emptyDirSync(path.join(process.cwd(), 'lib'))

export default {
  input: path.join(__dirname, 'src/index.js'),
  output: [
    {
      file: path.join(__dirname, 'lib/index.js'),
      format: 'es',
      sourcemap: true,
    },
  ],
}
