import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

export const getPublicKey = (privateKey) => {
	const address = secp.secp256k1.getPublicKey(privateKey);

	return toHex(address);
};
