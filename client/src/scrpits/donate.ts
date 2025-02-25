import {ethers, parseEther,} from 'ethers'

const {Wallet} = ethers

const provider = new providers.web3Provider("ganacheProvider")

async function donate(privateKey: string, charities: string[]){
    const oneEther = parseEther("1.0");
        const wallet = new Wallet(privateKey, provider);
        for(let i = 0; i < charities.length; i++) {
            const charity = charities[i];
            await wallet.sendTransaction({
                value: oneEther,
                to: charity
            })
        }
    

}