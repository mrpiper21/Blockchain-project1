import { hashMessage } from "./hashMessage";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";

export const signPrivatekey = (msg, privateKey = "") => {
	const messageHash = hashMessage(msg);
	const signature = secp256k1.sign(messageHash, privateKey);
	return signature;
};
