import express from "express";
import Bet, { IOption } from "../models/bet";
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
  const bet = await Bet.findById(id).populate("owner", { username: 1 });
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
    const options = body.options.map((opt: IOption) => ({
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
      return response.status(400).json({ error: "Invalid option" });
    }

    if (body.amount < bet.minBet) {
      return response.status(400).json({ error: `The minimum bet is ${bet.minBet}` });
    }

    if (user.coins < body.amount) {
      return response.status(400).json({ error: "Insufficient coins" });
    }

    if (bet.participants.includes(user.id)) {
      return response.status(400).json({ error: "You already placed a bet on this event" });
    }

    const myBet = {
      betId: bet.id,
      option: body.option,
      amount: body.amount,
      placedAt: new Date()
    }

    user.bets = user.bets.concat(myBet);
    user.coins -= body.amount;
    await user.save();

    bet.pool += body.amount;
    bet.betsCount +=  1;
    bet.participants = bet.participants.concat(user.id);
    const betUpdated = await bet.save();

    response.status(201).json(betUpdated);
  }
})

// ruta para que owner cambie status de la apuesta
router.put("/:id/status", withUser, async (req, res) => {
  const { status, winningOption } = req.body;
  const bet = await Bet.findById(req.params.id);

  if (!bet) {
    return res.status(404).json({ error: "Bet not found" });
  }

  // asegurarse de que solo el owner puede cambiar estado
  if (bet.owner.toString() !== req.userId) {
    return res.status(403).json({ error: "Not authorized" });
  }

  const validStatuses = ["open", "locked", "resolved"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  // validar transiciones
  const allowedTransitions = {
    open: "locked",
    locked: "resolved",
    resolved: null, // no se puede mover desde resolved
  };

  if (allowedTransitions[bet.status] !== status) {
    return res.status(400).json({
      error: `Invalid transition: ${bet.status} → ${status}`,
    });
  }

  // si se está resolviendo, debe venir un ganador válido
  if (status === "resolved") {
    if (!winningOption) {
      return res.status(400).json({ error: "Winning option required" });
    }

    const option = bet.options.find(o => o.name === winningOption);
    if (!option) {
      return res.status(400).json({ error: "Invalid winning option" });
    }

    bet.winningOption = winningOption;

    const payoutMultiplier = option.payout ?? 1;

    const winners = await User.find({
      "bets.betId": bet._id,
      "bets.option": winningOption
    });

    for (const user of winners) {
      const betData = user.bets.find(
        b => b.betId.toString() === bet._id.toString()
            && b.option === winningOption
      );

      if (!betData) continue;

      const payout = Math.round(betData.amount * payoutMultiplier);

      user.coins += payout;

      await user.save();
    }
  }

  bet.status = status;
  bet.updatedAt = new Date();

  await bet.save();
  const updatedBet = await Bet.findById(bet.id).populate("owner", { username: 1 });

  res.json(updatedBet);
});

export default router;