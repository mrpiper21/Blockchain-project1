import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { generateWallet } from "../scrpits/generateWallet";
import { getPublicKey } from "../scrpits/getPublicKey";
import { getAddress } from "../scrpits/getAddress";

// Define the types for the store's state
interface EthStoreState {
	privateKey: string | null;
	isConnected: boolean;
	publicKey: string | null;
	address: string | null;
	setPrivateKey: (key: string | null) => void;
	generateNewWallet: () => { address: string };
	clearPrivateKey: () => void;
	balance: string | number | null;
	setBalance: (_balance: string | number) => void;
}

// Now we need to type the store correctly by including the `persist` middleware type.
const useEthStore = create<EthStoreState>()(
	persist(
		(set) => ({
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
			setBalance: (balance: string | number) => {
				set({ balance });
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
