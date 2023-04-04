export default async function handler(req, res) {
    const Web3 = require('web3');
    const fs = require('fs');
    const path = require('path');

    // Set up Web3 provider
    const web3 = new Web3('http://localhost:8545');

    // Load smart contract ABI and address
    const contractAbi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../../geth/abi.json')));
    const contractAddress = '0xC635C862f9d2499ac6FD34211A430670f8Cd3c4e'; // Replace with your contract address

    // Instantiate smart contract object
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    let from_ = '0x717c913b027e831f82b8623be4550e2e92fb96b4';
    let to = '0xaf28babb597903f16a4ede2a08fc9393f451034b';
    let amt = 100;
    try {
        console.log(from_ + ' ' + to + ' ' + amt);
        contract.methods
            .transfer(to, amt)
            .send({ from: from_ })
            .then(console.log);
            res.status(200).send("Transfer successful");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error while transfering");
    }
}