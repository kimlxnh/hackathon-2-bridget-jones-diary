require('dotenv').config()

const api = require('./app')
const port = process.env.PORT

api.listen(port, () => {
    console.log(`Server listening on ${port}`);
})