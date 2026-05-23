"use client";

import { useState } from "react";
import { BrowserProvider, Contract } from "ethers";

const CONTRACT_ADDRESS = "0x58ECf663D54fb84F75fCEEfc7e9673fCeE9501d2";
const ABI = [
  "function logSession() public",
  "function userFocusMinutes(address) public view returns (uint256)"
];

export default function WalletConnect({ showLogButton }: { showLogButton: boolean }) {
  const [account, setAccount] = useState<string | null>(null);
  const [isLogging, setIsLogging] = useState(false);
  const [logSuccess, setLogSuccess] = useState(false);

  const connectWallet = async () => {
    const win = window as any;
    if (typeof win.ethereum !== "undefined") {
      try {
        const accounts = await win.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (err) {
        console.error("Failed to connect wallet", err);
      }
    } else {
      alert("Please install MetaMask or another Web3 wallet.");
    }
  };

  const logSession = async () => {
    if (!account) {
      await connectWallet();
      const win = window as any;
      if (!win.ethereum) return;
    }

    const win = window as any;
    if (typeof win.ethereum !== "undefined") {
      setIsLogging(true);
      setLogSuccess(false);
      try {
        const provider = new BrowserProvider(win.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(CONTRACT_ADDRESS, ABI, signer);

        const tx = await contract.logSession();
        await tx.wait();
        
        setLogSuccess(true);
        setTimeout(() => setLogSuccess(false), 5000);
      } catch (err) {
        console.error("Transaction failed", err);
        alert("Transaction failed! Make sure you are on Monad Testnet and contract address is updated.");
      } finally {
        setIsLogging(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center mt-12 space-y-4">
      {showLogButton ? (
        <button
          onClick={logSession}
          disabled={isLogging}
          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-full font-bold tracking-wide shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:shadow-[0_0_30px_rgba(20,184,166,0.6)] transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLogging ? "Logging to Monad..." : "Log Focus to Monad (25m)"}
        </button>
      ) : (
        <div className="h-14"></div>
      )}

      {logSuccess && (
        <p className="text-emerald-300 text-sm font-medium animate-pulse">
          Session logged successfully on Monad!
        </p>
      )}

      {!account ? (
        <button
          onClick={connectWallet}
          className="text-xs text-gray-400 hover:text-white transition-colors underline underline-offset-4 mt-4"
        >
          Connect Wallet
        </button>
      ) : (
        <p className="text-xs text-teal-200 mt-4">
          Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </p>
      )}
    </div>
  );
}
