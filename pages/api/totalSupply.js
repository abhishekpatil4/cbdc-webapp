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
    contract.methods.totalSupply().call((err, result) => {
        if (err) {
            console.error('Error calling totalSupply():', err);
          } else {
            console.log('Total supply:', result);
            result = result/(10**18);
            var data = result.toFixed(1);
            res.status(200).send({totalSupply : data});
          }
    })
}



