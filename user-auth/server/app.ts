import express, { type Request, type Response } from "express";
import type { Application } from "express";
import { startMongoClient } from "./services/mongoService.ts";
import 'dotenv/config'
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import cors from 'cors';
import { getUserById, getUserByUsername } from "./services/usersService.ts";
import usersRouter from "./routes/usersRouter.ts";
import helloRouter from "./routes/helloRouter.ts";
import { createUserController } from "./controllers/usersController.ts";

// Express + Mongo setup
const app: Application = express();
app.use(express.json());
app.use(cors());

async function setupClient() {
    const client = await startMongoClient();
    app.locals.client = client;
}

setupClient();

// Passport setup
app.use(passport.initialize());

// Local strategy for username + password login
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

// Register (creates user)
app.post("/register", (req: Request, res: Response) => createUserController(req, res));

// Log in
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
            const return_user = {
                username: user.username,
                user_id: user._id,
            }
            return res.json({user: return_user, token});
        });
    })(req, res);
});

// Protected routes
app.use("/users", passport.authenticate('jwt', {session: false}), usersRouter);
app.use('/hello', passport.authenticate('jwt', {session: false}), helloRouter);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});