import express from "express";
import type { Application } from "express";
import { startMongoClient } from "./services/mongoService.ts";
import 'dotenv/config'
import passport from "passport";
import session from "express-session";

const app: Application = express();
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET ?? (() => { throw new Error("session secret is required"); })(),
        resave: false,
        saveUninitialized: false,
    })
);

async function setupClient() {
    const client = await startMongoClient();
    app.locals.client = client;
}

setupClient();

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});