import express from "express";
import mongoose from "mongoose";
import Cors from "cors";

import Cards from "./dbCards.js";

// app config
const app = express();
const connection_url =
	"mongodb+srv://admin123:admin123@cluster0.ljmc2.mongodb.net/tinderdb?retryWrites=true&w=majority";

// db config
mongoose.connect(connection_url, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

// middlewares
app.use(express.json());
app.use(Cors());

// api endpoints
app.get("/", (req, res) => {
	res.status(200).send("hello server!");
});

app.post("/tinder/cards", (req, res) => {
	const dbCard = req.body;

	Cards.create(dbCard, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

app.get("/tinder/cards", (req, res) => {
	Cards.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

// listener
const port = 4000 || process.env.PORT;
app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});
