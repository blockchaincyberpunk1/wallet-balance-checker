// Importing React and the useState hook from the 'react' package
import React, { useState } from 'react';

// Importing the Web3 library to interact with Ethereum blockchain
import Web3 from 'web3';

// Defining a constant object to store the URLs of different blockchain networks
const blockchainUrls = {
  Ethereum: 'https://sepolia.infura.io/v3/',
  Linea: 'https://linea-goerli.infura.io/v3/',
  Polygon: 'https://polygon-mumbai.infura.io/v3/',
  Optimism: 'https://optimism-goerli.infura.io/v3/',
  Arbitrum: 'https://arbitrum-goerli.infura.io/v3/',
  Palm: 'https://palm-testnet.infura.io/v3/',
  AvalancheCChain: 'https://avalanche-fuji.infura.io/v3/',
  NEAR: 'https://near-testnet.infura.io/v3/',
  Aurora: 'https://aurora-testnet.infura.io/v3/',
  Starknet: 'https://starknet-goerli.infura.io/v3/',
  Celo: 'https://celo-alfajores.infura.io/v3/',
};

// Defining the main functional component for the Wallet Balance Checker
const BalanceChecker = () => {
  // Using the useState hook to create state variables and their setter functions
  const [address, setAddress] = useState(''); // To store the user's wallet address
  const [balance, setBalance] = useState(null); // To store the wallet's balance
  const [blockchain, setBlockchain] = useState('Ethereum'); // To store the selected blockchain network

  // Defining an asynchronous function to check the wallet's balance
  const checkBalance = async () => {
    try {
      // Constructing the URL to connect to the selected blockchain network using Infura
      const url = `${blockchainUrls[blockchain]}${process.env.REACT_APP_INFURA_API_KEY}`;
      
      // Creating a new Web3 instance and connecting to the selected blockchain network
      const web3 = new Web3(new Web3.providers.HttpProvider(url));
      
      // Fetching the wallet's balance in Wei (smallest unit of Ether)
      const weiBalance = await web3.eth.getBalance(address);
      
      // Converting the balance from Wei to Ether
      const ethBalance = web3.utils.fromWei(weiBalance, 'ether');
      
      // Updating the state variable to store the wallet's balance in Ether
      setBalance(ethBalance);
    } catch (error) {
      // Logging any errors that occur during the balance check
      console.error("Error fetching balance: ", error);
      
      // Updating the state variable to indicate an error has occurred
      setBalance("Error fetching balance");
    }
  };

  // Rendering the Wallet Balance Checker component
  return (
    <div className="container mt-5">
      <h1>Wallet Balance Checker</h1>
      <div className="form-group">
        <label htmlFor="blockchain">Select Blockchain</label>
        <select
          className="form-control"
          id="blockchain"
          value={blockchain}
          onChange={(e) => setBlockchain(e.target.value)}
        >
          {Object.keys(blockchainUrls).map((bc) => (
            <option key={bc} value={bc}>
              {bc}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          className="form-control"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={checkBalance}>
        Check Balance
      </button>
      {balance !== null && (
        <div className="mt-3">
          <h3>Balance: {balance} ETH</h3>
        </div>
      )}
    </div>
  );
};

// Exporting the BalanceChecker component to be used in other parts of the application
export default BalanceChecker;
