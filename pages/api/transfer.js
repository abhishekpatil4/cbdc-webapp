const AccountModel = require('../../mongodb/index.js')

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

    const from_ = req.body.from;
    const to = req.body.to;
    const amt = req.body.amount;
    try {
        console.log(from_ + ' ' + to + ' ' + amt);
        contract.methods
            .transfer(to, amt)
            .send({ from: from_ })
            .then(console.log);
        res.status(200).send("Transfer successful");
        try {
            const account = await AccountModel.findOne({ accountAddress: from_ });
            if (!account) {
                console.error('Account not found');
                return null;
            }
            const newTransaction = {
                senderAddress: from_,
                receiverAddress: to,
                amount: amt,
                date: new Date(),
            }
            account.transactions.push(newTransaction);
            // Save the updated document to the database
            account.save().then(() => {
                console.log('Transaction added to account');
            }).catch((error) => {
                console.error('Error saving account:', error.message);
            });

        } catch (error) {
            console.error('Error finding account: ', error.message);
            return null;
        }
        try {
            const account2 = await AccountModel.findOne({ accountAddress: to });
            if (!account2) {
                console.error('Account not found');
                return null;
            }
            const newTransaction = {
                senderAddress: from_,
                receiverAddress: to,
                amount: amt,
                date: new Date(),
            }
            account2.transactions.push(newTransaction);
            // Save the updated document to the database
            account2.save().then(() => {
                console.log('Transaction added to account 2');
            }).catch((error) => {
                console.error('Error saving account 2:', error.message);
            });

        } catch (error) {
            console.error('Error finding account 2: ', error.message);
            return null;
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error while transfering");
    }
}