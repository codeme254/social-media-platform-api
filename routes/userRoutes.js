import {
  getAllUsers,
  getUser,
  createUser,
  updateUserInformation,
  deleteUser,
} from "../controllers/userController.js";

const userRoutes = (app) => {
  app.route("/users").get(getAllUsers).post(createUser);

  app
    .route("/users/:id")
    .get(getUser)
    .put(updateUserInformation)
    .delete(deleteUser);
};

export default userRoutes;
