# eRupee: An Implementation of Central Bank Digital Currency

eRupee is a blockchain-based web platform for making transactions. This web platform is a full-stack web application built using Next.js, a modern full-stack framework. To handle transactions, deployment of smart contracts and execution a go language based ethereum framework Geth is used. For styling the webapp, Tailwind CSS is used and MongoDB Atlas is used for storing data.

This web application demonstrates the concept of Central Bank Digital Currency (CBDC), which is India’s future plans to completely digitalize their currency and transactions, leading to faster and effortless payments. As it’s based on blockchain, all the transactions happening are recorded and tamper-proof.

Transactions are made using eRupee, which is an ERR20 token. ERC-20 is the technical standard for fungible tokens created using the Ethereum blockchain. A fungible token is interchangeable with another token.

## Requirements
* Geth (Go-Ethereum) client (https://geth.ethereum.org/)
* Solidity compiler (https://remix.ethereum.org/)
* Node.js and npm (https://nodejs.org/en)
## Run Locally

Clone the project

```bash
  git clone https://github.com/abhishekpatil4/cbdc-webapp
```

Go to the project directory

```bash
  cd cbdc-webapp
```
Install dependencies

```bash
  npm install 
```

Start geth

```bash
  cd geth
  ./run.sh
```
Run NextJs Project

```bash
  npm run dev
```
