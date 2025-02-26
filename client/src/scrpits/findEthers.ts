// The findEther function is passed 
// an address which has sent ether to several 
// addresses. The goal of this function is to find every address that has 
// received ether and return it in an array of addresses.

async function findEther(address: string) {
    const addresses: string[] = [];
    const blockNumber = await provider.getBlockNumber();
    for (let i = 0; i <= blockNumber; i++) {
        const block = await provider.getBlockWithTransactions(i);
        block.transactions.forEach((tx) => {
            if(tx.from === address) {
                addresses.push(tx.to);
            }
        });
    }
    return addresses;
}