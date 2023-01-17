(async () => {
    const mysql = require('mysql2/promise')
    // 连接配置
    const cfg = {
        host: "localhost",
        user: "root",
        password: "test", // 修改为你的密码 database: "crystaltest" // 请确保数据库存在
        database: 'crystaltest'
    };
    // 创建连接对象
    const connection = await mysql.createConnection(cfg)
    console.log('connection', connection)
    
    // 创建表
    // let ret = await connection.execute(`
    //     CREATE TABLE IF NOT EXISTS test (
    //         id INT NOT NULL AUTO_INCREMENT,
    //         message VARCHAR(45) NULL,
    //     PRIMARY KEY (id))
    // `)
    
    // 插入数据
    // ret = await connection.execute(`
    //     INSERT INTO test(message) VALUES(?)
    // `, ['ABC'])

    // console.log('ret', ret);

    // 查询
    const [rows, fields] = await connection.execute(`
        SELECT * FROM test
    `)
    console.log('ret', JSON.stringify(rows));
})()