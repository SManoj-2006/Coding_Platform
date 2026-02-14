import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
const app = express();

const corsOptions = {
    origin: ENV.CLIENT_URL || true,
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

let isConnected = false;

app.use(async (req, res, next) => {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }
    next();
});

app.use("/api/ingest", serve({ client: inngest, functions }));

app.get("/api/health", (req, res) => {
    res.status(200).json({ msg: "success from backend (health)" });
});

app.get("/api/book", (req, res) => {
    res.status(200).json({ msg: "success from backend (book)" });
});

const port = ENV.PORT || 3000;

if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log("Server is running:", port);
    });
}

export default app;