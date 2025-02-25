import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex } from "ethereum-cryptography/utils";

const privateKey = secp.secp256k1.utils.randomPrivateKey();

console.log("private Key: ", toHex(privateKey));

const publicKey = secp.secp256k1.getPublicKey(privateKey);
const pubWithoutFormat = publicKey.slice(1);

const hash = keccak256(pubWithoutFormat);

const address = hash.slice(-20);
// SHA.sha256()

console.log("public key: ", toHex(address));
