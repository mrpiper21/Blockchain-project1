import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

export const generateWallet = () => {
	const privateKey = secp.secp256k1.utils.randomPrivateKey();

	return toHex(privateKey);
};
