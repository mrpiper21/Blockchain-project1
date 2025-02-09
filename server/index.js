const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
	"02bf78871e24d8588235731d50fecc88a2f7639de2ee5a994bf4972f1c03f32ad7": 100,
	"03515971dacf1d0b3c513c70bf7d007bc494789716a9d4a78edc59db04cbe85a77": 50,
	"03d49dc812131de8acb6e958a552d2d97a70fe96d0627b8f759d226e3443ca43ba": 75,
};

app.get("/balance/:address", (req, res) => {
	const { address } = req.params;
	const balance = balances[address] || 0;
	res.send({ balance });
});

app.post("/send", (req, res) => {
	//TODO: GET SIGNATURE FROM CLIENT APP
	// RECOVER THE PUBLIC ADDRESS FROM THE SIGNATURE
	const { sender, recipient, amount, signature } = req.body;

	setInitialBalance(sender);
	setInitialBalance(recipient);

	if (balances[sender] < amount) {
		res.status(400).send({ message: "Not enough funds!" });
	} else {
		balances[sender] -= amount;
		balances[recipient] += amount;
		res.send({ balance: balances[sender] });
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
