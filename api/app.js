const express = require('express')
const cors = require('cors');

const postRouter = require('./routers/post');

const api = express();

api.use(cors());
api.use(express.json());
api.use('/post', postRouter)

api.get("/", (req, res) => {
    res.json({
        name: "Bridget Jones Diary",
        description: "Upload, delete and view your diary entries"
    })
})


module.exports = api;