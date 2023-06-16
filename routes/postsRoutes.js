import {
  getAllPosts,
  getPostByUser,
  createPostByUser,
  getAllPostsBelongingToAUser,
  deletePost,
  updatePost,
} from "../controllers/postsController.js";

const postsRoutes = (app) => {
  app.route("/:userId/posts/new").post(createPostByUser);

  app.route("/posts").get(getAllPosts);

  app.route("/:userId/posts").get(getAllPostsBelongingToAUser);

  app
    .route("/:userId/:postId")
    .get(getPostByUser)
    .delete(deletePost)
    .put(updatePost);

  app.route("/:userId/posts").get(getAllPostsBelongingToAUser);
};

export default postsRoutes;
