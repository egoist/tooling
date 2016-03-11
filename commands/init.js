'use strict'
const pkg = require('update-pkg')

module.exports = function (type) {
	const use = type || 'vue'
	try {
		const data = pkg.data()
		data.scripts.build = `tooling build -e src/index -u ${use}`
		data.scripts.watch = `tooling watch -e src/index -u ${use}`
		data.scripts.deploy = 'npm run build && tooling gh'
		pkg.update(data)
	} catch (e) {
		console.log(e.stack)
	}
}
