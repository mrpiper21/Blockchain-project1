import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useEffect, useState } from "react";
import useEthStore from "./store/eth-store";

function App() {
	const [balance, setBalance] = useState(0);
	// const [privateKey, setPrivateKey] = useState("");
	const { setPrivateKey, isConnected, privateKey, generateNewWallet, address } =
		useEthStore();

	useEffect(() => {
		generateNewWallet();
	}, []);

	console.log("wallet address ----", address);

	return (
		<div className="app">
			<Wallet
				address={address || ""}
				setBalance={setBalance}
				setAddress={setPrivateKey}
			/>
			<Transfer
				setBalance={setBalance}
				address={address || ""}
				// privateKey={privateKey || ''}
			/>
		</div>
	);
}

export default App;
