import { secp256k1 } from "ethereum-cryptography/secp256k1";

export const verify = (signature, msgHash, pubKey) => {
    const isValid = secp256k1.verify(signature, msgHash, pubKey);

    return isValid
}
