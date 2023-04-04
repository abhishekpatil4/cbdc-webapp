const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up Web3 provider
const web3 = new Web3('http://localhost:8545');

// Load smart contract ABI and address
const contractAbi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../geth/abi.json')));
const contractAddress = '0xC635C862f9d2499ac6FD34211A430670f8Cd3c4e'; // Replace with your contract address

// Instantiate smart contract object
const contract = new web3.eth.Contract(contractAbi, contractAddress);

//minting Rs 2000
export async function mintTokens() {
  return contract.methods
    .mint2000()
    .send({ from: '0x717c913b027e831f82b8623be4550e2e92fb96b4' })
    .then(console.log);
}

//function to check token balance
export async function checkBalance(account) {
  try {
    let balance = await contract.methods.balanceOf(account).call();
    console.log(`Account balance of ${account}: ${balance}`);
    return balance;
  } catch (error) {
    console.error(error);
  }
}

// export default async function handler(req, res) {
//     try {
//         let account = '0x717c913b027e831f82b8623be4550e2e92fb96b4';
//         let balance = await contract.methods.balanceOf(account).call();
//         console.log(`Account balance of ${account}: ${balance}`);
//         res.status(200).json({ balance: balance });
//       } catch (error) {
//         console.error(error);
//       }
// }

//function to transfer tokens
// export async function transfer(from_, to, amt) {
//   try {
//     console.log(from_ + ' ' + to + ' ' + amt);
//     contract.methods
//       .transfer(to, amt)
//       .send({ from: from_ })
//       .then(console.log);
//   } catch (error) {
//     console.error(error);
//   }
// }

//new transfer function
export async function transfer(req, res) {
    try {
      const { from, to, amt } = req.body;
      console.log(from + ' ' + to + ' ' + amt);
      contract.methods
        .transfer(to, amt)
        .send({ from })
        .then(console.log);
      res.status(200).json({ message: 'Token transfer initiated' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error initiating token transfer' });
    }
  }
  
// export default function handler(req, res) {
//   // Call your web3 functions here
//   transfer('0x123', '0x456', '100')
//     .then(() => {
//       res.status(200).json({ message: 'Token transfer successful' });
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ message: 'Error transferring tokens' });
//     });
// }
