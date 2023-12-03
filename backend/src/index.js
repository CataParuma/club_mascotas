const express = require('express');
const bodyParser = require("body-parser");
const v1UserRouter = require("./v1/routes/userRoutes");
const v1PostRouter = require("./v1/routes/postRoutes");
const v1CommentRouter = require("./v1/routes/commentRoutes");
const v1AuthRoute = require("./v1/routes/authRoutes");
const cookieSession = require("cookie-session");
const cors = require("cors");
const passportSetup = require("./controllers/authController");
const passport = require("passport");

const app = express(); 
const PORT = 3000;

app.use(
    cookieSession({ name: "session", keys: ["patitas"], maxAge: 1 * 60 * 60 * 100 })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use(
    cors({
      origin: "http://localhost:5000",
      methods: "GET,POST,PUT,PATCH,DELETE",
      credentials: true,
    })
  )

app.use(bodyParser.json());
app.use("/auth", v1AuthRoute);
app.use("/api/v1/users", v1UserRouter);
app.use("/api/v1/posts", v1PostRouter);
app.use("/api/v1/comments", v1CommentRouter);

app.listen(PORT, () =>{
    console.log(`API is listening on port ${PORT}`); 
});