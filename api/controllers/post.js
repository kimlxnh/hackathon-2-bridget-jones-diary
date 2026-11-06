const Post = require('../models/post');

async function index (req, res) {
    try {
        const posts = await Post.getAll();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
};

async function create (req, res) {
    try {
        const data = req.body;
        const result = await Post.create(data);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message})
    }
};

async function showById (req, res) {
    try {
        const id = parseInt(req.params.id);
        const post = await Post.getOneById(id);
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
 };

async function showByCategory (req, res) {
    try {
        const post = await Post.getByCategory(req.params.category);
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
 }; 

 async function update (req, res) {
    try {
        const post = await Post.getOneById(req.params.id)
        const result = await post.update(req.body)
        res.status(200).json(result)
    } catch(err) {
        res.status(404).json({"error": err.message})
    }
 }

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const post = await Post.getOneById(id);
        await post.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

module.exports = { index, showById, showByCategory, create, update, destroy}