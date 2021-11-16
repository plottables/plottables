import { useWalletContext } from "@/components/common/WalletProvider";
import { connectWallet } from "@/lib/interact";
import Link from "next/link";
import React from "react";

const Header: React.FC = ({ children }) => {
  const walletAddress = useWalletContext();
  const connectWalletPressed = async () => {
    await connectWallet();
  };
  return (
    <div className="header">
      <Link href={"/"}>
        <a>Plottables</a>
      </Link>
      <Link href={"/gallery"}>
        <a>Gallery</a>
      </Link>
      <Link href={"/acknowledgments"}>
        <a>Acknowledgments</a>
      </Link>
      <div id="connectButton" onClick={connectWalletPressed}>
        <span>
          {walletAddress.length > 0 ? (
            <Link href={"/user/" + walletAddress}>
              <a>{String(walletAddress).substring(0, 8)}</a>
            </Link>
          ) : (
            "Connect"
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
