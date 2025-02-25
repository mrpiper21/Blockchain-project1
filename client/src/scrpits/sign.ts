import {ethers} from 'ethers';
const {parseEther} = ethers;
import { wallet1 } from './wallet';

export const signaturePromise = wallet1.signTransaction({
    value: parseEther("1.0"),
    to: "0xf52563c1e3cf089a13a3aa77b7b42f15b8bc0005",
    gasLimit: 0x5208,
})