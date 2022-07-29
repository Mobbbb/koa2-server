const fs = require('fs')
const path = require('path')
const mysql = require('mysql')
const config = require('../config')

const pool = mysql.createPool(config.mysql)
const mapper = {
	mysql,
	modules: {},
}

mapper.queryConnection = (sql, val) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, val, (err, fields) => {
                    if (err) reject(err)
                    else resolve(fields)
                    connection.release()
                })
            }
        })
    })
}

fs.readdirSync(__dirname).filter(file => file.indexOf('.') === -1).forEach((file) => {
	const modules = require(`${path.join(__dirname, file)}/index`)
    mapper.modules[file] = {
		modules,
		query: (moduleName) => {
			return async (params) => {
				const sql = modules[moduleName](params)
				return await mapper.queryConnection(sql)
			}
		}
	}
})

mapper.getModules = function(name) {
	return this.modules[name]
}

module.exports = mapper
