import * as secp from "ethereum-cryptography/secp256k1";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";

export const generateWallet = () => {
	const privateKey = secp.secp256k1.utils.randomPrivateKey();

	return toHex(privateKey);
};

export const getAddress = (publicKey: string) => {
	const pubKeyBytes = utf8ToBytes(publicKey);
	const pubKeyWithoutFormat = pubKeyBytes.slice(1);
	const hash = keccak256(pubKeyWithoutFormat);
	return toHex(hash.slice(-20));
};

export const getPublicKey = (privateKey: string) => {
	const address = secp.secp256k1.getPublicKey(privateKey);

	return toHex(address);
};

export const hashMessage = (msg: string) => {
	const bytes = utf8ToBytes(msg);
	const hash = keccak256(bytes);

	return toHex(hash);
};

export const signMessage = (msg: string, privateKey: string) => {
	const messageHash = hashMessage(msg);
	const signature = secp256k1.sign(messageHash, privateKey);
	return signature;
};

export const recoverKy = (
	msg: string,
	signature: string,
	recoveryBit: string
) => {
	// return secp.secp256k1.utils.(
	// 	messageHash,
	// 	signature,
	// 	recoveryBit,
	// 	(isCompressed = false)
	// );
};
