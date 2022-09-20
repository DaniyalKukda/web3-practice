import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constant.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const getBalanceButton = document.getElementById("getBalance");
const withdrawButton = document.getElementById("withdraw");

connectButton.onclick = connectMetaMask;
fundButton.onclick = fund;
getBalanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;

async function connectMetaMask() {
  try {
    if (typeof window.ethereum !== "undefined") {
      console.log("Metamask Detected");
      await window.ethereum.request({ method: "eth_requestAccounts" });
      connectButton.innerHTML = "Connected!";
    } else {
      connectButton.innerHTML = "Please install metamask!";
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

async function getBalance() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    console.log("balance: ", ethers.utils.formatEther(balance));
  }
}

async function withdraw() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const transactionResponse = await contract.withdraw();
    await listenForTransactionMine(transactionResponse, provider);
  }
}

async function fund() {
  const ethAmount = document.getElementById("ethAmount").value;
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      console.log("transactionResponse: ", transactionResponse);
      await listenForTransactionMine(transactionResponse, provider);
      console.log("Done...");
    } catch (error) {
      console.log("error: ", error);
    }
  }
}

function listenForTransactionMine(transactionResponse, provider) {
  console.log("transactionResponse mine: ", transactionResponse.hash);

  return new Promise((resolve) => {
    provider.once(transactionResponse.hash, (transactionRecipt) => {
      console.log(
        `transaction recipt with ${transactionRecipt.confirmations} confirmations`
      );
      resolve();
    });
  });
}
