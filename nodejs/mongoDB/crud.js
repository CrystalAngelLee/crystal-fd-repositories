// mongoDB CRUD: https://www.mongodb.com/docs/manual/crud/
const { MongoClient, ObjectId } = require('mongodb')

const uri = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(uri)

async function run() {
  try {
    // 开始连接
    await client.connect()
    const testDB = await client.db('muzitest')
    const inventoryCollection = testDB.collection('inventory')

    // 创建|插入文档
    // inventoryCollection.insertOne({
    //   item: 'canvas',
    //   qty: 100,
    //   tags: ['cotton'],
    //   size: { h: 28, w: 35.5, uom: 'cm' },
    // })

    // 查询文档
    // const ret = await inventoryCollection.find({ item: 'mousepad' })
    // console.log(await ret.toArray())

    // 删除文档
    // const ret = await inventoryCollection.deleteOne({
    //   _id: ObjectId('638dacbdac214c74210291bd'),
    // })
    // console.log(ret)

    // 更新文档
    const ret = await inventoryCollection.updateOne(
      {
        _id: ObjectId('638dac2f221d5cae458999f4'),
      },
      {
        $set: {
          qty: 300,
        },
      }
    )
    console.log(ret)
  } catch (e) {
    console.log('Connect failed')
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

run()
