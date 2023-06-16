import express from "express";
import { config } from "./db/config.js";
import userRoutes from "./routes/userRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";
import commentsRoutes from "./routes/commentsRoute.js";

const app = express();
app.use(express.json());

userRoutes(app);
postsRoutes(app);
commentsRoutes(app);

app.listen(config.port, () => {
  console.log(`App running on port ${config.url}`);
});
