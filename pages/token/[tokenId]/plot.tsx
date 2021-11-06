import { useWalletContext } from "@/components/common/WalletProvider";
import { ownerOf } from "@/lib/coreContract";
import { connectWallet } from "@/lib/interact";
import styles from "@/styles/Plot.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Plot(props: { owner: string }) {
  const router = useRouter();
  const { tokenId } = router.query;
  const walletAddress = useWalletContext();
  const [showState, setShowState] = useState(false);

  useEffect(() => {
    if (walletAddress.toLowerCase() === props.owner.toLowerCase()) {
      setShowState(true);
    } else {
      setShowState(false);
    }
  }, [walletAddress, props.owner]);

  const reconnect = async () => {
    if (walletAddress.length != 0) {
      alert("please disconnect first");
    } else {
      await connectWallet();
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div
        className={styles.overlay}
        style={{
          display: showState ? "none" : "block",
        }}
      >
        <div onClick={reconnect}>
          click here to reconnect as {props.owner.toLowerCase().substring(0, 8)}
        </div>
      </div>
      <div style={{ width: "100%", height: "100%" }}>
        <iframe
          src={`/api/tokens/${tokenId}/plot`}
          style={{
            height: "100%",
            width: "100%",
            border: 0,
            pointerEvents: showState ? "auto" : "none",
          }}
        />
      </div>
    </div>
  );
}

export const getServerSideProps: (context: any) => Promise<{ props: any }> =
  async (context) => {
    const tokenId = context.params?.tokenId;
    return {
      props: {
        owner: await ownerOf(tokenId),
      },
    };
  };