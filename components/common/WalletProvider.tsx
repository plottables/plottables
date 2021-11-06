import { getCurrentWalletConnected } from "@/lib/interact";
import React, { createContext, useContext, useEffect, useState } from "react";

declare const window: any;
const WalletContext = createContext("");

export const WalletProvider: React.FC = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const init = async () => {
      const { address } = await getCurrentWalletConnected();
      setWalletAddress(address);
    };
    init().then(addWalletListener);
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string | any[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress("");
        }
      });
    }
  }

  return (
    <WalletContext.Provider value={walletAddress}>
      {children}
    </WalletContext.Provider>
  );
};

export function useWalletContext() {
  return useContext(WalletContext);
}
