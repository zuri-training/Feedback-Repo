const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    // useCreateIndex: true,
    // useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function() {
    console.log('Connected successfuly')
})
