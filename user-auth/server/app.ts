import express, { type Request, type Response } from "express";
import type { Application } from "express";
import { startMongoClient } from "./services/mongoService.ts";
import 'dotenv/config'
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import session from "express-session";
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

// Session setup
app.use(
    session({
        secret: process.env.SESSION_SECRET ?? (() => { throw new Error("session secret is required"); })(),
        resave: false,
        saveUninitialized: false,
    })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

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

app.use("/users", usersRouter); // This is an unprotected route
app.use('/hello', ensureAuthenticated, helloRouter); // This is a protected route

app.post("/register", (req: Request, res: Response) => createUserController(req, res));

app.post("/log-in", passport.authenticate("local"), (req: Request, res: Response) => {
    res.json({
        message: "login successful",
        user: req.user,
    });
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

app.get("/auth-status", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.json({
            isAuthenticated: true,
            user: req.user,
        });
    } else {
        res.json({
            isAuthenticated: false,
        });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});