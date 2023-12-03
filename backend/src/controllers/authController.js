require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const userService = require("../services/userService");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async function (accessToken, refreshToken, profile, done) {

            try {

                //Validamos si el usuario existe (Login) o si hay que agregarlo (registro)

                const user = await userService.getGoogleUser(profile.id);

                if (user != "") {
                    console.log(`Login user: ${user[0].user_name}`);
                    profile.id = user[0].user_id;
                    done(null, profile);

                } else {
                    const newUser = {
                        user_name: profile.displayName,
                        email: profile.emails[0].value,
                        password: 'N/A',
                        google_id: profile.id,
                        github_id: 'N/A',
                    };
                    const addUser = await userService.createNewUser(newUser);

                    console.log(`Add new user: ${addUser.user_name}`);
                    profile.id = addUser.user_id;
                    done(null, profile);
                }
            } catch (error) {
                console.log(error);
            }
        }
    )
);

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/callback",
        },
        async function (accessToken, refreshToken, profile, done) {

           
            try {

                //Validamos si el usuario existe (Login) o si hay que agregarlo (registro)

                const user = await userService.getGithubUser(profile.id);

                if (user != "") {
                    console.log(`Login user: ${user[0].user_name}`);
                    profile.id = user[0].user_id;
                    done(null, profile);

                } else {
                    const newUser = {
                        user_name: profile.username,
                        email: profile.emails[0].value,
                        password: 'N/A',
                        google_id: 'N/A',
                        github_id: profile.id,
                    };
                    const addUser = await userService.createNewUser(newUser);

                    console.log(`Add new user: ${addUser.user_name}`);
                    profile.id = addUser.user_id;
                    done(null, profile);
                }
            } catch (error) {
                console.log(error);
            }
        }
    )
);

passport.use(new LocalStrategy(
    async function(username, password, done) {

        console.log(username);
        try {

            const user = await userService.getUserByName(username);

            if (user != "") {
                
                console.log("Usuario encontrado");
                if(user[0].password == password){
                    done(null, {id: user[0].user_id});
                }else{
                    console.log("Contraseña incorrecta");
                    return done(null, false);
                }

                

            } else {
                console.log("Usuario no registrado");
                return done(null, false);
       
            }
        } catch (error) {
            console.log(error);
            return done(error);
        }
    }
  ));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
