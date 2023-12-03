const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:5000/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:5000/");
});


//Passport con Google

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], prompt: 'select_account' }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect:"http://localhost:5000/",
    failureRedirect: "/login/failed",
  })
);

//Passport con Github

router.get("/github", passport.authenticate("github", { scope: ["user:email"],
session: false }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "http://localhost:5000/",
    failureRedirect: "/login/failed",
  })
);

//Passport local

router.post(
  '/login',
  passport.authenticate("local"),
  function(req, res) {
     console.log(req.user);
     res.send(req.user);
  }
);



module.exports = router