import bcrypt from "bcrypt";
import express from "express";
import User from "../models/user";

const router = express.Router();

router.get("/", async (request, response) => {
  const users = await User.find({}).populate("ownBets");
  response.json(users);
});

router.post("/", async (request, response, next) => {
	try{
		const { username, email, password } = request.body;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
			return response.status(400).json({ error: "Invalid email" });
		}

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(password, saltRounds);

		const user = new User({
			username,
			email,
			passwordHash,
		});

		const savedUser = await user.save();

		response.status(201).json(savedUser);
	} catch (error) {
		next(error);
	}
});

// ranking
router.get("/ranking", async (req, res) => {
  // buscamos solo username y coins, ordenados por coins descendente
  const topUsers = await User.find({}, { username: 1, coins: 1 })
	.sort({ coins: -1 })
	.limit(10);

  res.json(topUsers);
});

router.get("/:id", async (request, response, next) => {
	try {
		const id = request.params.id;
		const user = await User.findById(id).populate("ownBets");
		response.json(user);
	} catch (error) {
		next(error);
	}
});



export default router;
