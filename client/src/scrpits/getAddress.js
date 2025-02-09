import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

export const getAddress = (publicKey) => {
	const pubKeyBytes = utf8ToBytes(publicKey);
	const pubKeyWithoutFormat = pubKeyBytes.slice(1);
	const hash = keccak256(pubKeyWithoutFormat);
	return toHex(hash.slice(-20));
};
