import { useWalletContext } from "@/components/common/WalletProvider";
import { getSVG } from "../../api/generator/[tokenId]/svg";

export default function Plot(props: { svg: any }) {
  const walletAddress = useWalletContext();
  return <div>{props.svg}</div>;
}

export async function getServerSideProps(context: {
  params: { tokenId: string };
}) {
  const tokenId = context.params.tokenId;
  return {
    props: {
      svg: await getSVG(tokenId),
    },
  };
}
