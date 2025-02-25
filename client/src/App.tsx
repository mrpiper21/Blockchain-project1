import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import useEthStore from "./store/eth-store";

function App() {
	const [balance, setBalance] = useState(0);
	// const [privateKey, setPrivateKey] = useState("");
	const { setPrivateKey, address } = useEthStore();

	return (
		<div className="app">
			<Wallet
				address={address || ""}
				setBalance={setBalance}
				setAddress={setPrivateKey}
			/>
			<Transfer
				setBalance={setBalance}
				// privateKey={privateKey || ''}
			/>
		</div>
	);
}

export default App;
