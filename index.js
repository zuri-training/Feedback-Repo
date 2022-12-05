const app = require('./src/app')
port = process.env.PORT || 9999


app.listen(port, () => {
	console.log('Server up at '+ port)
})
