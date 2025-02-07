import { utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

export const hashMessage = (msg) => {
	const bytes = utf8ToBytes(msg);
	const hash = keccak256(bytes);

	return hash;
};
