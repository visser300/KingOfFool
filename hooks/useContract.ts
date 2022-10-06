import type { Web3Provider } from "@ethersproject/providers";
import { Contract } from '@ethersproject/contracts'
import { toBn } from "evm-bn"

const CHAIN_MAPPERS = {
  // mainnet
  1: {
    contractAddress: '',
    contractAbi: ''
  },
  // goerli
  5: {
    contractAddress: '0x9e852B6B475C3263F2b7879a68b6849d779e0cA8',
    contractAbi: [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "ReceivedETH",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "ReceivedUSDC",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "depositEth",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "depositUSDC",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
  }
}

export async function depositEther(library: Web3Provider, chainId: number, account: string, amount: string, callback: Function) {
  const blockNumber = await library.getBlockNumber()
  const contract: Contract = new Contract(
    CHAIN_MAPPERS[chainId].contractAddress,
    CHAIN_MAPPERS[chainId].contractAbi,
    library.getSigner()
  )

  await contract.functions['depositEth'].call(
    this,
    {value: toBn(amount)}
  )

  contract.on(
    'ReceivedETH',
    async (sender, amount, event) => {
      if (
        event.blockNumber > blockNumber && // only accept the most recent transaction
        sender.toLowerCase() == account.toLowerCase()
      ) {
        callback()
      }
    }
  )
}

export async function depositUsdc(library: Web3Provider, chainId: number, account: string, amount: string, callback: Function) {
  const blockNumber = await library.getBlockNumber()
  const contract: Contract = new Contract(
    CHAIN_MAPPERS[chainId].contractAddress,
    CHAIN_MAPPERS[chainId].contractAbi,
    library.getSigner()
  )

  await contract.functions['depositUSDC'].call(
    this,
    toBn(amount, 6)
  )

  contract.on(
    'ReceivedUSDC',
    async (sender, amount, event) => {
      if (
        event.blockNumber > blockNumber && // only accept the most recent transaction
        sender.toLowerCase() == account.toLowerCase()
      ) {
        callback()
      }
    }
  )
}
