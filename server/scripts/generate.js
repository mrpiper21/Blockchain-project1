const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.secp256k1.utils.randomPrivateKey();

console.log("private Key: ", toHex(privateKey));

const publicKey = secp.secp256k1.getPublicKey(privateKey);
const pubWithoutFormat = publicKey.slice(1);

const hash = keccak256(pubWithoutFormat);

const address = hash.slice(-20);
// SHA.sha256()

console.log("public key: ", toHex(address));
