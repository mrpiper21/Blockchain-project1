import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useEffect, useState } from "react";
import useEthStore from "./store/eth-store";
import { generateWallet } from "./scrpits/generateWallet";

function App() {
	const [balance, setBalance] = useState(0);
	const [address, setAddress] = useState("");
	// const [privateKey, setPrivateKey] = useState("");
	const { setPrivateKey, isConnected, privateKey } = useEthStore(
		(state) => state
	);

	useEffect(() => {
		setPrivateKey(generateWallet());
		isConnected && alert("wallet is connected");
	}, []);

	console.log("privatekey ----", privateKey);

	return (
		<div className="app">
			<Wallet
				balance={balance}
				setBalance={setBalance}
				privateKey={privateKey}
				setPrivateKey={setPrivateKey}
				address={address}
				setAddress={setAddress}
			/>
			<Transfer
				setBalance={setBalance}
				address={address}
				privateKey={privateKey}
			/>
		</div>
	);
}

export default App;
