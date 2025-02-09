import { useState, ChangeEvent, FormEvent } from "react";
import server from "./server";
import useEthStore from "./store/eth-store";
import axios from "axios";

interface TransferProps {
	address: string;
	setBalance: (balance: number) => void;
}

interface TransferResponse {
	balance: number;
}

function Transfer({ address, setBalance }: TransferProps) {
	const [sendAmount, setSendAmount] = useState<string>("");
	const [recipient, setRecipient] = useState<string>("");
	const { signTransaction } = useEthStore();

	const handleInputChange =
		(setter: (value: string) => void) =>
		(event: ChangeEvent<HTMLInputElement>) =>
			setter(event.target.value);

	async function handleTransfer() {
		// event.preventDefault();

		if (!sendAmount || !recipient) {
			alert("Please fill in all fields");
			return;
		}

		try {
			const { signature, messageHash } = signTransaction(parseInt(sendAmount));

			const {
				data: { balance },
			} = await axios.post(`http://localhost:3042/send`, {
				sender: address,
				amount: parseInt(sendAmount),
				recipient,
				signature,
				messageHash,
			});

			setBalance(balance);

			// Clear form after successful transfer
			setSendAmount("");
			setRecipient("");
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			} else if (typeof error === "object" && error && "response" in error) {
				const axiosError = error as { response: { data: { message: string } } };
				alert(axiosError.response.data.message);
			} else {
				alert("An unknown error occurred");
			}
		}
	}

	// Validate amount is a positive number
	const isValidAmount = (amount: string): boolean => {
		const num = parseInt(amount);
		return !isNaN(num) && num > 0;
	};

	// Validate recipient address format
	const isValidRecipient = (addr: string): boolean => {
		return addr.length > 0; // Add more validation as needed
	};

	return (
		<form className="container transfer" onSubmit={handleTransfer}>
			<h1>Send Transaction</h1>

			<label>
				Send Amount
				<input
					type="number"
					min="1"
					step="1"
					placeholder="1, 2, 3..."
					value={sendAmount}
					onChange={handleInputChange(setSendAmount)}
					required
				/>
			</label>

			<label>
				Recipient
				<input
					type="text"
					placeholder="Type an address, for example: 0x2"
					value={recipient}
					onChange={handleInputChange(setRecipient)}
					required
					pattern="^0x[0-9a-fA-F]+$"
					title="Please enter a valid Ethereum address starting with 0x"
				/>
			</label>

			<button
				onClick={handleTransfer}
				type="submit"
				className="button"
				disabled={!isValidAmount(sendAmount) || !isValidRecipient(recipient)}
			>
				Transfer
			</button>
		</form>
	);
}

export default Transfer;
