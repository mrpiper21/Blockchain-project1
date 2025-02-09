const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

// Function to recover the public key from signature
function recoverPublicKey(messageHash, signature, recoveryBit) {
	// 1. Hash the original message

	// 2. Recover the public key using the signature
	const publicKey = secp256k1.recoverPublicKey(
		messageHash,
		signature,
		recoveryBit
	);

	// 3. Convert to Ethereum address format
	const publicKeyBytes = publicKey.slice(1); // Remove the first byte (format byte)
	const address = keccak256(publicKeyBytes).slice(-20); // Take last 20 bytes

	return {
		publicKey: toHex(publicKey),
		address: `0x${toHex(address)}`,
	};
}

module.exports = recoverPublicKey;
