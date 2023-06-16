import {
  getCommentsForAPost,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/commentsController.js";
const commentsRoutes = (app) => {
  app.route("/:user_id/:post_id").get(getCommentsForAPost).post(createComment);

  app
    .route("/:user_id/:post_id/:comment_id")
    .put(updateComment)
    .delete(deleteComment);
};

export default commentsRoutes;
