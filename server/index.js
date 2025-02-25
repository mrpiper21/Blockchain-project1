import express from "express";
import cors from "cors";
import morgan from "morgan";
import { verify } from "./scripts/verify.js";
const app = express();
const port = 3042;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const balances = new Map();
balances.set(
	"0x03c8dc2c8a11df95aed2a4b34199c51bd12e387cf716cddfb5a5e63821683784e3",
	40
);

const generateRandomBalance = () =>
	Math.floor(Math.random() * (150 - 50 + 1)) + 50;

app.post("/init-wallet", (req, res) => {
	const { address } = req.body;

	try {
		if (!address || typeof address !== "string") {
			return res.status(400).send({ message: "Invalid address format" });
		}

		if (balances.has(address)) {
			return res.send({
				balance: balances.get(address),
				message: "Wallet already initialized",
			});
		}

		const initialBalance = generateRandomBalance();
		balances.set(address, initialBalance);

		res.send({
			balance: initialBalance,
			message: "Wallet initialized successfully",
		});
	} catch (error) {
		console.error("Wallet initialization failed:", error);
		res.status(500).send({ message: "Failed to initialize wallet" });
	}
});

app.get("/balance/:address", (req, res) => {
	const { address } = req.params;
	const balance = balances[address] || 0;
	res.send({ balance });
});

app.post("/send", (req, res) => {
	//TODO: GET SIGNATURE FROM CLIENT APP
	// RECOVER THE PUBLIC ADDRESS FROM THE SIGNATURE
	const { recipientAddress, senderAddress, amount, signature, messageHash } =
		req.body;
	console.log(req.body);
	// const address = recoverPublicKey(messageHash, signature, recipientAddress);
	const isValid = verify(signature, messageHash, senderAddress);

	console.log("verified --------- ", isValid);

	setInitialBalance(senderAddress);
	setInitialBalance(recipientAddress);

	if (!isValid && balances[senderAddress] < amount) {
		res.status(400).send({ message: "Not enough funds!" });
	} else {
		balances[senderAddress] -= amount;
		balances[recipientAddress] += amount;
		console.log("balance of recipient -------", balances[recipientAddress]);
		return res.send({ balance: balances[senderAddress] });
	}
});

app.listen(port, () => {
	console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
	if (!balances[address]) {
		balances[address] = 0;
	}
}
