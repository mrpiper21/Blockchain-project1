import { create } from "zustand";
// import * as secp from "@noble/secp256k1";
import { secp256k1 } from "ethereum-cryptography/secp256k1";

import { persist, createJSONStorage } from "zustand/middleware";
// import { hashMessage } from "ethers";
import {
	generateWallet,
	getAddress,
	getPublicKey,
	hashMessage,
} from "../scrpits/cryptography";

interface EthStoreState {
	privateKey: string | null;
	isConnected: boolean;
	publicKey: string | null;
	address: string | null;
	balance: string | number | null;
	setPrivateKey: (key: string | null) => void;
	generateNewWallet: () => { address: string };
	clearPrivateKey: () => void;
	setBalance: (_balance: string | number) => void;
	signTransaction: (amount: number) => {
		messageHash: string;
		publicKey: string;
		signature: string;
		message: string;
	};
}

// Now we need to type the store correctly by including the `persist` middleware type.
const useEthStore = create<EthStoreState>()(
	persist(
		(set, get) => ({
			privateKey: null,
			isConnected: false,
			publicKey: null,
			address: null,
			balance: null,

			// Set private key with encryption
			setPrivateKey: (key: string | null) =>
				set({
					privateKey: key,
					isConnected: !!key,
				}),

			// Generate a new wallet with a private key, public key, and address
			generateNewWallet: () => {
				const privateKey = generateWallet();
				const publicKey = getPublicKey(privateKey);
				const address = getAddress(publicKey);

				set({
					privateKey,
					publicKey,
					address,
					isConnected: true,
				});

				return { address };
			},

			// Update the balance in the store
			setBalance: (balance: string | number) => {
				set({ balance });
			},

			// Sign the transaction with the private key
			signTransaction: (amount: number) => {
				const { privateKey, publicKey, address } = get();
				if (!privateKey || !publicKey || !address) {
					throw new Error("Wallet is not connected.");
				}

				const message = `Send ${amount} to ${address}`;
				const messageHash = hashMessage(message); // Hash the message

				// Sign the message hash with the private key
				const signature = secp256k1.sign(messageHash, privateKey);
				// const signatu = secp256k1.sign(messageHash, privateKey);
				// const signature = signatu.toCompactHex();
				const mysignature = signature.toCompactHex();
				// secp

				return {
					messageHash,
					publicKey,
					signature: mysignature,
					message,
				};
			},

			// Clear private key and reset connection state
			clearPrivateKey: () =>
				set({
					privateKey: null,
					isConnected: false,
				}),
		}),
		{
			name: "eth-storage", // unique name for localStorage
			storage: createJSONStorage(() => sessionStorage), // Use sessionStorage for better security
			partialize: (state) => ({
				privateKey: state.privateKey,
				isConnected: state.isConnected,
			}),
		}
	)
);

export default useEthStore;
