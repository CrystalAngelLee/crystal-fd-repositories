(async () => {
    const { MongoClient: MongoDB } = require('mongodb')

    // 创建客户端
    const client = new MongoDB(
        'mongodb://localhost:27017',
        {
            useNewUrlParser: true
        }
    )

    let ret
    // 创建连接
    ret = await client.connect()

    const db = client.db('crystaltest')
    const fruits = db.collection('fruits')

    // 添加文档
    ret = await fruits.insertOne({
        name: 'Apple',
        price: 20.1
    })
    console.log('insertOne', JSON.stringify(ret) )

    // 查询数据
    ret = await fruits.findOne()
    console.log('find:', ret)

    // 更新文档
    ret = await fruits.update({
        name:'芒果'
    }, {
        $set: {name: '火龙果'}
    })

    // 删除文档
    ret = await fruits.deleteOne({name: '火龙果'})
    // ret = await fruits.deleteMany()
})()