const fs = require('fs')
const path = require('path')

const files = fs.readdirSync(__dirname).filter(file => file !== 'index.js')

const services = {}
for (const file of files) {
	const stat = fs.statSync(path.join(__dirname, file))
	if (stat.isDirectory()) {
		const secondFiles = fs.readdirSync(path.join(__dirname, file))
		for (const secondFile of secondFiles) {
			if (secondFile === 'index.js') {
				const service = require(`./${file}/${secondFile}`)
				services[file] = service
			}
		}
	}
}

module.exports = services
