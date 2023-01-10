/*****************  Express服务器  ****************** */
// const express = require('express'); // express的使用
const express = require('./node_express'); //使用自己的express
const app = express()
app.get('/', (req, res) => {
    res.end('Hello..')
})
app.get('/user', (req, res) => {
    res.end(JSON.stringify({name: 'crystal'}))
})
app.listen(3000, () => {
    console.log('App listen at 3000')
})