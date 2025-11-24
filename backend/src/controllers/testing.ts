import express from "express";
import User from "../models/user";
import Bet from "../models/bet"

const router = express.Router();

router.post("/reset", async (request, response) => {
    console.log("hola")
    await User.deleteMany({});
    await Bet.deleteMany({});
    response.status(204).end();
});

export default router;