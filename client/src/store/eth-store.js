import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useEthStore = create(
	persist(
		(set) => ({
			privateKey: null,
			isConnected: false,

			// Set private key with encryption
			setPrivateKey: (key) =>
				set({
					privateKey: key,
					isConnected: !!key,
				}),

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
