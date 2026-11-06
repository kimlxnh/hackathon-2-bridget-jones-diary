const { Router } = require('express');
const postController = require('../controllers/post');

const postRouter = Router();

postRouter.get("/", postController.index);
postRouter.post("/", postController.create);
postRouter.get("/category/:category", postController.showByCategory)
postRouter.get("/:id", postController.showById);
postRouter.patch('/:id', postController.update)
postRouter.delete("/:id", postController.destroy);

module.exports = postRouter;