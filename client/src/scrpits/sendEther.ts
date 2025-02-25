// import * as ethers from 'ethers';
import { Wallet } from 'ethers'

const { ganacheProvider} = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

const wallet = new Wallet("0xf52563c1e3cf089a13a3aa77b7b42f15b8bc0005", provider);

async function sendEther({value, to}: {value: number, to: string}) {
    // sign the transaction using our wallet's private key
    // const rawTx = await wallet.signTransaction({ value, to, gasLimit: 0x5208, gasPrice: 0x3b9aca00 });

    // broadcast the transaction to the ethereum network
    return provider.sendTransaction({value, to});
}

module.exports = sendEther;
// const {Wallet, p} = ethers