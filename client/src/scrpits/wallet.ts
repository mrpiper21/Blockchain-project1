import {ethers} from 'ethers';

const {Wallet} = ethers

//creating wallet with private key
export const wallet1 = new Wallet("0x529a376d5fb190d705552975ab6dee0c404fa3ea9e90ac6174545ae1060556ae")

//creating wallet with secrete phrase
export const wallet2 = Wallet.fromPhrase("java kotlin python")