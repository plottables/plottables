import { useWalletContext } from "@/components/common/WalletProvider";
import Container from "@/components/Container";
import { ownerOf } from "@/lib/coreContract";
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
    }
  }, [walletAddress, props.owner]);

  if (showState) {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <div style={{ width: "100%", height: "100%" }}>
          {
            <iframe
              src={`/api/tokens/${tokenId}/plot`}
              style={{
                height: "100%",
                width: "100%",
                border: 0,
              }}
            />
          }
        </div>
      </div>
    );
  } else {
    return <Container>please connect as {props.owner} to plot</Container>;
  }
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
