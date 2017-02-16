const db = require('./sequelize.js')
db.read().then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)

})