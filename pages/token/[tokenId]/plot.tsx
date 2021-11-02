import {useWalletContext} from "@/components/common/WalletProvider";
import {getSVG} from "@/pages/api/generator/[tokenId]/svg";
import Script from 'next/script'
import {useRouter} from "next/router";

export default function Plot(props: { svg: any }) {
  const router = useRouter()
  const {tokenId} = router.query

  return (
    <div style={{padding: '20px'}}>
      <div>Token: {tokenId}</div>
      <div style={{border: '3px solid blue'}}>
        {tokenId && (
          <iframe src={`/api/tokens/${tokenId}/plot`} style={{
            height: 'calc(100vh - 80px)',
            width: '100%',
            border: 0,
          }}/>
        )}
      </div>
    </div>
  );
}
