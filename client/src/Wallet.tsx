import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import useEthStore from "./store/eth-store";

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

	const { setBalance, balance, setPrivateKey, privateKey } = useEthStore();

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

			<div className="balance">Balance: {balance}</div>
		</div>
	);
}

export default Wallet;
