const express = require('express')
const cors = require("cors")

const app = express()

// 跨域问题处理
app.use(cors())

app.get('/products', async (req, res) => {
  try {
    // const db = await getDb()
    res.status(200).json({
      data: {aa: '11'},
    })
  } catch (err) {
    res.status(500).json({
      error: err.message,
    })
  }
})

app.listen(33090, () => {
  console.log(`Server running at http://localhost:33090/`)
})