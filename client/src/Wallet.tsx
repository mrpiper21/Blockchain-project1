import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import useEthStore from "./store/eth-store";
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

	const initiateWallet = () => {
		generateNewWallet();
		fetchBalance();
	};

	// useEffect(() => {

	// 	fetchBalance();
	// }, []);

	return (
		<div className="container wallet">
			<h1>Your Wallet</h1>

			<label>
				Private Key
				<div className="privateInputContainer">
					<input
						className="textInput"
						placeholder="Type in your private key"
						value={privateKey || ""}
						onChange={onChange}
					/>
					<div></div>
				</div>
			</label>

			<div>Address: {address}</div>

			<div className="balance">Balance: {balance ?? 0}</div>
			<button onClick={initiateWallet} className="generateBtn">
				<span>Generate wallet</span>
			</button>
		</div>
	);
}

export default Wallet;
