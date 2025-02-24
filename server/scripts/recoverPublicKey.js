// recoverPublicKey.js
import * as secp from "@noble/secp256k1";

function recoverPublicKey(messageHash, privateKey) {
	try {
		const pub2 = messageHash;

		const signature = secp.signAsync(msgHash);

		// Verify and recover the public key
		// const publicKey = secp256k1.verify(sigBytes, msgHashBytes);

		return pub2;
	} catch (error) {
		throw new Error(`Failed to recover public key: ${error.message}`);
	}
}

module.exports = recoverPublicKey;
