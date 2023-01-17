orm

数据库中间件

## mongoDB
进入命令行
mongo

查询所有数据库
show dbs

新建数据库
use ***(test)
存数据
db.fruits.save({name: 'apple', price: 3})

查询
db.fruits.find({price: 3})

查询集合
db.getCollectionNames()
