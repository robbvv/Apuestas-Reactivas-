import express from "express";
import Bet from "../models/bet";
import User from "../models/user";
import jwt from "jsonwebtoken";
import config from "../utils/config";
import { withUser } from "../utils/middleware";

const router = express.Router();

router.get("/", async (request, response) => {
  const bets = await Bet.find({});
  response.json(bets);
});

router.get("/:id", async (request, response, next) => {
  const id = request.params.id;
  const bet = Bet.findById(id).populate("owner", { username: 1 });
  if (bet) {
    response.json(bet);
  } else {
    response.status(404).end();
  }
});

router.delete("/:id", withUser, async (request, response, next) => {
  const id = request.params.id;
  await Bet.findByIdAndDelete(id);
  response.status(204).end();
});

router.post("/", withUser, async (request, response, next) => {
  const body = request.body;
  const user = await User.findById(request.userId);

  if (!user) {
    response.status(400).json({
      error: "user not found",
    });
  } else {
    // body.options debe ser un array de { name, payout }
    const options = body.options.map((opt: any) => ({
      name: opt.name,
      payout: opt.payout
    }));

    const bet = {
      title: body.title,
      organizer: body.organizer || user.username,
      email: body.email || null,
      description: body.description,
      sport: body.sport,
      location: body.location,
      date: body.date,
      createdAt: body.createdAt,
      updatedAt: body.updatedAt,
      stars: body.stars,
      minBet: body.minBet,
      pool: body.pool,
      betsCount: body.betsCount,
      options: options,
      owner: user.id,
      participants: [],
    };

    const savedBet = await new Bet(bet).save();

    user.ownBets = user.ownBets.concat(savedBet._id);
    await user.save();
    response.status(201).json(savedBet);
  }
})

router.put("/:id", withUser, async (request, response, next) => {
  const body = request.body;

  const bet = await Bet.findById(request.params.id);

  if (bet) {
    bet.title = body.title;
    bet.organizer = body.organizer;
    bet.description = body.description;
    bet.sport = body.sport;
    bet.location = body.location;
    bet.date = body.date;
    bet.stars = body.stars;
    bet.pool = body.pool;
    bet.betsCount = body.betsCount;
    bet.updatedAt = new Date();

    bet.save().then((updatedBet) => {
      response.json(updatedBet);
    });
  } else {
    response.status(404).end();
  }
});

// ruta para que user haga una apuesta
router.post("/:id", withUser, async (request, response, next) => {
  const body = request.body;
  const user = await User.findById(request.userId);
  const bet = await Bet.findById(request.params.id);

  if (!user) {
    response.status(400).json({
      error: "user not found",
    });
  } else if (!bet) {
    response.status(404).end();
  } else {
    const validOption = bet.options.find(opt => opt.name === body.option);
    if (!validOption) {
      return response.status(400).json({ error: "Opción inválida" });
    }

    const myBet = {
      betId: bet.id,
      option: body.option,
      amount: body.amount,
      placedAt: new Date()
    }
    user.bets = user.bets.concat(myBet)
    await user.save()

    bet.pool = bet.pool + body.amount
    bet.betsCount = bet.betsCount + 1
    bet.participants = bet.participants.concat(user.id)
    await bet.save()

    response.status(201).json({
      betId: bet.id,
      userId: user.id,
      option: body.option,
      amount: body.amount,
      pool: bet.pool,
      betsCount: bet.betsCount
    });
  }
})

export default router;