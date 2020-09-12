import React,{useContext} from 'react';
import HDWalletProvider  from "@truffle/hdwallet-provider"
import Web3 from "web3"

// const mnemonic="hurry trial cable release athlete cruel cruise frog innocent hobby equal cluster"
// let provider = new HDWalletProvider(mnemonic,`https://rpc-mumbai.matic.today/`);
import AsyncStorage from '@react-native-community/async-storage';
// export const web3 = new Web3(provider)
const contractAddress="0x8b8f78bfFDc26c78a502b8b05A41ce1D2f02F46b"

const contractAbi=`[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addTrack",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "trackName",
				"type": "string"
			}
		],
		"name": "buyAdvertisement",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "redeemAdvertise",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "getTrack",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]`

export default async()=>{
    const mnemonic=await AsyncStorage.getItem('mnemonic')
    let provider = new HDWalletProvider(mnemonic,`https://rpc-mumbai.matic.today/`);
    const web3 = new Web3(provider)
    const myContractInstance = new web3.eth.Contract(JSON.parse(contractAbi), contractAddress)
    return {
        web3,
        myContractInstance
    }
}
// export const myContractInstance = new web3.eth.Contract(JSON.parse(contractAbi), contractAddress)
