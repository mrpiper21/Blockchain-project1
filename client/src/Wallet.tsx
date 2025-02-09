import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import useEthStore from "./store/eth-store";
import { useEffect } from "react";
import axios from "axios";

interface Props {
	address: string;
	setAddress: (_address: string) => void;
	setBalance: (_balance: number) => void;
}

function Wallet({ address, setAddress }: Props) {
	async function onChange(evt: any) {
		const _privateKey = evt.target.value;
		setPrivateKey(_privateKey);
		const _address = toHex(secp.secp256k1.getPublicKey(_privateKey));
		setAddress(_address);
		if (address) {
			const {
				data: { balance },
			} = await server.get(`/balance/${address}`);
			setBalance(balance);
		} else {
			setBalance(0);
		}
	}

	const { setBalance, balance, setPrivateKey, privateKey, generateNewWallet } =
		useEthStore();

	useEffect(() => {
		const fetchBalance = async () => {
			const { address } = generateNewWallet();
			const {
				data: { balance },
			} = await axios.post(`http://localhost:3042/init-wallet`, {
				address,
			});
			console.log("balance -------", balance);
			setBalance(balance);
		};
		fetchBalance();
	}, []);

	return (
		<div className="container wallet">
			<h1>Your Wallet</h1>

			<label>
				Private Key
				<input
					placeholder="Type in your private key"
					value={privateKey || ""}
					onChange={onChange}
				></input>
			</label>

			<div>Address: {address}</div>

			<div className="balance">Balance: {balance || 0}</div>
		</div>
	);
}

export default Wallet;
