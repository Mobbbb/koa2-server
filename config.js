const config = {
    port: '3001', // 服务端口
    publicDir: __dirname + '/public',
    secret: 'secret',
    expiresTime: 720, // token过期时间，单位: 小时
    cookiesPref: 'token',
    mysql: {
        user: 'user',
        password: 'password',
        database: 'database',
        host: '0.0.0.0',
        port: 3306,
    },
}

module.exports = config
