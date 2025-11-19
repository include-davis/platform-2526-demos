import express, { type Request, type Response } from "express";
import type { Application } from "express";
import { startMongoClient } from "./services/mongoService.ts";
import 'dotenv/config'
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { getUserById, getUserByUsername } from "./services/usersService.ts";
import usersRouter from "./routes/usersRouter.ts";
import helloRouter from "./routes/helloRouter.ts";
import { createUserController } from "./controllers/usersController.ts";

// Express + Mongo setup
const app: Application = express();
app.use(express.json());

async function setupClient() {
    const client = await startMongoClient();
    app.locals.client = client;
}

setupClient();

// Passport setup
app.use(passport.initialize());

// Local strategy for logins
passport.use(
    new LocalStrategy(async (username: string, password: string, done: Function) => {
        try {
            const user = await getUserByUsername(app.locals.client, username);
            if (!user) {
                return done(null, false, { message: "user does not exist" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: "incorrect password" });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

// JWT strategy for protected routes
passport.use(
    new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    async function (jwtPayload, done) {
        try {
            const user = await getUserById(app.locals.client, jwtPayload.sub);
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user: any, done: Function) => {
    done(null, user._id);
});

passport.deserializeUser(async (id: string, done: Function) => {
    try {
        const user = await getUserById(app.locals.client, id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

function ensureAuthenticated(req: Request, res: Response, next: Function) {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }

    return res.status(401).json({
        message: "Not authenticated",
    });
}

app.post("/register", (req: Request, res: Response) => createUserController(req, res));

/* POST login. */
app.post('/log-in', (req: Request, res: Response) => {
    passport.authenticate("local", {session: false}, (err: Error, user: any) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }

       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign({ sub: user._id.toString() }, 'your_jwt_secret');
           return res.json({user, token});
        });
    })(req, res);
});

app.post("/log-out", (req: Request, res: Response) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({
                message: "logout failed"
            });
        }
        res.json({
            message: "logout successful"
        });
    });
});

app.get(
    "/auth-status", passport.authenticate("jwt", { session: false }), (req: Request, res: Response) => {
        res.json({
            isAuthenticated: true,
            user: req.user,
        });
    }
);
app.use("/users", passport.authenticate('jwt', {session: false}), usersRouter);
app.use('/hello', passport.authenticate('jwt', {session: false}), helloRouter);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});